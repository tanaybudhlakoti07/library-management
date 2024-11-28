import React from "react";
import "./categoryPage.css";   

const CategoryPage = () => {
  const categoryName = "Fiction"; 

  const books = [
    { 
      title: "Book 1", 
      author: "Author 1", 
      price: "$15.99"
    },
    { 
      title: "Book 2", 
      author: "Author 2", 
      price: "$12.49"
    },
    { 
      title: "Book 3", 
      author: "Author 3", 
      price: "$20.00"
    },
    { 
      title: "Book 3", 
      author: "Author 3", 
      price: "$20.00"
    },
    { 
      title: "Book 3", 
      author: "Author 3", 
      price: "$20.00"
    },
    { 
      title: "Book 3", 
      author: "Author 3", 
      price: "$20.00"
    },
    { 
      title: "Book 3", 
      author: "Author 3", 
      price: "$20.00"
    },
    // Add more books here if needed
  ];

  return (
    <div className="category-page">
      <h1 className="category-name">{categoryName}</h1>
      <div className="books-container">
        {books.map((book, index) => (
          <div className="book-box" key={index}>
            <img src="https://imgs.search.brave.com/H3mLk58AVBKlAzkz_7-zPxLZxLDZzSDLoQlqQ2pCqdM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5Lzc2LzE0Lzc0/LzM2MF9GXzk3NjE0/NzQzNl9Xd0J3OW9E/MHZzWjN1UndtSWcx/aWVJbFVqaVhZSEI4/dS5qcGc" alt={book.title} className="book-image" />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <p className="book-price">{book.price}</p>
            <button className="purchase-btn">Purchase</button>
            <p className="available">Available</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
