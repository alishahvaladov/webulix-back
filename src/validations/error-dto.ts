import { isValidObjectId } from "mongoose";
import { z } from "zod";


export const ErrorSchema = z.object({
  message: z.string(),
  field: z.array(z.string()).optional(),
  errorCode: z.string() 
});

export type ErrorType = z.infer<typeof ErrorSchema>;

export const CustomErrorSchema = z.object({
  prefix: z.custom((val) => isValidObjectId(val)),
  severity: z.custom((val) => isValidObjectId(val)),
  field: z.custom((val) => isValidObjectId(val)),
  reason: z.custom((val) => isValidObjectId(val)),
  description: z.string()
});

export type CustomErrorType = z.infer<typeof CustomErrorSchema>;