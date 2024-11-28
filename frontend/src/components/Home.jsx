import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

// List of categories for the home page
const categories = [
  { name: "Fiction", description: "Immerse in storytelling." },
  { name: "Non-Fiction", description: "Learn from real events." },
  { name: "Science", description: "Expand your knowledge." },
  { name: "History", description: "Explore the past." },
  { name: "Fantasy", description: "Dive into magical worlds." },
  { name: "Biographies", description: "Discover inspiring lives." },
  { name: "Mystery", description: "Solve thrilling puzzles." },
  { name: "Comics", description: "Enjoy visual storytelling." },
];

// Component for individual category cards
const CategoryCard = ({ name, description }) => (
  <Link to="/category" className="category-card">
    <div className="category-card-content">
      <h3 className="category-title">{name}</h3>
      <p className="category-description">{description}</p>
    </div>
  </Link>
);

const Home = () => {
  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <h1 className="home-title">Welcome to Scholar's Haven</h1>
        <p className="home-subtitle">
          Discover a vast collection of books across various genres and immerse yourself in a world of knowledge and imagination.
        </p>
      </header>

      {/* Categories Section */}
      <main className="categories-section">
        <div className="categories-grid">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              name={category.name}
              description={category.description}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
