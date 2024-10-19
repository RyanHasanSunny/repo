
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import motion
import PortfolioItem from "../components/PortfolioItem";
import "../Styles/Portfolio.css";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";


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

      <div className="titlefm">
        <motion.div
          className="title"
          initial={{ opacity: 0, y: -20 }} // Initial state
          whileInView={{ opacity: 1, y: 0 }} // Animation when in view
          transition={{ duration: 0.5 }} // Animation duration
          viewport={{ once: true, amount: 0.2 }} // Triggers once when 20% is in view
        >
          <h2>Dive into my projects,</h2>
          <h2> where creativity meets</h2>
          <h2>precision</h2>
        </motion.div>
      </div>

      {/* Section for Website Design */}
      <div className="section1">
        <div
          className="headertitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3>Website Design</h3>
        </div>
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

      {/* Section for Graphic Design */}
      <div className="section2">
        <div className="headertitle">
          <h3>Graphic Design</h3>
        </div>
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

      {/* Section for 3D Modeling */}
      <div className="section3">
        <div className="headertitle">
          <h3>3D Modeling</h3>
        </div>
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
    </section>
  );
};

export default Portfolio;
