import { Schema, Document, model } from "mongoose";

const SpecialitySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const SpecialityModel = model("Speciality", SpecialitySchema);

export default SpecialityModel;