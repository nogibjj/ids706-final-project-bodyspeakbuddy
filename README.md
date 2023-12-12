# IDS-706 / BodySpeakBuddy

## Team Members
Gunel Aghakishiyeva, Antara Bhide, Anastasiia Saenko, Zhanylai (Janka) Turatkhan kyzy

## Project Overview
The project is a conversational AI chatbot built with FastAPI. The chatbot uses OpenAI's **GPT-3.5** to generate responses for any questions based on  the **What Every BODY is Saying** book by Joe Navarro. 

### Architectural Diagram



## Project Requirements
 
1. **Microservices**: Our application is structured as a microservice using FastAPI, which is suitable for building scalable and efficient microservices.
2. **Load Test**: In our FastAPI-based application, load testing with Locust revealed an average throughput of 3000 requests per second, below our 10,000 RPS target. This shortfall is influenced by factors such as suboptimal asynchronous handling, resource-intensive PDF processing with PyPDF2, and external API calls.
3. **Data Engineering**: The code achieves data engineering through text extraction, segmentation, vectorization, and SQLite database management.

We also used Python Pandas library and SQLite to store interactions with our Chatbot (questions and corresponding responses). We used SQLite to provide an interactive SQL-based way to search the history of requests for our bot in the following format:

|   id   |  user_id  |          question          |               response              |
|--------|-----------|---------------------------|-------------------------------------|
|   1    |   User1   |   How are you?             |   I'm doing well, thank you!       |
|   2    |   User2   |   What's the weather like? |   The weather is sunny today.      |
|   3    |   User1   |   Tell me a joke.          |   Why did the chicken cross...    |
|   4    |   User2   |   How do I get started?    |   To get started, you can...      |
|   5    |   User1   |   What's the capital...    |   The capital of France is Paris. |
|   ...  |   ...     |   ...                     |   ...                               |

5. **Infrastructure as Code (IaC)**: We employed Microsoft Azure Terraform for setting up and managing our infrastructure. 
6. **Continuous Integration and Continuous Delivery (CI/CD)**: We implemented a CI/CD pipeline using Github Actions. 
7. **README.md**: Our repository includes a comprehensive README file that details the project's purpose, dependencies, setup instructions, limitations, potential improvements, and the role of AI Pair Programming tools (GitHub Copilot and a custom tool) in the development process.
8. **Architectural Diagram**: the Architectural Diagram is included in the README file.
9. **GitHub Configurations**: Our GitHub repo incorporates GitHub Actions for automation and a .devcontainer setup for GitHub Codespaces, ensuring a consistent and reproducible local development environment. Key actions include build badges.
10. **Teamwork Reflection**: Each member teamwork reflections are included in the repository /Reflections folder.
11. **Quantitative Assessment**: We have conducted and included a comprehensive quantative quality assesment. 
12. **Demo Video**: Demo Video Link is provided in the repo.

### Demo Link
Web link: 
Demo video link: 

### Conclusion

Our project successfully meets the requirements outlined for the Data Engineering class. It demonstrates proficiency in microservice development, load testing, data engineering, IaC, CI/CD, documentation, teamwork, quantitative assessment, and presentation through a demo video. The integration of AI Pair Programming tools further enhanced our development process.






