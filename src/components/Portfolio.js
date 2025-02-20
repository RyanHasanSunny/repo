import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
import PortfolioItem from "../components/PortfolioItem";
import "../Styles/Portfolio.css";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Navbar Component
const Navbar = () => (
  <div className="navbarbordar">
  <div className="navbar">
    <ul className="navbar-list">
      <li><a href="#all-items">All</a></li>
      <li><a href="#category1">Graphic Design</a></li>
      <li><a href="#category2">3D Modeling</a></li>
      <li><a href="#category3">Web Development</a></li>
    </ul>
  </div>
  </div>

);

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPortfolioItems = async () => {
      try {
        const portfolioSnapshot = await getDocs(collection(db, "portfolio"));
        if (isMounted) {
          const fetchedPortfolio = portfolioSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPortfolioItems(fetchedPortfolio);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching portfolio items: ", error);
          setError("Failed to load portfolio items. Please try again later.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPortfolioItems();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <section className="portfolio">
      <div className="Contants">



        

        <div className="section1">
          {/* Navbar Component */}
          <Navbar />
          <div className="portfolio-list">
            {portfolioItems.map((item) => (
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
