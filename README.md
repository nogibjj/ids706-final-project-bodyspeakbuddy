# IDS-706 / BodySpeakBuddy
# IDS-706-Final project

# Team Members
Gunel Aghakishiyeva, Antara Bhide, Anastasiia Saenko, Zhanylai (Janka) Turatkhan kyzy

## Demo Link
Web link: 
Demo video link: 

## Project Overview
The project aim to build a conversational AI chatbot with FastAPI and deployment on AWS. The chatbot uses OpenAI's **GPT-3.5** to generate responses for any questions based on  the **??** book. 

## Project arhitecture 

**diagram** 


## Project Structure 

### Microservice

We developed a microservice in Python that interfaces with a data pipeline. The microservice is responsible for processing PDF documents using OpenAI's latest embedding model, converting them into a vector database. The microservice includes logging and is containerized using the Distroless Docker image. The repository contains a Dockerfile for easy deployment. The microservice, developed with FastAPI, a leading Python web framework for APIs, emphasizes high performance and user-friendly design. It efficiently manages concurrent API calls for quick responses. Thorough logging enhances transparency, and containerization with Distroless Docker ensures portability and consistency. This approach aligns with modern microservices best practices, providing both efficiency and maintainability.
### Load Test

Our microservice is designed to handle 10,000 requests per second. To validate its performance, we conducted a load test, and the results are included in the repository.

### Data Engineering

Our project extensively uses data engineering libraries, including Spark for distributed processing and Pandas for data manipulation. The vector database is utilized for efficient storage and retrieval of document embeddings.

### Infrastructure as Code (IaC)

We employed AWS CloudFormation for setting up and managing our infrastructure. The entire infrastructure, including AWS services and dependencies, is defined as code, ensuring reproducibility and ease of management.

### Continuous Integration and Continuous Delivery (CI/CD)

We implemented a CI/CD pipeline using GitHub Actions. This pipeline automates the build, lint, test, and format actions. Badges for these actions are displayed in the README for quick reference.

### README.md

Our repository includes a comprehensive README file that details the project's purpose, dependencies, setup instructions, limitations, potential improvements, and the role of AI Pair Programming tools (GitHub Copilot and a custom tool) in the development process.

### Architectural Diagram

We provide a clear architectural diagram representing the flow and components of our application. This diagram aids in understanding the interactions between different services and infrastructure components.

### GitHub Configurations

Our GitHub repository includes GitHub Actions for automation and a .devcontainer configuration for GitHub Codespaces. These configurations ensure that the local development environment is consistent and reproducible. Build badges are added for key actions.




## Conclusion

Our project successfully meets the requirements outlined for the Data Engineering class. It demonstrates proficiency in microservice development, load testing, data engineering, IaC, CI/CD, documentation, teamwork, quantitative assessment, and presentation through a demo video. The integration of AI Pair Programming tools further enhanced our development process.






