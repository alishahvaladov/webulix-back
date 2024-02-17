import mongoose, { Schema, model, Document } from "mongoose";

export interface CollectionDocument extends Document {
  name: string,
}

export const CollectionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const CollectionModel = model<CollectionDocument>("Collection", CollectionSchema);

export default CollectionModel;