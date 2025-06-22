import { Router } from "express";
import { borrowController } from "./borrow.controller";

const borrowRoutes = Router();

borrowRoutes.post("/", borrowController.createBorrow);
borrowRoutes.get("/", borrowController.getBorrows);

export default borrowRoutes;