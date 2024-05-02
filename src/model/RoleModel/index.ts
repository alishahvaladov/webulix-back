import { Schema, model, Document, ObjectId } from "mongoose";
import { Groups, Privileges } from "../../constants";

export interface RoleAccessDoc {
  collection_id: ObjectId,
  privilege: string[],
}

export interface RoleDoc extends Document {
  name: string,
  group: string[],
  roleAccess: RoleAccessDoc[],
}

export const RoleSchema = new Schema<RoleDoc>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  group: {
    type: [String],
    required: true,
    enum: Object.values(Groups),
  },
  roleAccess: [
    {
      collection_data: {
        ref: "Collection",
        required: true,
        type: Schema.Types.ObjectId,
      },
      privilege: {
          required: true,
          type: [String],
          enum: Object.values(Privileges),
        }
    }
  ]
});

RoleSchema.set("toObject", { getters: true });
RoleSchema.set("toJSON", { getters: true });

RoleSchema.pre("find", function() {
  this.populate("roleAccess.collection_data");
});

const RoleModel = model<RoleDoc>("Role", RoleSchema);

export default RoleModel;