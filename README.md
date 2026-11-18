# NestJS API Example

A REST API starter built with NestJS on the Fastify adapter, with JWT authentication and PostgreSQL via Prisma.

## What's inside

- **NestJS + Fastify** with URI versioning (`/api/v1/...`)
- **Auth:** sign-in with JWT, a global auth guard and a `@Public()` decorator for open routes
- **Users module** organized by controllers, DTOs, use cases and repositories
- **Validation** with class-validator and class-transformer
- **Swagger** docs under `/api/swagger`
- **Logging** middleware and interceptors
- **Tests:** Jest unit and e2e setup with Supertest and Faker factories
- **Docker** image and a GitHub Actions workflow that builds, pushes and deploys the container

## Stack

TypeScript · NestJS · Fastify · Prisma · PostgreSQL · JWT · Jest · Docker

## Getting started

```bash
cp .env.model .env
pnpm install
pnpm prisma migrate dev
pnpm dev
```

The API runs on `http://localhost:5000` by default.
