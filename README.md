# OSA 1 Mock Data API

TypeScript + Express + Zod API raamatute ja arvustuste haldamiseks.

## Käivitamine

```bash
npm install
npm run dev
```

Tootmisbuild:

```bash
npm run build
npm start
```

Swagger:

```bash
http://localhost:3000/api-docs
```

## Endpointid

### Books

- `POST /api/v1/books`
- `GET /api/v1/books`
- `GET /api/v1/books/:id`
- `PUT /api/v1/books/:id`
- `DELETE /api/v1/books/:id`

### Reviews

- `POST /api/v1/books/:bookId/reviews`
- `GET /api/v1/books/:bookId/reviews`
- `GET /api/v1/books/:id/average-rating`

## Query võimalused

`GET /api/v1/books` toetab:

- filtreid: `title`, `author`, `language`, `genre`, `year`
- sorteerimist: `sortBy=title|publishedYear`
- sorteerimisjärjestust: `sortOrder=asc|desc`
- paginationit: `page`, `limit`

Näide:

```bash
curl "http://localhost:3000/api/v1/books?language=English&genre=Historical%20Fiction&sortBy=publishedYear&sortOrder=desc&page=1&limit=5"
```

## Näidis request body

### Uus raamat

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

### Uus review

```json
{
  "userName": "Leonti",
  "rating": 5,
  "comment": "Very good book."
}
```
