# Phase 3 - Authentication

## Objective

Implement secure user authentication for CollabFlow.

## Features Completed

- User signup
- Signup validation using Zod
- Duplicate email prevention
- Password hashing using bcrypt
- User login
- Password verification using bcrypt
- JWT token generation
- JWT authentication middleware
- Protected profile API

## Authentication APIs

### Signup

POST /api/auth/signup

### Login

POST /api/auth/login

### Profile

GET /api/auth/profile

Requires:

Authorization: Bearer <JWT_TOKEN>

## Authentication Flow

Signup:

Request
-> Validation
-> Check duplicate email
-> Hash password
-> Save user in MySQL

Login:

Request
-> Validation
-> Find user
-> Compare password
-> Generate JWT
-> Return token

Protected API:

Request
-> Bearer token
-> JWT middleware
-> Verify token
-> Allow protected controller

## Security

- Plain passwords are never stored in MySQL.
- Passwords are hashed with bcrypt.
- JWT secret is stored inside server/.env.
- .env is ignored by Git.
- Protected routes require a valid JWT.

## Testing

Tested using Postman:

- Valid signup
- Duplicate email
- Invalid signup
- Valid login
- Invalid password
- Invalid email
- Valid JWT
- Missing JWT

## Result

Authentication system is working successfully.

## Progress

Phase 3 complete.

Project completion: 25%

Next Phase:

Phase 4 - Workspace System