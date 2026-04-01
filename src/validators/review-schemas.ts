import { z } from "zod";

const ratingSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5)
]);

const queryRatingSchema = z
  .coerce
  .number()
  .int()
  .min(1)
  .max(5)
  .transform((value) => value as z.infer<typeof ratingSchema>);

export const createReviewSchema = z.object({
  userName: z.string().trim().min(2).max(100),
  rating: ratingSchema,
  comment: z.string().trim().min(3).max(500)
});

export const updateReviewSchema = createReviewSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  {
    message: "At least one field must be provided"
  }
);

export const reviewParamsSchema = z.object({
  id: z.coerce.number().int().positive()
});

export const reviewListQuerySchema = z.object({
  rating: queryRatingSchema.optional(),
  sortBy: z.enum(["createdAt"]).optional().default("createdAt"),
  order: z.enum(["asc", "desc"]).optional().default("desc")
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
export type ReviewListQuery = z.infer<typeof reviewListQuerySchema>;
