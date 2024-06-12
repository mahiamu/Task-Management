# Task Management Application

This is a Task Management Application built using React.js for the front end and Node.js with Express.js for the backend. The application allows users to create, update, delete, and view tasks. It also features user authentication using JWT (JSON Web Tokens).

## Features

- User Authentication: Sign up, log in, and log out securely.
- Task Management:
  - Create tasks with a title, description, deadline, and priority level.
  - View all tasks, filter tasks based on status (pending, completed), and sort tasks based on priority or deadline.
  - Update task details and mark tasks as completed.
  - Delete tasks.
- Backend API: A RESTful API to handle CRUD operations for tasks, with authentication middleware to secure API endpoints.
- Responsive Design: The application is responsive and works well on various devices.

## Technologies Used

- **Frontend:** React.js, Axios, CSS Modules
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## Installation

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

Usage
Sign Up: Create a new account to start managing tasks.
Log In: Log in with your credentials to view and manage your tasks.
Create Task: Add a new task by providing a title, description, deadline, and priority level.
View Tasks: View a list of all your tasks, filtered and sorted as needed.
Update Task: Update task details or mark a task as completed.
Delete Task: Remove a task from your list.
Project Structure
backend: Contains the server-side code.
models: Mongoose schemas for User and Task.
routes: Express routes for user and task management.
middleware: Authentication middleware.
server.js: Main entry point for the backend server.
frontend: Contains the client-side code.
src/components: Reusable React components (NavBar, LoginForm, RegisterForm, TaskList).
src/pages: React components for different pages (LoginPage, RegisterPage, TaskPage).
src/styles: CSS module files for styling components.
src/App.js: Main App component.
src/index.js: Entry point for the React application.
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.
