# IDS-706 / BodySpeakBuddy

## Team Members
Gunel Aghakishiyeva, Antara Bhide, Anastasiia Saenko, Zhanylai (Janka) Turatkhan kyzy

## Project Overview
The project is a conversational AI chatbot built with FastAPI. The chatbot uses OpenAI's **GPT-3.5** to generate responses for any questions based on  the **What Every BODY is Saying** book by Joe Navarro. 

### Architectural Diagram



## Project Requirements
 
1. **Microservices**: Our application is structured as a microservice using FastAPI, which is suitable for building scalable and efficient microservices.
2. **Load Test**: In our FastAPI-based application, load testing with Locust revealed an average throughput of 3000 requests per second, below our 10,000 RPS target. This shortfall is influenced by factors such as suboptimal asynchronous handling, resource-intensive PDF processing with PyPDF2, and external API calls.
3. **Data Engineering**:The code achieves data engineering through text extraction, segmentation, vectorization, and SQLite database management.
4. **Infrastructure as Code (IaC)**: We employed AWS CloudFormation for setting up and managing our infrastructure. The entire infrastructure, including AWS services and dependencies, is defined as code, ensuring reproducibility and ease of management.
5. **Continuous Integration and Continuous Delivery (CI/CD)**: We implemented a CI/CD pipeline using Github Actions. 
6. **README.md**: Our repository includes a comprehensive README file that details the project's purpose, dependencies, setup instructions, limitations, potential improvements, and the role of AI Pair Programming tools (GitHub Copilot and a custom tool) in the development process.
7. **Architectural Diagram**: the Architectural Diagram is included in the README file
8. **GitHub Configurations**:Our GitHub repo incorporates GitHub Actions for automation and a .devcontainer setup for GitHub Codespaces, ensuring a consistent and reproducible local development environment. Key actions include build badges.
9. **Teamwork Reflection**: Each member teamwork reflections are included in the repository /Reflections folder.
10. **Quantitative Assessment**: We have conducted and included a comprehensive quantative quality assesment. 
11. **Demo Video**: Demo Video Link is provided in the repo.


### Microservice 
Our microservice is designed to handle 10,000 requests per second. To validate its performance, we conducted a load test, and the results are included in the repository. We developed a microservice in Python that interfaces with a data pipeline. The microservice is responsible for processing PDF documents using OpenAI's latest embedding model, converting them into a vector database. The microservice includes logging and is containerized using the Distroless Docker image. The repository contains a Dockerfile for easy deployment.

### Load Test
In the recent performance evaluation of our FastAPI-based application, utilizing Locust for load testing, we observed an average throughput of 3000 requests per second, falling short of our 10,000 RPS goal. This limitation can be attributed to several factors inherent in the current implementation: the asynchronous handling might not be fully optimized for high concurrency; PDF processing with PyPDF2 could be a significant bottleneck due to its resource-intensive nature; external API calls

### Data Engineering

We used Python Pandas library and SQLite to store interactions with our Chatbot (questions and corresponding responses). We used SQLite to provide an interactive SQL-based way to search the history of requests for our bot in the following format: 
|   id   |  user_id  |          question          |               response              |
|--------|-----------|---------------------------|-------------------------------------|
|   1    |   User1   |   How are you?             |   I'm doing well, thank you!       |
|   2    |   User2   |   What's the weather like? |   The weather is sunny today.      |
|   3    |   User1   |   Tell me a joke.          |   Why did the chicken cross...    |
|   4    |   User2   |   How do I get started?    |   To get started, you can...      |
|   5    |   User1   |   What's the capital...    |   The capital of France is Paris. |
|   ...  |   ...     |   ...                     |   ...                               |

In the provided code, data engineering is primarily achieved through the processing and management of text data extracted from PDF files. This process begins with the use of the **PyPDF2** library to read and extract text from uploaded PDFs. The extracted text is then segmented into manageable chunks using **CharacterTextSplitter** from the langchain library, optimizing it for subsequent operations. These chunks are further processed to create vector representations, facilitated by **OpenAIEmbeddings** and **FAISS** modules, allowing for efficient text retrieval and analysis. Additionally, the application employs a **SQLite database** via **SQLAlchemy** for persistent storage, handling the CRUD operations of chat history data. This amalgamation of text extraction, segmentation, vectorization, and database management forms the core of the data engineering aspect in the application, providing a structured and efficient approach to handling and retrieving conversational data.

### Infrastructure as Code (IaC)

We employed AWS CloudFormation for setting up and managing our infrastructure. The entire infrastructure, including AWS services and dependencies, is defined as code, ensuring reproducibility and ease of management.

### Continuous Integration and Continuous Delivery (CI/CD)

We implemented a CI/CD pipeline using GitHub Actions. This pipeline automates the build, lint, test, and format actions. Badges for these actions are displayed in the README for quick reference.

### GitHub Configurations

Our GitHub repository includes GitHub Actions for automation and a .devcontainer configuration for GitHub Codespaces. These configurations ensure that the local development environment is consistent and reproducible. Build badges are added for key actions.

### Demo Link
Web link: 
Demo video link: 

### Conclusion

Our project successfully meets the requirements outlined for the Data Engineering class. It demonstrates proficiency in microservice development, load testing, data engineering, IaC, CI/CD, documentation, teamwork, quantitative assessment, and presentation through a demo video. The integration of AI Pair Programming tools further enhanced our development process.






