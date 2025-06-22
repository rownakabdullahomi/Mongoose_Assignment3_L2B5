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
exports.borrowController = void 0;
const borrow_model_1 = require("./borrow.model");
const book_model_1 = require("../book/book.model");
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // ✅ Try to update stock using static method
        const book = yield book_model_1.Book.checkAndUpdateStock(body.book, body.quantity);
        body.book = book;
        // ✅ Create borrow record
        const borrow = yield borrow_model_1.Borrow.create(body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    }
    catch (error) {
        // ✅ Handle custom "insufficient stock" error
        if (error.message === "Insufficient copies available") {
            res.status(409).json({
                success: false,
                message: "Book is currently out of stock or insufficient copies available.",
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
});
const getBorrows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Borrowed books summary can not be retrieved",
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
    }
});
exports.borrowController = {
    createBorrow,
    getBorrows,
};
