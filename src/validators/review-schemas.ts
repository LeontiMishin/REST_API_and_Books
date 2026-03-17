import { z } from "zod";

export const createReviewSchema = z.object({
  userName: z.string().trim().min(2).max(100),
  rating: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5)
  ]),
  comment: z.string().trim().min(3).max(500)
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
