# Frontend - Movie List Application

This is the frontend of the Movie List application built with Next.js. The application allows users to create, view, update, and delete movies, leveraging a REST API backend.

## Features

- User authentication (login/register) using JWT tokens
- Movie creation, viewing, editing, and deletion
- Image upload using Cloudinary
- Pagination for the list of movies

## Prerequisites

- Node.js (v20.x or later)
- npm (v10.x or later)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sudo-infinity/movie-list.git
   ```

2. Navigate to the project directory:

   ```bash
   cd movie-list-frontend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```plaintext
NEXT_PUBLIC_BACKEND_URI=http://localhost:5000
```

Ensure that the `NEXT_PUBLIC_BACKEND_URI` is set to the URL of your backend server.

## Running the Application

To start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

## Building for Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Dependencies

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Hot Toast](https://react-hot-toast.com/)

## License

This project is licensed under the MIT License.
