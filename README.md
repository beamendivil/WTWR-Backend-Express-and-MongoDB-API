# WTWR Backend

WTWR, short for What to Wear, is a full stack weather based wardrobe app that helps users decide what clothing to wear based on current weather conditions.

This repository contains the Express and MongoDB backend API for WTWR. The backend supports user registration, login, JWT authentication, user profile management, clothing item creation, item deletion, likes, validation, error handling, and database persistence.

## Live Project

Backend API: https://api.quemepongo.baselinux.net
Frontend: https://www.quemepongo.baselinux.net
Frontend Repository: https://github.com/beamendivil/WTWR-Frontend-React-Weather-Based-Wardrobe-App
Project Pitch Video: https://drive.google.com/file/d/1YO0qHTFBgcfvCzdzvFkXXmg_7fUn3d9p/view?usp=sharing

## Portfolio Summary

This backend was built as the server side API for a full stack React application. It demonstrates RESTful routing, MongoDB data modeling, user authentication, authorization, custom error handling, request validation, password hashing, and JWT based session management.

The API allows authenticated users to create clothing items, delete only their own items, update their profile, and like or unlike items.

## Features

- Express server
- MongoDB database connection
- Mongoose schemas and models
- User signup and signin
- Password hashing with bcryptjs
- JWT authentication
- Protected user routes
- Clothing item CRUD functionality
- Like and unlike functionality
- Owner based authorization for deleting items
- Request validation
- Centralized error handling
- Request and error logging
- CORS support
- Production deployment with Nginx reverse proxy
- HTTPS support with SSL certificate

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token
- Celebrate
- Validator
- CORS
- Winston
- Express Winston
- Dotenv
- ESLint
- Prettier
- Nodemon

## Related Frontend

This backend supports the WTWR React frontend.

Frontend Repository: https://github.com/beamendivil/WTWR-Frontend-React-Weather-Based-Wardrobe-App
Frontend URL: https://www.quemepongo.baselinux.net

The frontend handles the user interface, weather display, wardrobe cards, modals, profile page, and user interactions.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB

### Installation

Clone the repository:

```bash
git clone https://github.com/beamendivil/WTWR-Backend-Express-and-MongoDB-API.git
```

Navigate into the project folder:

```bash
cd WTWR-Backend-Express-and-MongoDB-API
```

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
touch .env
```

Add the following environment variables:

```env
JWT_SECRET=your-secret-key
PORT=3001
```

Start MongoDB locally.

Start the server:

```bash
npm run start
```

Or start with hot reload:

```bash
npm run dev
```

The API will run locally at:

```txt
http://localhost:3001
```

## Available Scripts

```bash
npm run start
```

Starts the Express server on port 3001.

```bash
npm run dev
```

Starts the Express server with nodemon for development.

```bash
npm run lint
```

Runs ESLint with project settings.

```bash
npm run lint:basic
```

Runs a basic ESLint check.

## API Endpoints

### Public Routes

#### GET `/public`

Returns a simple public message confirming that the API is running.

#### POST `/signup`

Creates a new user.

Request body:

```json
{
  "name": "Bea",
  "avatar": "https://example.com/avatar.jpg",
  "email": "bea@example.com",
  "password": "securepassword"
}
```

#### POST `/signin`

Authenticates a user and returns a JWT token.

Request body:

```json
{
  "email": "bea@example.com",
  "password": "securepassword"
}
```

Response example:

```json
{
  "token": "jwt-token"
}
```

### Protected User Routes

#### GET `/users/me`

Returns the current authenticated user.

Requires authorization header:

```txt
Authorization: Bearer jwt-token
```

#### PATCH `/users/me`

Updates the current user profile.

Request body:

```json
{
  "name": "Updated Name",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

### Clothing Item Routes

#### GET `/items`

Returns all clothing items.

#### POST `/items`

Creates a new clothing item.

Requires authorization.

Request body:

```json
{
  "name": "Denim Jacket",
  "weather": "cold",
  "imageUrl": "https://example.com/jacket.jpg"
}
```

#### DELETE `/items/:itemId`

Deletes a clothing item.

Only the owner of the item can delete it.

#### PUT `/items/:itemId/likes`

Adds the current user to an item’s likes array.

Requires authorization.

#### DELETE `/items/:itemId/likes`

Removes the current user from an item’s likes array.

Requires authorization.

## Data Models

### User

```js
{
  name: String,
  avatar: String,
  email: String,
  password: String
}
```

### Clothing Item

```js
{
  name: String,
  weather: String,
  imageUrl: String,
  owner: ObjectId,
  likes: [ObjectId]
}
```

## Authentication Flow

1. A user signs up with name, avatar, email, and password.
2. The password is hashed before being saved.
3. A user signs in with email and password.
4. The server validates credentials.
5. The server returns a JWT.
6. The frontend stores the token.
7. Protected requests include the token in the authorization header.
8. The backend verifies the token before allowing access to protected routes.

## Error Handling

The backend includes centralized error handling for common API errors, including:

- Bad request
- Unauthorized access
- Forbidden actions
- Resource not found
- Duplicate email conflicts
- Server errors

This helps keep API responses consistent and easier to debug.

## Security Notes

Current security features include:

- Password hashing
- JWT based authentication
- Protected routes
- Ownership checks before deletion
- Request validation
- Environment variable support for secrets

Before production use, continue improving security by rotating secrets, reviewing CORS settings, and ensuring all environment variables are configured securely.

## Deployment Notes

The production backend is deployed at:

```txt
https://api.quemepongo.baselinux.net
```

The backend is served behind Nginx with HTTPS enabled.

Recommended production checks:

- Confirm the API is reachable
- Confirm SSL certificate is active
- Confirm frontend requests are pointed to the production API
- Confirm MongoDB is running
- Confirm environment variables are set
- Confirm protected routes reject unauthenticated requests

## Project Structure

```txt
se_project_express/
├── controllers/
│   ├── clothingItems.js
│   └── users.js
├── middlewares/
│   ├── auth.js
│   ├── error-handler.js
│   ├── logger.js
│   └── validation.js
├── models/
│   ├── clothingItem.js
│   └── user.js
├── routes/
│   ├── clothingItems.js
│   ├── index.js
│   └── users.js
├── utils/
│   ├── config.js
│   └── errors.js
├── app.js
├── package.json
└── README.md
```

## Future Improvements

- Add automated tests
- Add API documentation with Swagger or Postman
- Add refresh token support
- Improve production environment configuration
- Add rate limiting
- Add stronger CORS controls
- Add database seed script
- Add admin functionality
- Add more detailed logging
- Add image upload support

## What I Learned

While building this backend, I practiced creating a REST API with Express, connecting to MongoDB with Mongoose, building models and controllers, protecting routes with JWT authentication, hashing passwords, handling authorization, validating requests, and deploying a backend service for a full stack application.

This project strengthened my understanding of how frontend applications communicate with backend APIs and how server side logic supports real user workflows.

## Author

Bea Mendivil
GitHub: https://github.com/beamendivil

## License

This project is available for educational and portfolio purposes.
