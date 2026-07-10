# BlogPost Client

A React frontend for the **BlogPost** application built with **React**, **TypeScript**, **Vite**, **Apollo Client**, **GraphQL**, **Tailwind CSS**, and **shadcn/ui**.

The application consumes both the REST and GraphQL APIs exposed by the BlogPost Server.

---

https://github.com/user-attachments/assets/7be779bc-1352-4773-aff8-785b898d82ef

---

# Architecture Overview

The frontend communicates with the backend using two API layers.

## REST API

REST endpoints are used for authentication-related operations:

* User registration
* User login
* Refresh token handling
* Logout/session management

---

## GraphQL API

Apollo Client is used for all blog post operations.

GraphQL handles:

* Fetching blog posts
* Creating blog posts
* Updating blog posts
* Deleting blog posts

The GraphQL API is exposed by the backend at:

```text
http://localhost:3000/graphql
```

---

# Features

* User registration and authentication
* Protected routes
* JWT authentication flow
* Blog post CRUD operations
* Apollo Client integration
* GraphQL queries and mutations
* Responsive UI
* Component-based architecture
* Tailwind CSS styling
* shadcn/ui components
* TypeScript support

---

# Tech Stack

* React 19
* TypeScript
* Vite
* Apollo Client
* GraphQL
* React Router
* Tailwind CSS
* shadcn/ui
* Lucide React

---

# Prerequisites

Before running the client, ensure the **BlogPost Server** is running.

The backend provides:

* REST API for authentication
* GraphQL API for blog post operations

Default backend endpoints:

```text
REST API:
http://localhost:3000

GraphQL API:
http://localhost:3000/graphql
```

---

# Recommended: Run in Production Mode

The recommended way to run the frontend is using the production build.

This ensures the application runs with the same optimized bundle that will be used during deployment.

---

## 1. Install dependencies

```bash
npm install
```

---

## 2. Configure environment variables

The repository includes a `.env.example` file.

Create your local environment file by copying it:

```bash
cp .env.example .env
```

Update the values if required.

Example:

```env
VITE_ENV=production
VITE_API_URL=http://localhost:3000
VITE_GRAPHQL_URL=http://localhost:3000/graphql
```

---

## 3. Build the application

Create the optimized production bundle:

```bash
npm run build
```

---

## 4. Start the production server

Run:

```bash
npm start
```

The application will be available at:

```text
http://localhost:4173
```

---

# Development Mode (Optional)

Development mode is intended for active frontend development and provides Vite hot module replacement.

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

For testing the complete application flow, the production build is recommended.

---

# Authentication Flow

The application uses JWT-based authentication.

Flow:

1. User authenticates through REST API endpoints.
2. Backend issues authentication tokens.
3. Refresh token is stored using an HTTP-only cookie.
4. Apollo Client sends authenticated GraphQL requests.
5. Protected operations require a valid authentication session.

---

# UI Architecture

The UI is built using reusable React components.

Technologies:

* Tailwind CSS for styling
* shadcn/ui for UI components
* Lucide React for icons

Components are organized to keep UI logic reusable across pages.

---

# Routing

React Router is used for client-side routing.

Protected routes require an authenticated user session before access is granted.

---

# Available Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start Vite development server     |
| `npm run build` | Create optimized production build |
| `npm start`     | Preview production build          |
| `npm run lint`  | Run ESLint checks                 |

---

# License

ISC

---

# Author

**Akshay Pawar**
