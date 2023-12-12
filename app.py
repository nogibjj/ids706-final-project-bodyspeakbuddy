
from fastapi import FastAPI, UploadFile, File, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain

from typing import List, Dict, Union
import uvicorn
import os
from fastapi.middleware.cors import CORSMiddleware

import warnings
warnings.filterwarnings("ignore")


# -----------------------------------------------------------------------------
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from fastapi import Depends

# SQLAlchemy setup 
DATABASE_URL = "sqlite:///./chatbot.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define SQLAlchemy model (after SQLAlchemy setup)
Base = declarative_base()

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String)
    response = Column(String)

# Create the database tables (You may need to run this only once)
Base.metadata.create_all(bind=engine)
# -----------------------------------------------------------------------------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)





app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

conversation = None  # Initialize conversation as a global variable

@app.on_event("startup")
async def startup_event():
    load_dotenv()
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")   # Replace with your actual OpenAI API key

    # Pre-upload the document
    await upload_files(["JoeNavarro.pdf"])

@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/upload/")
async def upload_files(files: Union[List[UploadFile], List[str]]):
    global conversation  # Declare conversation as global so we can modify it

    # get pdf text
    raw_text = get_pdf_text(files)

    # get the text chunks
    text_chunks = get_text_chunks(raw_text)

    # create vector store
    vectorstore = get_vectorstore(text_chunks)

    # create conversation chain
    conversation = get_conversation_chain(vectorstore)

    return {"detail": "Files processed successfully"}


# Define a dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/ask/")
async def ask_question(data: Dict[str, str], db: Session = Depends(get_db)):
    global conversation  # Declare conversation as global so we can access it

    if conversation is None:
        return {"error": "No documents uploaded yet"}

    question = data.get('question')
    if question is None:
        return {"error": "No question provided"}

    response = conversation({'question': question})
    chat_history = response['chat_history']

    # Save chat history to database
    new_chat_history = ChatHistory(
        question=question,
        response=str(chat_history)  # Ensure the response is stored as a string
    )

    db.add(new_chat_history)
    db.commit()

    return {"chat_history": chat_history}


def get_pdf_text(files):
    text = ""
    for file in files:
        if isinstance(file, str):  # If the file is a path
            with open(file, "rb") as f:
                pdf_reader = PdfReader(f)
                for page in pdf_reader.pages:
                    text += page.extract_text()
        else:  # If the file is an UploadFile instance
            pdf_reader = PdfReader(file.file)
            for page in pdf_reader.pages:
                text += page.extract_text()
    return text


def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks

def get_vectorstore(text_chunks):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore

def get_conversation_chain(vectorstore):
    llm = ChatOpenAI()
    memory = ConversationBufferMemory(
        memory_key='chat_history', return_messages=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory
    )
    return conversation_chain


# ------

import pandas as pd
from sqlalchemy import create_engine


# Create an engine.
engine = create_engine("sqlite:///chatbot.db")

with engine.connect() as conn, conn.begin():
    data = pd.read_sql_table("chat_history", conn)

print(data.head())

# ------

if __name__ == "__main__":
    uvicorn.run(app, host="192.168.1.138", port=8080)


# How does crossing one's arms typically affect the perception of their attitude in a conversation?
# What are common facial expressions that indicate someone is feeling confident, and how can they be distinguished from expressions of arrogance?
# In a group setting, how can body language be used to identify the leader or the most influential person in the group?
# Can body language cues differ significantly across cultures, and if so, can you provide an example of a gesture that has different meanings in different cultures?
# How does mirroring another person's body language subtly influence the dynamics of a conversation or negotiation?