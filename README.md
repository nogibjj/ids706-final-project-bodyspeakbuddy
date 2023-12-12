# IDS-706 / BodySpeakBuddy

## Team Members
Gunel Aghakishiyeva, Antara Bhide, Anastasiia Saenko, Zhanylai (Janka) Turatkhan kyzy

## Project Overview
The project is a conversational AI chatbot built with FastAPI. The chatbot uses OpenAI's **GPT-3.5** to generate responses for any questions based on  the **What Every BODY is Saying** book by Joe Navarro. 

### Architectural Diagram



## Project Requirements:
 
1. **Microservices**: Our application is structured as a microservice using FastAPI, which is suitable for building scalable and efficient microservices.
2. 

### Load Test

Our microservice is designed to handle 10,000 requests per second. To validate its performance, we conducted a load test, and the results are included in the repository.

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

### Infrastructure as Code (IaC)

We employed AWS CloudFormation for setting up and managing our infrastructure. The entire infrastructure, including AWS services and dependencies, is defined as code, ensuring reproducibility and ease of management.

### Continuous Integration and Continuous Delivery (CI/CD)

We implemented a CI/CD pipeline using GitHub Actions. This pipeline automates the build, lint, test, and format actions. Badges for these actions are displayed in the README for quick reference.

### README.md

Our repository includes a comprehensive README file that details the project's purpose, dependencies, setup instructions, limitations, potential improvements, and the role of AI Pair Programming tools (GitHub Copilot and a custom tool) in the development process.


### GitHub Configurations

Our GitHub repository includes GitHub Actions for automation and a .devcontainer configuration for GitHub Codespaces. These configurations ensure that the local development environment is consistent and reproducible. Build badges are added for key actions.

### Demo Link
Web link: 
Demo video link: 

### Conclusion

Our project successfully meets the requirements outlined for the Data Engineering class. It demonstrates proficiency in microservice development, load testing, data engineering, IaC, CI/CD, documentation, teamwork, quantitative assessment, and presentation through a demo video. The integration of AI Pair Programming tools further enhanced our development process.






