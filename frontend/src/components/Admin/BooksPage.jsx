import React, { useState, useEffect } from "react";
import "./books.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"; // Ensure axios is installed
import useGetAllBooks from "../../hooks/getAllBooks";
import { setAllBooks } from "../../redux/bookSlice";

const BooksPage = () => {
  useGetAllBooks();
  const { allBooks} = useSelector(store => store.book);
  // Initial state for the form inputs
  const [input, setInput] = useState({
    bookname: "",
    bookid: "",
    author: "",
    price: "",
    category: "",
  });

  const { singleBook } = useSelector((store) => store.book) || {}; // Add fallback for undefined singleBook
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  // Handle changes to input fields
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Prepare data to send
    const data = {
      bookname: input.bookname,
      author: input.author,
      price: input.price,
      bookid: input.bookid,
      category: input.category,
    };

    try {
      const res = await axios.post(`http://localhost:8000/api/v1/book/add`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        // Reset the form inputs after successful submission
        setInput({
          bookname: "",
          bookid: "",
          author: "",
          price: "",
          category: "",
        });
        setShowForm(false)
        dispatch(setAllBooks([...allBooks, res.data.book]));
        // Redirect to the dashboard after adding the book
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:8000/api/v1/book/delete/${id}`, { withCredentials: true });
        if (res.data?.success) {
            // Filter out the deleted book from the local state
            const updatedBooks = allBooks.filter((book) => book._id !== id);
            dispatch(setAllBooks(updatedBooks)); // Update the Redux store
            console.log("Book deleted successfully");
        }
    } catch (error) {
        console.error("Error deleting book:", error);
    }
};

  

  useEffect(() => {
    setInput({
      bookname: singleBook?.bookname || "",
      author: singleBook?.author || "",
      price: singleBook?.price || "",
      bookid: singleBook?.bookid || "",
      category: singleBook?.category || "",
    });
  }, [singleBook]);

  return (
    <div className="books-page">
      <h1 className="books-title">Books Collection</h1>
      <button className="add-book-button" onClick={() => setShowForm(true)}>+</button>

      <div className="books-container">
        {allBooks?.map((book, index) => (
          <div className="book-box" key={index}>
          
            <h3 className="book-title">Book Name:{book.bookname}</h3>
            <p className="book-author">author: {book.author}</p>
            <p className="book-price">Price:{book.price}</p>
            <p className="book-price">ID:{book.bookid}</p>
            <p className="book-category">Category:{book.category}</p>
            <button 
              className="purchase-button" 
              onClick={()=>handleDelete(book._id)}
            >
              Delete
            </button>
          </div>

        ))}
      </div>

      {showForm && (
        <div className="form-modal">
          <form className="book-form" onSubmit={submitHandler}>
            <h2>Add a New Book</h2>
            <label>
              Book Name:
              <input type="text" name="bookname" value={input.bookname} onChange={changeEventHandler} required />
            </label>
            <label>
              Author:
              <input type="text" name="author" value={input.author} onChange={changeEventHandler} required />
            </label>
            <label>
              Price:
              <input type="text" name="price" value={input.price} onChange={changeEventHandler} required />
            </label>
            <label>
              Book ID:
              <input type="text" name="bookid" value={input.bookid} onChange={changeEventHandler} required />
            </label>
            <label>
              Category:
              <input type="text" name="category" value={input.category} onChange={changeEventHandler} required />
            </label>

            <div className="form-actions">
              <button type="submit">Add Book</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
