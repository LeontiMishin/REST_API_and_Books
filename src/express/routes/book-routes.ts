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

/**
 * @openapi
 * components:
 *   schemas:
 *     ErrorDetail:
 *       type: object
 *       properties:
 *         field:
 *           type: string
 *         message:
 *           type: string
 *       required:
 *         - field
 *         - message
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *         details:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ErrorDetail'
 *       required:
 *         - error
 *         - details
 *     Pagination:
 *       type: object
 *       properties:
 *         currentPage:
 *           type: integer
 *         totalPages:
 *           type: integer
 *         totalItems:
 *           type: integer
 *         itemsPerPage:
 *           type: integer
 *         hasNextPage:
 *           type: boolean
 *         hasPreviousPage:
 *           type: boolean
 *       required:
 *         - currentPage
 *         - totalPages
 *         - totalItems
 *         - itemsPerPage
 *         - hasNextPage
 *         - hasPreviousPage
 *     Author:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         birthYear:
 *           type: integer
 *         nationality:
 *           type: string
 *         biography:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - firstName
 *         - lastName
 *         - birthYear
 *         - nationality
 *         - createdAt
 *     Genre:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *       required:
 *         - id
 *         - name
 *     Publisher:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         country:
 *           type: string
 *         foundedYear:
 *           type: integer
 *         website:
 *           type: string
 *           format: uri
 *         createdAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - name
 *         - country
 *         - foundedYear
 *         - createdAt
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         bookId:
 *           type: integer
 *         userName:
 *           type: string
 *         rating:
 *           type: integer
 *           enum: [1, 2, 3, 4, 5]
 *         comment:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - bookId
 *         - userName
 *         - rating
 *         - comment
 *         - createdAt
 *     ReviewCreate:
 *       type: object
 *       required:
 *         - userName
 *         - rating
 *         - comment
 *       properties:
 *         userName:
 *           type: string
 *         rating:
 *           type: integer
 *           enum: [1, 2, 3, 4, 5]
 *         comment:
 *           type: string
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         isbn:
 *           type: string
 *         publishedYear:
 *           type: integer
 *         pageCount:
 *           type: integer
 *         language:
 *           type: string
 *         description:
 *           type: string
 *         coverImage:
 *           type: string
 *           format: uri
 *         authorId:
 *           type: integer
 *         publisherId:
 *           type: integer
 *         genres:
 *           type: array
 *           items:
 *             type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         author:
 *           $ref: '#/components/schemas/Author'
 *         publisher:
 *           $ref: '#/components/schemas/Publisher'
 *         genreDetails:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Genre'
 *         reviews:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Review'
 *       required:
 *         - id
 *         - title
 *         - isbn
 *         - publishedYear
 *         - pageCount
 *         - language
 *         - description
 *         - authorId
 *         - publisherId
 *         - genres
 *         - createdAt
 *         - updatedAt
 *     BookCreate:
 *       type: object
 *       required:
 *         - title
 *         - isbn
 *         - publishedYear
 *         - pageCount
 *         - language
 *         - description
 *         - authorId
 *         - publisherId
 *         - genres
 *       properties:
 *         title:
 *           type: string
 *         isbn:
 *           type: string
 *         publishedYear:
 *           type: integer
 *         pageCount:
 *           type: integer
 *         language:
 *           type: string
 *         description:
 *           type: string
 *         coverImage:
 *           type: string
 *           format: uri
 *         authorId:
 *           type: integer
 *         publisherId:
 *           type: integer
 *         genres:
 *           type: array
 *           items:
 *             type: integer
 *     BookUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         isbn:
 *           type: string
 *         publishedYear:
 *           type: integer
 *         pageCount:
 *           type: integer
 *         language:
 *           type: string
 *         description:
 *           type: string
 *         coverImage:
 *           type: string
 *           format: uri
 *         authorId:
 *           type: integer
 *         publisherId:
 *           type: integer
 *         genres:
 *           type: array
 *           items:
 *             type: integer
 */

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookCreate'
 *     responses:
 *       201:
 *         description: Created book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: ISBN already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
bookRoutes.post("/books", (request: Request, response: Response, next: NextFunction) => {
  try {
    const body = createBookSchema.parse(request.body);
    const book = createBook(body);

    response.status(201).json({ data: book });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /books:
 *   get:
 *     summary: List books with optional filters and pagination
 *     tags:
 *       - Books
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by book title
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter by author name
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Filter by language
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter by genre name
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filter by published year
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [title, publishedYear]
 *         description: Sort field
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort direction
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Page size
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
bookRoutes.get("/books", (request: Request, response: Response, next: NextFunction) => {
  try {
    const query = listBooksQuerySchema.parse(request.query);
    const result = listBooks(query);

    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
bookRoutes.get("/books/:id", (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = paramsWithIdSchema.parse(request.params);
    const book = getBookById(params.id);

    response.status(200).json({ data: book });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookUpdate'
 *     responses:
 *       200:
 *         description: Updated book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: ISBN already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deletion result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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

/**
 * @openapi
 * /books/{bookId}/reviews:
 *   post:
 *     summary: Create a review for a book
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewCreate'
 *     responses:
 *       201:
 *         description: Created review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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

/**
 * @openapi
 * /books/{bookId}/reviews:
 *   get:
 *     summary: Get reviews for a book
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Array of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
bookRoutes.get("/books/:bookId/reviews", (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = paramsWithBookIdSchema.parse(request.params);
    const bookReviews = getBookReviews(params.bookId);

    response.status(200).json({ data: bookReviews });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /books/{id}/average-rating:
 *   get:
 *     summary: Get average rating for a book
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Average rating result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     bookId:
 *                       type: integer
 *                     averageRating:
 *                       type: number
 *                     reviewCount:
 *                       type: integer
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
bookRoutes.get("/books/:id/average-rating", (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = paramsWithIdSchema.parse(request.params);
    const averageRating = getAverageRating(params.id);

    response.status(200).json({ data: averageRating });
  } catch (error) {
    next(error);
  }
});
