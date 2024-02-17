import { Schema, model, Document } from "mongoose";

export interface AdminDocument extends Document {
  user_id: Schema.Types.ObjectId,
  role_id: Schema.Types.ObjectId
};

export const AdminSchema = new Schema<AdminDocument>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  role_id: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true
  }
});

const AdminModel = model<AdminDocument>("Admin", AdminSchema);

export default AdminModel;