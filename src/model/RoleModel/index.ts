import { Schema, model, Document, ObjectId } from "mongoose";
import { RoleType } from "../../validations/role-dto";

export const RoleSchema = new Schema<RoleType>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  collection_id: {
    ref: "Collection",
    required: true,
    type: Schema.Types.ObjectId,
  },
  group: {
    type: [String],
    required: true
  },
  privilege: {
    required: true,
    type: [String]
  }
});

const RoleModel = model<RoleType>("Role", RoleSchema);

export default RoleModel;