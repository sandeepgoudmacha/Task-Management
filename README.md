# TaskMaster - Full Stack Task Management System

A modern, feature-rich Task Management system built with the MERN stack (MongoDB, Express, React, Node.js), Redux Toolkit, and Tailwind CSS. This application demonstrates full-stack development best practices, secure authentication, state management, and responsive UI design.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.11.2-764ABC?logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-06B6D4?logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Design Decisions](#design-decisions)
- [Architecture](#architecture)
- [Performance & Best Practices](#performance--best-practices)

## ✨ Features

### Core Features
- **🔐 User Authentication**: Secure JWT-based signup, login, and protected routes
- **📝 Task Management**: Create, read, update, and delete tasks persisted to a real database
- **✅ Status Management**: Mark tasks as completed or pending with instant UI & DB updates
- **🔍 Search & Filter**: Search tasks by title and filter by All, Pending, or Completed
- **📊 Real-time Analytics**: Fetch and display task statistics
- **🌙 Light/Dark Theme**: Persistent theme preference with system preference detection
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **✨ Smooth Animations**: Beautiful transitions using Framer Motion

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0**: Latest React framework with functional components
- **Redux Toolkit 2.11.2**: Modern state management (Slices, Async Thunks)
- **Tailwind CSS & Framer Motion**: Utility-first styling and smooth UI transitions
- **Vite 7.2.4**: Fast frontend build tool

### Backend
- **Node.js & Express**: Fast, unopinionated backend server
- **MongoDB & Mongoose**: NoSQL database and straightforward Object Data Modeling (ODM)
- **JWT (JSON Web Tokens)**: Stateless and secure user authentication
- **Bcrypt.js**: Secure password hashing

## 📁 Project Structure

```
task-management/
├── backend/                # Node.js Express server
│   ├── config/             # DB configuration (db.js)
│   ├── controllers/        # Route controllers (authController, taskController)
│   ├── middleware/         # Custom middlewares (auth.js, errorHandler.js)
│   ├── models/             # Mongoose schemas (User, Task)
│   ├── routes/             # API routing (authRoutes, taskRoutes)
│   ├── server.js           # Backend entry point
│   └── package.json        # Backend dependencies
│
├── src/                    # React Frontend
│   ├── components/         # React UI components (Dashboard, Tasks, Auth)
│   ├── redux/              # State management (store, tasksSlice, authSlice, themeSlice)
│   ├── services/           # API handlers (api.js)
│   ├── App.jsx             # Main application and routing
│   └── index.css           # Global Tailwind entries
│
├── package.json            # Frontend dependencies
└── vite.config.js          # Vite configuration
```

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: v16.0.0 or higher
- **MongoDB**: A running local MongoDB instance or a MongoDB Atlas URI

### 1. Backend Setup

Open a terminal window and navigate to the backend directory:

```bash
cd "Task Management/backend"
npm install
```

Create a `.env` file in the `backend/` directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmaster  # Or your MongoDB Atlas URI
JWT_SECRET=your_super_secret_jwt_key
```

Start the development server:
```bash
npm run dev
```
*The backend server will start on `http://localhost:5000`.*

### 2. Frontend Setup

Open a new terminal window and navigate to the root directory:

```bash
cd "Task Management"
npm install
```

Start the Vite development server:
```bash
npm run dev
```
*The application will be available at `http://localhost:5173`. It will automatically proxy or direct API calls to the running backend.*

## 🔌 API Endpoints

The backend exposes a RESTful API. All task routes require a valid JWT Bearer token in the `Authorization` header.

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Body / Query |
|--------|----------|-------------|--------------|
| **POST** | `/signup` | Register a new user | `{ name, email, password }` |
| **POST** | `/login` | Authenticate an existing user | `{ email, password }` |
| **GET** | `/me` | Get currently logged-in user profile | Requires Token |

### Tasks (`/api/tasks`)
| Method | Endpoint | Description | Body / Query |
|--------|----------|-------------|--------------|
| **GET** | `/` | Fetch tasks | `?status=all|pending|completed`, `?search=query`, `?sortBy=field`, `?order=asc|desc` |
| **POST** | `/` | Create a new task | `{ title, status, priority }` |
| **PUT** | `/:id` | Update an existing task | `{ title, status, priority }` |
| **DELETE** | `/:id` | Delete a task | Parameter: `id` |
| **GET** | `/analytics`| Get user task statistics | Requires Token |

## 🏗️ Design Decisions

In transitioning this project to a **Full-Stack MERN Architecture**, several key design decisions were made to ensure scalability, security, and maintainability.

### 1. MERN Stack Selection
- **Why MERN?** Utilizing JavaScript across both the frontend (React) and backend (Node.js) streamlines development. MongoDB pairs naturally with Node.js because it stores data in JSON-like documents, making API serialization effortless.
- **Express Framework**: Chosen for its minimal setup and robust middleware ecosystem, enabling clean route handling.

### 2. Authentication Strategy
- **JWT (JSON Web Tokens)**: A stateless authentication mechanism. Once a user logs in, the server signs a token that the frontend stores (in `localStorage`). This eliminates the need for complex server-side session management while protecting the `/api/tasks` routes.
- **Bcrypt Hashing**: User passwords are automatically hashed before saving to the database. Plaintext passwords never persist.

### 3. State Management & Data Flow
- **Redux Toolkit**: The application state involves asynchronous API calls, filtering, searching, and user authentication contexts. Redux Toolkit’s `createAsyncThunk` elegantly handles the loading, success, and error states across the UI.
- **Separation of Concerns**: The React components remain entirely declarative. All API communication is abstracted to `src/services/api.js`, which automatically injects the stored JWT token into outgoing requests.

### 4. Modular Backend Structure
- The backend is deliberately split into `routes/`, `controllers/`, and `models/`. 
- **Controllers** map specific logic to an endpoint without cluttering the routing files. 
- **Midlewares** like `errorHandler.js` centrally process errors from any controller, ensuring structured JSON error responses rather than HTML stack traces.

### 5. Frontend Aesthetics & Performance
- **Tailwind CSS**: Promotes creating a unique, premium design without battling external CSS files.
- **Framer Motion**: Incorporates subtle micro-interactions that enhance user feedback without hindering Core Web Vitals.
- **Debounced Inputs**: Search queries are optimized to prevent spamming the backend database while the user types.

## ⚡ Performance & Best Practices

- **Global Error Handling**: Both the Express backend and React frontend catch and gracefully display unexpected behaviors.
- **Input Validation**: Backend routes use `express-validator` to sanitize and validate requests before hitting the database, protecting against NoSQL injections.
- **Responsive Navigation**: Stack-based navigation scaling from Mobile to Desktop dynamically.
