import { z } from "zod";
import { isValidObjectId } from "mongoose";

export const RoleSchema = z.object({
  name: z.string(),
  group: z.string().array(),
  collection_id: z.custom((val) => isValidObjectId(val)),
  privilege: z.string().array()
});

export type RoleType = z.infer<typeof RoleSchema>;