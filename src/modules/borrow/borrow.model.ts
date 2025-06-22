import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is Required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is Required"],
      min: [1, "Quantity must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message:
          "{VALUE} is not an integer value. Quantity must be a whole number.",
      },
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is Required"],
      validate: {
        validator: function (value: Date) {
          return value > new Date();
        },
        message: "Due date must be in the future",
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);




export const Borrow = model<IBorrow>("Borrow", borrowSchema);
