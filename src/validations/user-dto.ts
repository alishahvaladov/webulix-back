import { Schema } from "mongoose";
import { z } from "zod";

export const UserSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  middle_name: z.string().optional(),
  password: z.string(),
  username: z.string(),
  phone_number: z.number(),
  speciality: z.string(),
  role: z.string(),
  email: z.string().email()
});

export type UserType = z.infer<typeof UserSchema>;