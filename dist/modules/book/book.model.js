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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is Required"],
        trim: true,
    },
    author: { type: String, required: true, min: 3, max: 100, trim: true },
    genre: {
        type: String,
        required: true,
        trim: true,
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
            message: "{VALUE} is not an integer value, Copies must be an integer number",
        },
    },
    available: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.pre("validate", function (next) {
    const allowedGenres = [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
    ];
    if (this.genre) {
        this.genre = this.genre.toUpperCase();
        if (!allowedGenres.includes(this.genre)) {
            const error = new Error(`${this.genre} is not a valid genre`);
            return next(error);
        }
    }
    next();
});
bookSchema.post("save", function (doc, next) {
    console.log(`📚 New book created: ${doc.title} (${doc._id})`);
    next();
});
bookSchema.post("findOneAndUpdate", function (doc, next) {
    if (doc) {
        console.log(`✅ Book updated: ${doc.title} (${doc._id})`);
    }
    next();
});
bookSchema.static("checkAndUpdateStock", function checkAndUpdateStock(bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (!book)
            throw new Error("Book not found");
        if (book.copies < quantity) {
            throw new Error("Insufficient copies available");
        }
        book.copies -= quantity;
        if (book.copies === 0) {
            book.available = false;
        }
        yield book.save();
        return book;
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
