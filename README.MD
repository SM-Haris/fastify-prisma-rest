# Fastify Prisma REST Backend App Starter Template

## Introduction
This repository provides a robust and well-structured Fastify Prisma REST backend app starter template. It offers a solid foundation for building scalable and efficient Node.js applications with the following key features:

### Features
* **User Signup, Login, and Authentication:** Implements secure user registration, login, and authentication mechanisms using JWT tokens.
* **Prisma Database Integration:** Leverages Prisma for seamless database interactions, providing a type-safe ORM for efficient data management.
* **Complete Backend Architecture:** Adheres to best practices for backend development, including clean code organization, modularity, and separation of concerns.
* **Authentication Middlewares:** Enforces authentication and authorization rules throughout the application using custom middleware functions.
* **JWT Token-Based Authentication:** Employs JWT tokens for secure session management and user verification.
* **File-Based Logging with Rotation:** Implements file-based logging with daily rotation for easy monitoring and analysis.
* **Bcrypt Hashing:** Uses Bcrypt for secure password hashing, protecting user credentials.
* **Swagger and Swagger UI:** Provides comprehensive API documentation using Swagger, accessible through Swagger UI.

## Getting Started

### Prerequisites
* **Node.js:** Version 18 or later
* **npm:** Version 8 or later
* **Git:** For cloning the repository
* **A supported database:** Ensure you have a compatible database system installed and configured (e.g., PostgreSQL, MySQL, SQLite)

### Clone the Repository:

```bash
git clone https://github.com/SM-Haris/fastify-prisma-rest.git
```
Use code with caution.

### Install Dependencies:
```Bash
cd fastify-prisma-rest
npm install
```

Use code with caution.

Set Up Environment Variables: Create a .env file and populate it with the necessary environment variables, such as database connection details, JWT secret, and other application-specific settings. 
**An example .env file is provided as reference.**

### Run the Application:
```Bash
npm start
```
Use code with caution.

### Run the Application in Development mode:
```Bash
npm run dev
```
Use code with caution.


### Usage
The application's API endpoints can be accessed using your preferred HTTP client or API testing tool. Refer to the Swagger UI documentation for detailed information on available endpoints and their usage.
