# Task Tracker Application

## Overview
This Task Tracker application allows users to track the progress of their projects. Each user can manage up to 4 projects and perform various actions on tasks associated with these projects. The system includes authentication (JWT) and is designed using ExpressJS for the backend, ReactJS (with Vite) for the frontend, and MongoDB for database management.

### Features:
1. User authentication (Signup and Login).
2. Create, read, update, and delete tasks.
3. Ability to create and manage projects.
4. Track task progress with status and timestamps.
5. Users can store personal information such as email, name, password, and country.

## Tech Stack:
- **Frontend:** ReactJS (Vite), Bootstrap
- **Backend:** ExpressJS
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Vercel (Frontend), Render (Backend)

## Links:
- **Frontend GitHub Repository:** [Task Tracker Frontend](https://github.com/ShivamG1979/Task_Tracker_Frontend)
- **Backend GitHub Repository:** [Task Tracker Backend](https://github.com/ShivamG1979/Task_Tracker_Backend)
- **Frontend Deployment Link:** [Vercel Link](https://task-tracker-frontend-ebon.vercel.app/)
- **Backend Deployment Link:** [Render Link](https://task-tracker-backend-da1d.onrender.com)

## How to Run the Application Locally:

### Prerequisites:
- Node.js (for both frontend and backend)
- MongoDB (for the database)
- npm 

### Steps:

1. **Clone the Repositories:**

   Clone both the frontend and backend repositories to your local machine.

   ```bash
   git clone https://github.com/ShivamG1979/Task_Tracker_Frontend.git
   git clone https://github.com/ShivamG1979/Task_Tracker_Backend.git
Setup the Backend:

Navigate to the backend folder:


cd Task_Tracker_Backend
Install the required dependencies:

npm install
Set up your MongoDB connection:

Create a .env file and add your database credentials, such as:


DB_URI=mongodb://localhost:27017/task-tracker
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=24h
PORT=5000
Start the backend server:


npm start
The backend server will now be running on http://localhost:5000 (or the port you specified).

Setup the Frontend:

Navigate to the frontend folder:


cd Task_Tracker_Frontend
Install the required dependencies:


npm install
Install Bootstrap for styling:


npm install bootstrap
Import Bootstrap in your src/main.jsx or src/index.jsx file:

javascript

import 'bootstrap/dist/css/bootstrap.min.css';
Start the frontend server:


npm run dev
The frontend will now be running on http://localhost:3000.

Testing the Application:

Open your browser and navigate to http://localhost:3000.

You should be able to sign up, log in, create projects, add tasks, and track progress.

Additional Information:
The application uses JWT for authentication and authorization.

The backend API supports CRUD operations for tasks and projects.

Task status can be updated to track progress (e.g., "In Progress," "Completed").

Users are limited to 4 projects.

License:
This project is licensed under the MIT License.

