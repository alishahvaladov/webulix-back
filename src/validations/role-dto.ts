import { z } from "zod";
import { isValidObjectId } from "mongoose";
import { Groups, Privileges } from "../constants";

export const RoleSchema = z.object({
  name: z.string(),
  group: z.custom((val) => Object.values(Groups).includes(val as any)),
  collection_id: z.array(z.custom((val) => isValidObjectId(val))),
  privilege: z.custom((val) => Object.values(Privileges).includes(val as any))
});

export type RoleType = z.infer<typeof RoleSchema>;