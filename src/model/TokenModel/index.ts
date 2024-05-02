import { Schema, model, Document, ObjectId } from "mongoose";

export interface TokenDoc extends Document {
  user_id: ObjectId,
  token: string
};


const TokenSchema = new Schema<TokenDoc>({
  user_id: {
    ref: "User",
    required: true,
    type: Schema.Types.ObjectId
  },
  token: {
    type: String,
    required: true
  }
});

const TokenModel = model<TokenDoc>("Token", TokenSchema);

export default TokenModel;