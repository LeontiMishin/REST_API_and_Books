import express from 'express';
import type { Request, Response, Application } from 'express';
import type { Book, Author, Publisher, Review, Genre } from './models/models.js';

// In‑memory stores and simple id generators (for demo purposes)
const books: Book[] = [];
const authors: Author[] = [];
const publishers: Publisher[] = [];
const reviews: Review[] = [];
const genres: Genre[] = [];

let nextBookId = 1;
let nextAuthorId = 1;

const app: Application = express(); 

const PORT: number = 3000; 

app.use(express.json()); 


// --- Books -------------------------------------------------------------------
app.post('/api/v1/books', (req: Request, res: Response) => {
  const payload = req.body as Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;
  const newBook: Book = {
    ...payload,
    id: nextBookId++,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.get('/api/v1/books', (req: Request, res: Response) => {
  res.json(books);
});

app.get('/api/v1/books/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

app.put('/api/v1/books/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });
  const updated = { ...books[index], ...req.body, updatedAt: new Date() } as Book;
  books[index] = updated;
  res.json(updated);
});

app.delete('/api/v1/books/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });
  books.splice(idx, 1);
  res.status(204).send();
});

app.get('/api/v1/books/:id/reviews', (req: Request, res: Response) => {
  const bookId = Number(req.params.id);
  res.json(reviews.filter(r => r.bookId === bookId));
});

app.get('/api/v1/books/:id/average-rating', (req: Request, res: Response) => {
  const bookId = Number(req.params.id);
  const bookReviews = reviews.filter(r => r.bookId === bookId);
  if (bookReviews.length === 0) {
    return res.json({ bookId, average: null, count: 0 });
  }
  const sum = bookReviews.reduce((acc, r) => acc + r.rating, 0);
  const avg = sum / bookReviews.length;
  res.json({ bookId, average: avg, count: bookReviews.length });
});




// --- Authors ----------------------------------------------------------------
app.post('/api/v1/authors', (req: Request, res: Response) => {
  const payload = req.body as Omit<Author, 'id' | 'createdAt'>;
  const newAuthor: Author = {
    ...payload,
    id: nextAuthorId++,
    createdAt: new Date()
  };
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

app.get('/api/v1/authors', (req: Request, res: Response) => {
  res.json(authors);
});

app.get('/api/v1/authors/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const auth = authors.find(a => a.id === id);
  if (!auth) return res.status(404).json({ error: 'Author not found' });
  res.json(auth);
});

app.put('/api/v1/authors/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const idx = authors.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Author not found' });
  const updated = { ...authors[idx], ...req.body } as Author;
  authors[idx] = updated;
  res.json(updated);
});

app.delete('/api/v1/authors/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const idx = authors.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Author not found' });
  authors.splice(idx, 1);
  res.status(204).send();
});


app.listen(PORT, () => { 
  console.log(`Server running on http://localhost:${PORT}`); 
  console.log(`API endpoints:`); 
  console.log(`   CRUD /api/v1/books`); 
  console.log(`   CRUD /api/v1/authors`); 
});