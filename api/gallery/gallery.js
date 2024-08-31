import { Schema, model } from "mongoose";

const gallerySchema = new Schema({
  imageURL: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("Gallery", gallerySchema);
