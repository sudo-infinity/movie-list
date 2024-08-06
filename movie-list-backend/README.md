# Backend - Movie List Application

This is the backend of the Movie List application built with NestJS and Prisma. It provides a RESTful API for managing movies and user authentication.

## Features

- User registration and login with JWT authentication
- Movie creation, retrieval, update, and deletion
- Image upload handling with Cloudinary
- Pagination support for movie listings

## Prerequisites

- Node.js (v20.x or later)
- PostgreSQL database

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sudo-infinity/movie-list.git
   ```

2. Navigate to the project directory:

   ```bash
   cd movie-list-backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```plaintext
DATABASE_URL=postgresql://username:password@localhost:5432/movielist
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Make sure to replace `username`, `password`, and other placeholders with your actual credentials.

## Running the Application

To start the development server:

```bash
npm run start:dev
```

## Prisma Setup

To apply migrations and sync the database schema:

```bash
npx prisma migrate dev
```

To generate Prisma Client:

```bash
npx prisma generate
```

## Dependencies

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Cloudinary](https://cloudinary.com/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [jwtpassport](https://www.passportjs.org/packages/passport-jwt/)

## License

This project is licensed under the MIT License.
