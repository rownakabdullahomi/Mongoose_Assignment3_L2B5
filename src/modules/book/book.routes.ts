import { Router } from "express";
import { bookController } from "./book.controller";


const bookRoutes = Router();

bookRoutes.post("/", bookController.createBook);
bookRoutes.get("/", bookController.getBooks);
bookRoutes.get("/:id", bookController.getBookById);
bookRoutes.patch("/:id", bookController.updateBookById);
bookRoutes.delete("/:id", bookController.deleteBookById);

export default bookRoutes;