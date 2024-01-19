import { string, z } from "zod";
import { CustomErrorCode, CustomErrorRegex } from "../constants";


export const ErrorSchema = z.object({
  message: z.string(),
  field: z.array(z.string()).optional(),
  errorCode: z.string().refine((data) => {
    return CustomErrorRegex.test(data);
  }, {
    message: "Invalid custom error type"
  })
});

export type ErrorType = z.infer<typeof ErrorSchema>;