
import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, "Please enter title"),
  content: z.string().min(1, "Content field cannot be empty"),
  categoryId: z.string().min(1, "Please select category"),
});
export const categorySchema = z.object({
  name: z.string().min(1, "Category field cannot be empty"),
});

export type ArticleSchema = z.infer<typeof articleSchema>;
export type CategorySchema = z.infer<typeof categorySchema>;
