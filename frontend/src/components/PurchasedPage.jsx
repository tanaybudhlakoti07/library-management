import React, { useState } from "react";
import "./purchased.css";

const PurchasedPage = () => {
  // Mock data for purchased books
  const [purchasedBooks, setPurchasedBooks] = useState([
    {
      title: "Book 1",
      author: "Author 1",
      price: "$15.99",
    },
    {
      title: "Book 2",
      author: "Author 2",
      price: "$12.49",
    },
    {
      title: "Book 3",
      author: "Author 3",
      price: "$20.00",
    }
  ]);

  return (
    <div className="purchased-page">
      <h1 className="purchased-title">Purchased Books</h1>
      <div className="purchased-books-container">
        {purchasedBooks.length === 0 ? (
          <p>No books purchased yet!</p>
        ) : (
          purchasedBooks.map((book, index) => (
            <div className="purchased-book-box" key={index}>
              <img src="https://t3.ftcdn.net/jpg/09/76/14/74/360_F_976147436_WwBw9oD0vsZ3uRwmIg1ieIlUjiXYHB8u.jpg" alt={book.title} className="purchased-book-image" />
              <h3 className="purchased-book-title">{book.title}</h3>
              <p className="purchased-book-author">{book.author}</p>
              <p className="purchased-book-price">{book.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PurchasedPage;
