NOTE APP
├── client
│ ├── public
│ │ └── vite.svg
│ ├── src
│ ├── assets
│ │ ├── api.jsx
│ │ └── Validate.jsx
│ ├── components
│ │ ├── AllNotes.jsx
│ │ ├── CreateNote.jsx
│ │ ├── EmailSignin.jsx
│ │ ├── Home.jsx
│ │ ├── Navbar.jsx
│ │ ├── Password.jsx
│ │ ├── Profile.jsx
│ │ ├── ProfileUpdate.jsx
│ │ ├── Recovery.jsx
│ │ ├── RequiredAuth.jsx
│ │ ├── Reset.jsx
│ │ ├── ShowNote.jsx
│ │ ├── Signup.jsx
│ │ └── UpdateNote.jsx
│ ├── reducers
│ │ └── userReducer.js
│ ├── index.css
│ ├── main.jsx
│ ├── Routes.jsx
│ └── store.jsx
├── server
| ├── config
| │ └── dbConnect.js
| ├── controllers
| │ ├── authController.js
| │ └── NoteController.js
| ├── middlewares
| │ └── authMiddleware.js
| ├── models
| │ ├── Note.js
| │ ├── OTPmodel.js
| │ └── User.js
| ├── routes
| │ └── notes.js
| ├── utils
| │ └── generateOTP.js
| ├── .env
| └── server.js
└── readme.md

# FullStack Note App

The FullStack Note App is a web application with a React frontend and an Express.js backend. It allows users to create, manage, and organize their notes with a full authentication system, including signup, login, forgot password, and reset password functionality. The app uses MongoDB as the database for storing notes and user data.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installing](#installing)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication:
  - Sign up with email and password.
  - Log in securely.
  - Forgot password and reset password functionality.
- Notes:
  - Create, read, update, and delete notes.
- Profile Management:
  - Set and edit user profile details.
- Secure Storage:
  - User data and notes are stored securely in a MongoDB database.

## Getting Started

These instructions will help you set up and run the FullStack Note App on your local machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MongoDB installed and running.

### Installing

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/fullstack-note-app.git
   ```

Change into the project directory:

```js
cd fullstack-note-app
```

Install dependencies for both the client and server:

```js
cd client
npm install
cd server
npm install
```

## Configuration

Create a .env file in the server directory to configure environment variables:

#### MongoDB connection URI

MONGODB_URI=your-mongodb-uri

#### Secret key for JWT (JSON Web Tokens)

JWT_SECRET=your-secret-key

#### Port for the server (e.g., 3001)

PORT=3001
Replace your-mongodb-uri and your-secret-key with your MongoDB connection URI and a secret key for JWT.

## Running the Application

Start the server:

```js
cd server
npm start
```

Start the client:

```js
cd client
npm run dev
```

Your FullStack Note App should now be running. Access it in your web browser at http://localhost:3000.

## Usage

Sign up for an account or log in if you already have one.
Create, edit, view, and delete your notes.
Manage your profile and save personal details.
Explore and enjoy your FullStack Note App!
Contributing
Feel free to contribute to this project. If you have ideas for new features or find any issues, please create a pull request or submit an issue.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
