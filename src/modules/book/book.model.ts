import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Title is Required"],
      trim: true,
    },
    author: { type: String, required: true, min: 3, max: 100, trim: true },
    genre: {
      type: String,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "Please provide a valid genre",
      },
      uppercase: true,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: [true, "ISBN must be unique."],
    },
    description: { type: String, trim: true },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number, got {VALUE}"],
      validate: {
        validator: Number.isInteger,
        message:
          "{VALUE} is not an integer value, Copies must be an integer number",
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
