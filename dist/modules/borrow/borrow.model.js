"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book ID is Required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is Required"],
        min: [1, "Quantity must be at least 1"],
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value. Quantity must be a whole number.",
        },
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is Required"],
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: "Due date must be in the future",
        },
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
