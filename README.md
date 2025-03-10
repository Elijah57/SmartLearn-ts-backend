# SmartLearn-ts-backend (POC) 🚀🚀🚀

 [![codecov](https://codecov.io/gh/Elijah57/SmartLearn-ts-backend/branch/main/graph/badge.svg?token=8IAKVRS55T)](https://codecov.io/gh/Elijah57/SmartLearn-ts-backend) [![CodeFactor](https://www.codefactor.io/repository/github/Elijah57/SmartLearn-ts-backend/badge)](https://www.codefactor.io/repository/github/Elijah57/SmartLearn-ts-backend) [![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Elijah57_SmartLearn-ts-backend&metric=alert_status)](https://sonarcloud.io/dashboard?id=Elijah57_SmartLearn-ts-backend) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Elijah57_SmartLearn-ts-backend&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=Elijah57_SmartLearn-ts-backend) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Elijah57_SmartLearn-ts-backend&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=Elijah57_SmartLearn-ts-backend) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Elijah57_SmartLearn-ts-backend&metric=security_rating)](https://sonarcloud.io/dashboard?id=Elijah57_SmartLearn-ts-backend) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Elijah57_SmartLearn-ts-backend&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=Elijah57_SmartLearn-ts-backend) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Elijah57_SmartLearn-ts-backend&metric=sqale_index)](https://sonarcloud.io/dashboard?id=Elijah57_SmartLearn-ts-backend) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Elijah57_SmartLearn-ts-backend&metric=bugs)](https://sonarcloud.io/dashboard?id=Elijah57_SmartLearn-ts-backend)[![wakatime](https://wakatime.com/badge/user/47f42afb-e1b5-4dff-a121-580939cf1f83/project/277cfbc4-4262-488e-9017-f2fb18135b15.svg)](https://wakatime.com/badge/user/47f42afb-e1b5-4dff-a121-580939cf1f83/project/277cfbc4-4262-488e-9017-f2fb18135b15)


Backend for SmartLearn - A Learning Management System with TypeScript support and improved features.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisite](#prerequisite)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction
SmartLearn-ts-backend is a backend service built with Node.js, TypeScript, and MongoDB. It provides RESTful APIs for managing learning resources.

## Features
- User authentication and authorization (AuthService)
- Email notifications using nodemailer
- Background workers (email service, upload) using BullMQ
- Logging System using RabbitMQ
- Media content management using Cloudinary
- Google Oauth (sign-in with google)
- Course management
- Lesson management
- Assignment tracking

## Prerequisite

1. Cloudinary: Cloudinary is a powerful media API for websites and mobile apps alike, Cloudinary enables developers to efficiently manage, transform, optimize, and deliver images and videos through multiple CDNs. 
Go to cloudinary, create an account and store your credential in the .env file

2. Nodemailer setup with gmail and app password: Nodemailer is a module for Node.js applications that allows easy email sending. This setup uses gmail as a transport service. using gmail as a transport expects an actual user, so go over to your google account, ensure 2fa is setup for your account, create an app password, for nodemailer to work, store the app password in SMTP_PASS. You may refer to this [guide](https://medium.com/@elijahechekwu/sending-emails-in-node-express-js-with-nodemailer-gmail-part-1-67b7da4ae04b)

3. EmailQueueService: To handle sending of email off the main application thread of the server, An EmailQueueService is setup, using Bullmq(a Redis-backed queue system). On email transmission, the EmailQueueService, enqueue the a mesage containing the email payload. An EmailWorker process (seperate node.js process) runs independently, subscribed to the BullMQ email queue and listens for new queues added to the email queue, on reception performs sending of emails. You may refer to this [guide](https://medium.com/@elijahechekwu/setting-up-bull-to-handle-asynchronous-tasks-in-node-js-part-2-70c57c694e3b)

4. Google Sign-in using passport.js: Google APIs are application programming interfaces developed by Google which allow communication with Google Services and their integration to other services.The authentication process of this application utilizes a self hosted AuthService and Google Strategy.
In order for Google to identify which application's Passport interacts with their API, you will need to obtain clientID and clientSecret in Google Developers Console. You may refer to this [guide](https://medium.com/@elijahechekwu/social-authentication-authorization-in-node-express-js-application-using-passportjs-part-1-db7fa622ea60) for the steps.


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
   
   PORT = 4000
   ENV = "DEV"
   HOST = "http://localhost:4000"
   DB_URI=your_mongodb_connection_string
   DB_URI_LOCAL= "mongodb://root:mongodb@localhost:27017/smart-learn?authSource=admin"
   
   JWT_SECRET=your_jwt_secret

   SMTP_MAIL=google_mail
   SMTP_PASS=google_app_password
   SMTP_HOST = "smtp.gmail.com"
   SMTP_PORT = 465
   SMTP_SERVICE = "gmail"

   REDIS_SESSION_URL="redis://localhost:6370"
   REDIS_CACHE_URL="redis://localhost:6350"

   RABBITMQ_URL=rabbitMq_url
   SESSION_SECRET=

   CLOUD_NAME=cloudinary_name
   CLOUD_API_KEY=cloudinary_api_key
   CLOUD_API_SECRET=cloudinary_secret

   CLIENT_ID=your_google_client_id_for_oauth
   CLIENT_SECRET=your-google_client_secret 
   CALLBACK_URL=oauth_callback_url

   OPEN_API_KEY=your_openaikey
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Usage
To start using the API, send requests to `http://localhost:4000/api`.

## API Endpoints (available)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/verify-email` - Verify User Email
- `GET/api/auth/send-verification-link` - Send email verification link
- `GET/api/auth/forgot-password` - Send reset password link
- `GET/api/auth/reset-password` - Reset users password

- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a new course

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
