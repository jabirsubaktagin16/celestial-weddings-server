# Celestial Weddings Server Side

This is the backend for the **Celestial Weddings** project, a wedding service platform. The backend is built with Node.js, Express, and MongoDB to manage vendors, services, packages, bookings, and user authentication.

**Live Server Site:** https://celestial-weddings-server.onrender.com/health

**Live Client Site:** https://celestial-weddings.vercel.app/

## Features

- Vendor management (create, update, delete)
- Package management (create, update, delete packages for vendors)
- Booking management (create and manage bookings)
- Rating and review system for vendors
- User authentication (JWT)
- Integration with MongoDB for data persistence

## Tech Stack

- **Node.js** - Backend runtime environment
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database for storing data
- **Mongoose** - ODM for MongoDB
- **JWT** - For authentication
- **MERN Stack** - Integrated with React frontend

## Getting Started

To get the backend up and running locally, follow these steps:

### Prerequisites

- Node.js installed
- MongoDB installed or a MongoDB cloud account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jabirsubaktagin16/celestial-weddings-server.git
   ```
2. Navigate into the project directory:
   ```bash
   git clone https://github.com/jabirsubaktagin16/celestial-weddings-server.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server

1.  Create a `.env` file in the root directory and add the following environment variables:
    ```bash
    PORT=5000
    DB_USER=your-db-user-name
    DB_PASSWORD=your-db-user-password
    DB_NAME=your-db-name
    DB_CLUSTER=your-db-cluster-site
    ACCESS_TOKEN_SECRET=your_jwt_secret
    ```
2.  Start the server:
    ```bash
    npm start
    ```
    The API will run on http://localhost:5000.

### API Endpoints

**Users**

- POST `/api/v1/users/jwt` - Token Generate and Store User Email in Database
- POST `/api/v1/users` - Post New User in the database
- GET `/api/v1/users/:email` - Get User Information by Email
- GET `/api/v1/users` - Get All Users for Admin
- GET `/api/v1/users/admin/:email` - Checking if the User is Admin
- GET `/api/v1/users/vendor/:email` - Checking if the User is Vendor
- PATCH `/api/v1/users/:email` - Update the User Information
- PATCH `api/v1/users/update-role/:id` - Update the User Role
