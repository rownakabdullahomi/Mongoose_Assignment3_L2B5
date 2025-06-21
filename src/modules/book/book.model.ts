import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, min: 3, max: 100, trim: true },
    genre: {
      type: String,
      enum: [
        "fiction",
        "non_fiction",
        "science",
        "history",
        "biography",
        "fantasy",
      ],
      uppercase: true,
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String, trim: true },
    copies: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Book = model<IBook>("Book", bookSchema);
