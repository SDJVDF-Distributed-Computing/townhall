import z from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  avatar_url: z.url().optional(),
  status: z.enum(["Online", "Away", "Offline"]).default("Offline"),
});

export type User = z.infer<typeof userSchema>;