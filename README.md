# Catalog Management System

This is a full-stack application for managing catalogs using a React frontend and a NestJS backend. It allows you to create, update, delete, and retrieve catalog entries, with additional features for filtering and validation.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (version 16.x or above)
- [npm](https://www.npmjs.com/get-npm) 
- [MongoDB](https://www.mongodb.com/) (MongoDB Atlas or local instance)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/pavelshm10/syte
cd syte

Running Backend (NestJS) 

cd backend
npm install
add .env file
npm run start:dev (running on port 3000)

#Running Fronend (ReactJs)

cd frontend
npm install
npm run start


# API Endpoints (Backend)
The main API endpoints include:

GET /catalogs - Retrieve all catalogs.
POST /catalogs - Create a new catalog.
PUT /catalogs/:id - Update an existing catalog.
DELETE /catalogs/:id - Delete a catalog.

