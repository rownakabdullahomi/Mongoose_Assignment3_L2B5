"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const book_model_1 = require("./book.model");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
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
});
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const filter = (_a = req.query.filter) === null || _a === void 0 ? void 0 : _a.toString();
        const sortBy = ((_b = req.query.sortBy) === null || _b === void 0 ? void 0 : _b.toString()) || "createdAt";
        const sortOrder = req.query.sort === "asc" ? 1 : -1;
        const limit = parseInt(req.query.limit) || 10;
        const query = filter ? { genre: filter } : {};
        const books = yield book_model_1.Book.find(query)
            .sort({ [sortBy]: sortOrder })
            .limit(limit);
        // const book = await Book.find();
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Books can not be retrieved",
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
    }
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const book = yield book_model_1.Book.findById(id);
        if (book) {
            res.status(200).json({
                success: true,
                message: "Book retrieved successfully by id",
                data: book,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Book can not be retrieved",
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
    }
});
const updateBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const body = req.body;
        const book = yield book_model_1.Book.findByIdAndUpdate(id, body, {
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
    }
    catch (error) {
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
});
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const book = yield book_model_1.Book.findByIdAndDelete(id);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Book can not be deleted",
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
    }
});
exports.bookController = {
    createBook,
    getBooks,
    getBookById,
    updateBookById,
    deleteBookById,
};
