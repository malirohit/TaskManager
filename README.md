<<<<<<< HEAD
# Task Manager Application

This is a full-stack task management application built with a React frontend and an Express/MongoDB backend. The application allows users to register, log in, and manage tasks with features like filtering, prioritization, and status updates.

---

## Setup Instructions

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend

2.Install Dependencies
   npm install

3.Create a .env file in the backend directory and configure the following variables:
   PORT=5000
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>

4.Start the backend server:
   npm run dev

### Frontend Setup

1.Navigate to the frontend directory:
   cd frontend
2.Install dependencies:
   npm install
3.Start the development server:
   npm run dev
4.Open the application in your browser at http://localhost:5173.

🛠️ Technical Choices and Architecture
### Frontend
React: Utilized for building a dynamic and reusable component-based user interface.

React Router: Handles client-side routing and navigation between pages.

Axios: Used to make HTTP requests to the backend API.

TailwindCSS: Provides utility-first CSS classes for fast and responsive styling.

### Backend
Express.js: Lightweight and flexible framework for building the RESTful API.

MongoDB: NoSQL database for storing user and task-related data.

Mongoose: ODM (Object Data Modeling) library to define schemas and simplify database interaction.

JWT (JSON Web Tokens): Ensures secure user authentication and session management.

### Architecture
The frontend follows a component-based architecture, enhancing modularity and reusability.

The backend is designed following RESTful API principles, with middleware for authentication and error handling.

Context API (TaskContext) is used for efficient state management on the frontend.

Custom Hooks (useAuth) manage the authentication logic, keeping the code clean and maintainable.


### How to Run the Application Locally
Start the backend server:
  cd backend
  npm run dev
Start the frontend development server:
  cd frontend
  npm run dev
Open the application in your browser at http://localhost:5173.

### Run the seed script:

   node seed.js
=======
# TaskManager
>>>>>>> cc4382b9dbab2bf6595ccd52a50212dd101eb868
