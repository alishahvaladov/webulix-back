import { UserRoleEnum } from "../../constants";
import { UserType } from "../../validations/user-dto";
import { Schema, model, Document } from "mongoose";
import PasswordHash from "../../utils/PasswordHash";

const UserSchema = new Schema<UserType & Document>({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  middle_name: {
    type: String,
    required: false
  },
  phone_number: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    enum: UserRoleEnum,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
    required: true,
    ref: "Speciality"
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordHash.toHash(this.get("password"));
    this.set("password", hashed);
  };
  done();
});

const UserModel = model<UserType & Document>("User", UserSchema);

export default UserModel;