import { authors, books, genres, publishers, reviews } from "../data/mock-data";
import { AppError } from "../middleware/error-handler";
import type { Book, BookWithRelations, Review } from "../models/entities";
import { createPaginatedResponse } from "../utils/pagination";
import type { CreateBookInput, ListBooksQuery, UpdateBookInput } from "../validators/book-schemas";
import type { CreateReviewInput } from "../validators/review-schemas";

const generateId = (existingItems: Array<{ id: number }>): number => {
  const maxId = existingItems.reduce((currentMax, item) => Math.max(currentMax, item.id), 0);
  return maxId + 1;
};

const findAuthorFullNameById = (authorId: number): string => {
  const author = authors.find((item) => item.id === authorId);
  return author ? `${author.firstName} ${author.lastName}` : "";
};

const hasGenreName = (book: Book, genreName: string): boolean =>
  book.genres.some((genreId) => {
    const genre = genres.find((item) => item.id === genreId);
    return genre?.name.toLowerCase() === genreName.toLowerCase();
  });

const mapBookWithRelations = (book: Book): BookWithRelations => ({
  ...book,
  author: authors.find((author) => author.id === book.authorId) ?? null,
  publisher: publishers.find((publisher) => publisher.id === book.publisherId) ?? null,
  genreDetails: genres.filter((genre) => book.genres.includes(genre.id)),
  reviews: reviews.filter((review) => review.bookId === book.id)
});

const assertRelationsExist = (authorId: number, publisherId: number, genreIds: number[]): void => {
  const authorExists = authors.some((author) => author.id === authorId);
  const publisherExists = publishers.some((publisher) => publisher.id === publisherId);
  const invalidGenreIds = genreIds.filter((genreId) => !genres.some((genre) => genre.id === genreId));

  if (!authorExists) {
    throw new AppError(400, "Validation failed", [
      { field: "authorId", message: "Author does not exist" }
    ]);
  }

  if (!publisherExists) {
    throw new AppError(400, "Validation failed", [
      { field: "publisherId", message: "Publisher does not exist" }
    ]);
  }

  if (invalidGenreIds.length > 0) {
    throw new AppError(400, "Validation failed", [
      { field: "genres", message: `Invalid genre ids: ${invalidGenreIds.join(", ")}` }
    ]);
  }
};

export const listBooks = (query: ListBooksQuery) => {
  const filteredBooks = books
    .filter((book) => {
      const titleMatch = query.title
        ? book.title.toLowerCase().includes(query.title.toLowerCase())
        : true;
      const authorMatch = query.author
        ? findAuthorFullNameById(book.authorId).toLowerCase().includes(query.author.toLowerCase())
        : true;
      const languageMatch = query.language
        ? book.language.toLowerCase() === query.language.toLowerCase()
        : true;
      const genreMatch = query.genre ? hasGenreName(book, query.genre) : true;
      const yearMatch = query.year ? book.publishedYear === query.year : true;

      return titleMatch && authorMatch && languageMatch && genreMatch && yearMatch;
    })
    .sort((leftBook, rightBook) => {
      const direction = query.sortOrder === "desc" ? -1 : 1;

      if (query.sortBy === "publishedYear") {
        return (leftBook.publishedYear - rightBook.publishedYear) * direction;
      }

      return leftBook.title.localeCompare(rightBook.title) * direction;
    });

  const startIndex = (query.page - 1) * query.limit;
  const endIndex = startIndex + query.limit;
  const pageItems = filteredBooks.slice(startIndex, endIndex).map((book) => mapBookWithRelations(book));

  return createPaginatedResponse(pageItems, query.page, query.limit, filteredBooks.length);
};

export const getBookById = (id: number): BookWithRelations => {
  const book = books.find((item) => item.id === id);

  if (!book) {
    throw new AppError(404, "Book not found");
  }

  return mapBookWithRelations(book);
};

export const createBook = (input: CreateBookInput): BookWithRelations => {
  assertRelationsExist(input.authorId, input.publisherId, input.genres);

  const duplicateIsbn = books.some((book) => book.isbn === input.isbn);
  if (duplicateIsbn) {
    throw new AppError(409, "Validation failed", [
      { field: "isbn", message: "Book with this ISBN already exists" }
    ]);
  }

  const now = new Date();
  const newBook: Book = {
    id: generateId(books),
    ...input,
    createdAt: now,
    updatedAt: now
  };

  books.push(newBook);

  return mapBookWithRelations(newBook);
};

export const updateBook = (id: number, input: UpdateBookInput): BookWithRelations => {
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    throw new AppError(404, "Book not found");
  }

  const currentBook = books[bookIndex];
  const nextAuthorId = input.authorId ?? currentBook.authorId;
  const nextPublisherId = input.publisherId ?? currentBook.publisherId;
  const nextGenres = input.genres ?? currentBook.genres;

  assertRelationsExist(nextAuthorId, nextPublisherId, nextGenres);

  if (input.isbn) {
    const duplicateIsbn = books.some((book) => book.id !== id && book.isbn === input.isbn);
    if (duplicateIsbn) {
      throw new AppError(409, "Validation failed", [
        { field: "isbn", message: "Book with this ISBN already exists" }
      ]);
    }
  }

  const updatedBook: Book = {
    ...currentBook,
    ...input,
    updatedAt: new Date()
  };

  books[bookIndex] = updatedBook;

  return mapBookWithRelations(updatedBook);
};

export const deleteBook = (id: number): void => {
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    throw new AppError(404, "Book not found");
  }

  books.splice(bookIndex, 1);

  for (let index = reviews.length - 1; index >= 0; index -= 1) {
    if (reviews[index].bookId === id) {
      reviews.splice(index, 1);
    }
  }
};

export const createReview = (bookId: number, input: CreateReviewInput): Review => {
  const bookExists = books.some((book) => book.id === bookId);

  if (!bookExists) {
    throw new AppError(404, "Book not found");
  }

  const review: Review = {
    id: generateId(reviews),
    bookId,
    ...input,
    createdAt: new Date()
  };

  reviews.push(review);

  return review;
};

export const getBookReviews = (bookId: number): Review[] => {
  const bookExists = books.some((book) => book.id === bookId);

  if (!bookExists) {
    throw new AppError(404, "Book not found");
  }

  return reviews.filter((review) => review.bookId === bookId);
};

export const getAverageRating = (bookId: number): { bookId: number; averageRating: number; reviewCount: number } => {
  const bookReviews = getBookReviews(bookId);
  const reviewCount = bookReviews.length;

  if (reviewCount === 0) {
    return {
      bookId,
      averageRating: 0,
      reviewCount: 0
    };
  }

  const totalRating = bookReviews.reduce((sum, review) => sum + review.rating, 0);

  return {
    bookId,
    averageRating: Number((totalRating / reviewCount).toFixed(2)),
    reviewCount
  };
};
