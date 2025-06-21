import { Request, Response } from "express";
import { Book } from "./book.model";

const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    // if (error?.errors) {
    //   Object.values(error.errors).forEach((err: any) => {
    //     if (err?.properties) {
    //       delete err.properties.path;
    //       delete err.properties.value;
    //     }
    //   });
    // }

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

export const bookController = {
  createBook,
};
