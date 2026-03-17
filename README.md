# OSA 1

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
