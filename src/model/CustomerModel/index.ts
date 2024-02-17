import { Schema, model, Document } from "mongoose";

export interface CustomerDocument extends Document {
  user_id: Schema.Types.ObjectId,
  role_id: Schema.Types.ObjectId
};

export const CustomerSchema = new Schema<CustomerDocument>({
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

const CustomerModel = model<CustomerDocument>("Admin", CustomerSchema);

export default CustomerModel;