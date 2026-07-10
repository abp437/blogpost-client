# BlogPost Client

A React frontend for the **BlogPost** application built with **React**, **TypeScript**, **Vite**, **Apollo Client**, **GraphQL**, **Tailwind CSS**, and **shadcn/ui**.

The application consumes both the REST and GraphQL APIs exposed by the BlogPost Server.

---

# Architecture Overview

The frontend communicates with the backend using two API styles.

## REST API

REST endpoints are used for authentication-related operations, including:

* User registration
* User login
* Token refresh
* Logout

## GraphQL API

Apollo Client is used for all blog post operations.

GraphQL handles:

* Fetching blog posts
* Creating blog posts
* Updating blog posts
* Deleting blog posts

The GraphQL API is available at:

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
* GraphQL Queries & Mutations
* Responsive UI
* Reusable component architecture
* Tailwind CSS
* shadcn/ui components
* TypeScript

---

# Tech Stack

* React
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

The backend exposes:

* REST API
* GraphQL API

By default, the client expects the backend to be available at:

* REST API: `http://localhost:3000`
* GraphQL API: `http://localhost:3000/graphql`

---

# Installation

Clone the repository and install dependencies:

```bash
npm install
```

---

# Environment Variables

The repository includes a `.env.example` file.

Create your local environment file:

```bash
cp .env.example .env
```

The default configuration is:

```env
VITE_ENV=production
VITE_API_URL=http://localhost:3000
VITE_GRAPHQL_URL=http://localhost:3000/graphql
```

---

# Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

# Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm start
```

---

# Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the Vite development server    |
| `npm run build` | Build the application for production |
| `npm run lint`  | Run ESLint                           |
| `npm start`     | Preview the production build         |

---

# Project Structure

```text
src/
├── components/
├── graphql/
│   ├── mutations/
│   └── queries/
├── hooks/
├── lib/
├── pages/
├── routes/
├── App.tsx
└── main.tsx
```

---

# License

ISC

---

# Author

**Akshay Pawar**
