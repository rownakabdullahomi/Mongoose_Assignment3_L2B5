import { model, Schema } from "mongoose";
import { BookStaticMethod, IBook } from "./book.interface";

const bookSchema = new Schema<IBook, BookStaticMethod>(
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

// book.model.ts

bookSchema.static(
  "checkAndUpdateStock",
  async function checkAndUpdateStock(bookId, quantity) {
    const book = await this.findById(bookId);
    if (!book) throw new Error("Book not found");

    if (book.copies < quantity) {
      throw new Error("Insufficient copies available");
    }

    book.copies -= quantity;
    if (book.copies === 0) {
      book.available = false;
    }

    await book.save();
    return book;
  }
);

export const Book = model<IBook, BookStaticMethod>("Book", bookSchema);
