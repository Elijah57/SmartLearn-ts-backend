# SmartLearn-ts-backend

Backend for SmartLearn - A Learning Management System with TypeScript support and improved features.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction
SmartLearn-ts-backend is a backend service built with Node.js, TypeScript, and MongoDB. It provides RESTful APIs for managing learning resources.

## Features
- User authentication and authorization
- Course management
- Lesson management
- Assignment tracking
- Real-time notifications

## Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/Elijah57/SmartLearn-ts-backend.git
   cd SmartLearn-ts-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Usage
To start using the API, send requests to `http://localhost:3000/api`.

## API Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a new course
- `GET /api/lessons` - Get all lessons
- `POST /api/lessons` - Create a new lesson
- `GET /api/assignments` - Get all assignments
- `POST /api/assignments` - Create a new assignment

## Contributing
We welcome contributions! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the MIT License.
