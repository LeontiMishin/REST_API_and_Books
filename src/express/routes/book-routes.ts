import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import {
  createBook,
  createReview,
  deleteBook,
  getAverageRating,
  getBookById,
  getBookReviews,
  listBooks,
  updateBook
} from "../../services/book-service";
import {
  createBookSchema,
  listBooksQuerySchema,
  paramsWithBookIdSchema,
  paramsWithIdSchema,
  updateBookSchema
} from "../../validators/book-schemas";
import { createReviewSchema } from "../../validators/review-schemas";

export const bookRoutes = Router();

bookRoutes.post("/books", (request: Request, response: Response, next: NextFunction) => {
  try {
    const body = createBookSchema.parse(request.body);
    const book = createBook(body);

    response.status(201).json({ data: book });
  } catch (error) {
    next(error);
  }
});

bookRoutes.get("/books", (request: Request, response: Response, next: NextFunction) => {
  try {
    const query = listBooksQuerySchema.parse(request.query);
    const result = listBooks(query);

    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

bookRoutes.get("/books/:id", (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = paramsWithIdSchema.parse(request.params);
    const book = getBookById(params.id);

    response.status(200).json({ data: book });
  } catch (error) {
    next(error);
  }
});

bookRoutes.put("/books/:id", (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = paramsWithIdSchema.parse(request.params);
    const body = updateBookSchema.parse(request.body);
    const book = updateBook(params.id, body);

    response.status(200).json({ data: book });
  } catch (error) {
    next(error);
  }
});

bookRoutes.delete("/books/:id", (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = paramsWithIdSchema.parse(request.params);
    deleteBook(params.id);

    response.status(200).json({
      data: {
        message: "Book deleted successfully"
      }
    });
  } catch (error) {
    next(error);
  }
});

bookRoutes.post("/books/:bookId/reviews", (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = paramsWithBookIdSchema.parse(request.params);
    const body = createReviewSchema.parse(request.body);
    const review = createReview(params.bookId, body);

    response.status(201).json({ data: review });
  } catch (error) {
    next(error);
  }
});

bookRoutes.get("/books/:bookId/reviews", (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = paramsWithBookIdSchema.parse(request.params);
    const bookReviews = getBookReviews(params.bookId);

    response.status(200).json({ data: bookReviews });
  } catch (error) {
    next(error);
  }
});

bookRoutes.get("/books/:id/average-rating", (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = paramsWithIdSchema.parse(request.params);
    const averageRating = getAverageRating(params.id);

    response.status(200).json({ data: averageRating });
  } catch (error) {
    next(error);
  }
});
