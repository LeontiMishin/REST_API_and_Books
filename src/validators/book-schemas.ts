import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().trim().min(1).max(150),
  isbn: z.string().trim().regex(/^(97(8|9))?\d{9}(\d|X)$/, "Invalid ISBN format"),
  publishedYear: z.number().int().min(1000).max(new Date().getFullYear()),
  pageCount: z.number().int().positive().max(10000),
  language: z.string().trim().min(2).max(50),
  description: z.string().trim().min(10).max(500),
  coverImage: z.string().trim().url().optional(),
  authorId: z.number().int().positive(),
  publisherId: z.number().int().positive(),
  genres: z.array(z.number().int().positive()).min(1)
});

export const updateBookSchema = createBookSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  {
    message: "At least one field must be provided"
  }
);

export const listBooksQuerySchema = z.object({
  title: z.string().trim().min(1).optional(),
  author: z.string().trim().min(1).optional(),
  publisher: z.string().trim().min(1).optional(),
  language: z.string().trim().min(1).optional(),
  genre: z.string().trim().min(1).optional(),
  year: z.coerce.number().int().min(1000).max(new Date().getFullYear()).optional(),
  sortBy: z.enum(["title", "publishedYear"]).optional().default("title"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10)
});

export const paramsWithBookIdSchema = z.object({
  bookId: z.coerce.number().int().positive()
});

export const paramsWithIdSchema = z.object({
  id: z.coerce.number().int().positive()
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
export type ListBooksQuery = z.infer<typeof listBooksQuerySchema>;
