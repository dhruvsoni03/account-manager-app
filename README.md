# Account Manager Application

A simple React application that allows users to create and manage accounts. This project was built to satisfy the assignment requirements for a user management system.

## Features

- **User Registration**: Create a new account with name, email, and password.
- **User Login**: Secure login with email and password.
- **Profile Management**: View and edit user details (Name, Email, Password).
- **Protected Routes**: Profile page is accessible only when logged in.
- **Data Persistence**: Uses browser's `localStorage` to simulate a database, allowing data to persist across reloads.
- **Responsive Design**: Styled with Bootstrap 5 for a clean and mobile-responsive layout.

## Technologies Used

- **React (v18)**: Frontend library.
- **React Router DOM**: For client-side routing.
- **Bootstrap 5 & React-Bootstrap**: For UI components and styling.
- **Vite**: Build tool.

## Setup Instructions

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd Assignment
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Click the link displayed in the terminal (usually `http://localhost:5173`).

## Usage Guide

1. **Register**: Click "Register" on the navbar or home page. Enter your details.
2. **Login**: Use the credentials you just created to log in.
3. **Manage Profile**: Click "My Profile" in the navbar. You can view your info there. Click "Edit Profile" to update your name, email, or password.
4. **Logout**: Click the "Logout" button in the navbar to end your session.

## Notes

- This application performs client-side validation.
- Since there is no backend, `localStorage` is used to store user data. Clearing your browser cache will delete all registered users.
