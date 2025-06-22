import { Request, Response } from "express";
import { Borrow } from "./borrow.model";
import { Book } from "../book/book.model";

const createBorrow = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    // ✅ Try to update stock using static method
    const book = await Book.checkAndUpdateStock(body.book, body.quantity);
    body.book = book;

    // ✅ Create borrow record
    const borrow = await Borrow.create(body);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    // ✅ Handle custom "insufficient stock" error
    if (error.message === "Insufficient copies available") {
      res.status(409).json({
        success: false,
        message:
          "Book is currently out of stock or insufficient copies available.",
      });
    }

    res.status(400).json({
      success: false,
      message: "Validation Failed",
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
};

const getBorrows = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books", // 👈 the MongoDB collection name (lowercase plural of model)
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Borrowed books summary can not be retrieved",
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
};


export const borrowController = {
  createBorrow,
  getBorrows,
};
