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
      message: "Filed to create book",
      error: {
        name: error.name,
        message: error.message,
        errors: error.errors,
      },
    });
  }
};

const getBooks = async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter?.toString();
    const sortBy = req.query.sortBy?.toString() || "createdAt";
    const sortOrder = req.query.sort === "asc" ? 1 : -1;
    const limit = parseInt(req.query.limit as string) || 10;

    const query = filter ? { genre: filter } : {};

    const books = await Book.find(query)
      .sort({ [sortBy]: sortOrder })
      .limit(limit);

    // const book = await Book.find();
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Books can not be retrieved",
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (book) {
      res.status(200).json({
        success: true,
        message: "Book retrieved successfully by id",
        data: book,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Book can not be retrieved",
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
};

const updateBookById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const book = await Book.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully by id",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Book update failed",
      error: {
        name: error.name,
        message: error.message,
        errors: error.errors,
      },
    });
  }
};

const deleteBookById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully by id",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Book can not be deleted",
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
};

export const bookController = {
  createBook,
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
