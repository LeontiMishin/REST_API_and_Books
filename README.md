# REST API and Books

TypeScript + Express + Zod + Swagger project with two fully separate working modes:

- `OSA 1` — mock data in memory
- `OSA 2` — PostgreSQL + Prisma ORM

## Project Structure

```text
src/
  config/
  controllers/
  data/
  express/routes/
  lib/
  middleware/
  models/
  services/
  utils/
  validators/
prisma/
  migrations/
  schema.prisma
  seed.ts
```

## Install

```bash
npm install
```

## OSA 1: Run Mock Version

This mode does not need PostgreSQL.

1. Start the server:

```bash
npm run dev:mock
```

2. Open:

- `http://localhost:3000/api-docs`
- `http://localhost:3000/api/v1/books`

## OSA 2: Run PostgreSQL Version

This mode needs PostgreSQL and Prisma.

1. Generate Prisma client:

```bash
npm run prisma:generate
```

2. Apply migrations:

```bash
npx prisma migrate dev --name init
```

Or on an already prepared database:

```bash
npm run prisma:migrate:deploy
```

3. Seed the database:

```bash
npm run prisma:seed
```

4. Optional: open Prisma Studio to inspect database data:

```bash
npm run prisma:studio
```

Prisma Studio usually opens at:

- `http://localhost:5555`

5. Start PostgreSQL mode:

```bash
npm run dev:postgres
```

6. Open:

- `http://localhost:3000/api-docs`
- `http://localhost:3000/api/v1/books`

## Common Commands

```bash
npm run typecheck
npm run build
npm start
```

## Prisma Commands

```bash
npm run prisma:generate
npx prisma migrate dev --name init
npm run prisma:migrate:deploy
npm run prisma:seed
npm run prisma:studio
```

## API Documentation

- Swagger UI: `http://localhost:3000/api-docs`

## Endpoints

### Books

- `POST /api/v1/books`
- `GET /api/v1/books`
- `GET /api/v1/books/:id`
- `PUT /api/v1/books/:id`
- `DELETE /api/v1/books/:id`

### Reviews

- `POST /api/v1/books/:bookId/reviews`
- `GET /api/v1/books/:bookId/reviews`
- `GET /api/v1/reviews/:id`
- `PUT /api/v1/reviews/:id`
- `DELETE /api/v1/reviews/:id`
- `GET /api/v1/books/:id/average-rating`

## Query Parameters

### Books

`GET /api/v1/books`

- filters: `title`, `author`, `publisher`, `genre`, `language`, `year`
- sorting: `sortBy=title|publishedYear`
- order: `order=asc|desc`
- pagination: `page`, `limit`

Example:

```bash
curl "http://localhost:3000/api/v1/books?genre=Historical%20Fiction&language=English&publisher=HarperCollins&sortBy=publishedYear&order=desc&page=1&limit=5"
```

### Reviews

`GET /api/v1/books/:bookId/reviews`

- filter: `rating`
- sorting: `sortBy=createdAt`
- order: `order=asc|desc`

Example:

```bash
curl "http://localhost:3000/api/v1/books/1/reviews?rating=4&sortBy=createdAt&order=desc"
```

## Request Body Examples

### Create Book

```json
{
  "title": "The Sample Book",
  "isbn": "9781234567897",
  "publishedYear": 2024,
  "pageCount": 320,
  "language": "English",
  "description": "A valid description for a new sample book entry.",
  "coverImage": "https://example.com/sample-book.jpg",
  "authorId": 1,
  "publisherId": 1,
  "genres": [1, 6]
}
```

### Update Book

```json
{
  "title": "Updated Title",
  "genres": [2, 3]
}
```

### Create Review

```json
{
  "userName": "Leonti",
  "rating": 5,
  "comment": "Very good book."
}
```

## Response Examples

### Pagination Response

```json
{
  "data": [],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 47,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### Error Response

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "isbn",
      "message": "Invalid ISBN format"
    }
  ]
}
```

### Average Rating Response

```json
{
  "data": {
    "bookId": 1,
    "averageRating": 4.5,
    "reviewCount": 2
  }
}
```