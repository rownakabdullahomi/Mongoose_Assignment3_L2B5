import { Router } from "express";
import bookRoutes from "../modules/book/book.routes";

const routes = Router();

routes.use("/book", bookRoutes);










routes.get("/", (req, res)=>{
    res.json({success: true, message: "⚡ Welcome to library server.."});
})

export default routes;