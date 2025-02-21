import React, { useEffect, useState } from "react";
import PortfolioItem from "../components/PortfolioItem";
import "../Styles/Portfolio.css";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Navbar Component
const Navbar = ({ categories, onSelectCategory, selectedCategory }) => (
  <div className="navbarbordar">
    <div className="navbar">
      <ul className="navbar-list">
        <li>
          <a href="#all-items" onClick={() => onSelectCategory("All")}>
            All
          </a>
        </li>
        {categories.map((category) => (
         <li key={category.id}>
  <a
    href={`#${category.name}`}
    onClick={() => onSelectCategory(category.name)}
    className={selectedCategory === category.name ? "active" : ""}
  >
    {category.name}
  </a>
</li>
        ))}
      </ul>
    </div>
  </div>
);

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All"
  const [error, setError] = useState(null);

  // Fetch portfolio items and categories from Firestore
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Fetch portfolio items
        const portfolioSnapshot = await getDocs(collection(db, "portfolio"));
        const fetchedPortfolio = portfolioSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch categories
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        const fetchedCategories = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (isMounted) {
          setPortfolioItems(fetchedPortfolio);
          setCategories(fetchedCategories);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching data: ", error);
          setError("Failed to load data. Please try again later.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter portfolio items based on the selected category
  const filteredPortfolioItems =
    selectedCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <section className="portfolio">
      <div className="Contants">
        <div className="section1">
          {/* Navbar Component */}
          <Navbar
            categories={categories}
            onSelectCategory={setSelectedCategory}
          />
          <div className="portfolio-list">
            {filteredPortfolioItems.map((item) => (
              <PortfolioItem
                key={item.id}
                image={item.image}
                title={item.title}
                alt={`Portfolio item: ${item.title}`}
                link={item.link}
                className="portfolio-item"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;