import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    bookname: {
        type: String,
        required: true
    },
    bookid:{
        type:Number,
        required:true
    },
    category:{
        type:"string",
        required:true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    purchased: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Purchased',
        }
    ]
},{timestamps:true});
export const Book = mongoose.model("book", bookSchema);