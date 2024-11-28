import { Purchased } from "../models/purchased.model.js";
import { Book } from "../models/book.model.js";

// User purchases a book
export const purchaseBook = async (req, res) => {
    try {
        const userId = req.id;
        const bookId = req.params.id;

        if (!bookId) {
            return res.status(400).json({
                message: "Book ID is required.",
                success: false
            });
        }

        // Check if the user has already purchased the book
        const existingPurchase = await Purchased.findOne({ book: bookId, user: userId });

        if (existingPurchase) {
            return res.status(400).json({
                message: "You have already purchased this book.",
                success: false
            });
        }

        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                message: "Book not found.",
                success: false
            });
        }

        // Create a new purchase
        const newPurchase = await Purchased.create({
            book: bookId,
            user: userId,
        });

        // Add the purchase to the book
        book.purchases.push(newPurchase._id);
        await book.save();

        return res.status(201).json({
            message: "Book purchased successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while purchasing the book.",
            success: false
        });
    }
};

// Get all purchased books for a user
export const getPurchasedBooks = async (req, res) => {
    try {
        const userId = req.id;

        const purchases = await Purchased.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'book',
                options: { sort: { createdAt: -1 } }
            });

        if (!purchases || purchases.length === 0) {
            return res.status(404).json({
                message: "No purchased books found.",
                success: false
            });
        }

        return res.status(200).json({
            purchases,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while fetching purchased books.",
            success: false
        });
    }
};

// Admin views all users who purchased a specific book
export const getPurchasers = async (req, res) => {
    try {
        const bookId = req.params.id;

        const book = await Book.findById(bookId).populate({
            path: 'purchases',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'user'
            }
        });

        if (!book) {
            return res.status(404).json({
                message: "Book not found.",
                success: false
            });
        }

        return res.status(200).json({
            book,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while fetching purchasers.",
            success: false
        });
    }
};

// Update purchase status
export const updatePurchaseStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const purchaseId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required.",
                success: false
            });
        }

        // Find the purchase by ID
        const purchase = await Purchased.findById(purchaseId);
        if (!purchase) {
            return res.status(404).json({
                message: "Purchase not found.",
                success: false
            });
        }

        // Update the status
        purchase.status = status.toLowerCase();
        await purchase.save();

        return res.status(200).json({
            message: "Purchase status updated successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while updating purchase status.",
            success: false
        });
    }
};
