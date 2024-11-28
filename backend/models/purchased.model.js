import mongoose from "mongoose";

const purchasedSchema = new mongoose.Schema({
    bookname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        required: true
    },
    purchased: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issueDate: {
        type: Date, 
        required: true 
    },
    returnDate: {
        type: Date, 
        required: false 
    }
}, { timestamps: true });

export const Purchased = mongoose.model("purchased", purchasedSchema);
