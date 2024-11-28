import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
    addBook,
    getAllBooks,
    deleteBook
} from "../controllers/book.controller.js";

const router = express.Router();

router.route("/add").post(isAuthenticated, addBook);
router.route("/get").get( getAllBooks);
router.route("/delete/:id").delete(isAuthenticated, deleteBook);

export default router;
