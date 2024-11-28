import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
    purchaseBook,
    getPurchasedBooks,
    getPurchasers,
    updatePurchaseStatus
} from "../controllers/purchased.controller.js";

const router = express.Router();

router.route("/purchase/:id").post(isAuthenticated, purchaseBook);
router.route("/my-purchases").get(isAuthenticated, getPurchasedBooks);
router.route("/purchasers/:id").get(isAuthenticated, getPurchasers);
router.route("/status/:id").patch(isAuthenticated, updatePurchaseStatus);

export default router;
