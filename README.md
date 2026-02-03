# Nest Auth + Prisma Template

## Description

This is a **template project** for integrating authentication using **NestJS**, **Prisma**, and **JWT**.
It includes:

* User management with Prisma and PostgreSQL
* JWT authentication (login, protected routes)
* Custom decorators (`@Auth()`, `@GetUser()`)
* Example public and protected routes

This project is intended as a **starting point** for building NestJS apps with authentication.

---

## Requirements

* Node.js >= 18
* Docker (for PostgreSQL)
* pnpm (recommended) or npm/yarn

---

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/SebasDev807/nest-auth-kit.git
cd nest-auth-kit
```

2. **Rename `.env.template` to `.env`**

Copy `.env.example` to `.env` and update your credentials:

```env
DATABASE_URL="postgresql://postgres:root@localhost:5432/auth_kit?schema=public" 
PORT=3000
JWT_SECRET=5up3r_s3cr3t_1wt_k3y321

POSTGRES_USER=postgres
POSTGRES_PASSWORD=root
POSTGRES_DB=auth_kit
POSTGRES_PORT=5432
```

3. **Start PostgreSQL using Docker**

```bash
docker compose up -d
```

Make sure the database is running:

```bash
docker ps
```

4. **Install dependencies**

```bash
pnpm install
```

5. **Run Prisma migrations**

```bash
pnpx prisma migrate dev --name init
```

6. **Start the app**

```bash
pnpm start:dev
```

The API should now be running on `http://localhost:3000/api/v1`.

---

## API Endpoints

### Public routes

```http
GET /example/public
```
```http
POST /users/register
```
* Register a new user
* Request Body
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

```http
POST /auth/login
```
* Login with existing account
* Request Body
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```


Returns a message without authentication.

### Protected route

```http
GET /example/protected
Authorization: Bearer <JWT_TOKEN>
```

Returns a message with user info. Requires a valid JWT token.

---

## Auth Decorators

* `@Auth()` → applies JWT guard to a route
* `@GetUser()` → extracts the authenticated user from the request

Example:

```ts
@Auth()
@Get('protected')
protectedRoute(@GetUser() user) {
  return {
    message: 'This is a protected route',
    user
  };
}
```

---

## Notes

* Ensure you always pass the JWT token in the `Authorization` header as `Bearer <token>`.
* `AuthModule` and `UsersModule` should be properly imported in each module that uses `@Auth()`.
* This template is intended for learning and starting a project; adapt it as needed for production use.
