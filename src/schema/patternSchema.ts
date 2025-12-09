import { z } from "zod";

export const searchFormSchema = z.object({
  search: z.string(),
});

export type SearchSchema = z.infer<typeof searchFormSchema>;
