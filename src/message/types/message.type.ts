import z from "zod";

export const messageSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  text: z.string(),
  timestamp: z.number(),
});

export type Message = z.infer<typeof messageSchema>;