import React, { useEffect, useRef, useState } from 'react';
import PortfolioItem from '../components/PortfolioItem';
import '../Styles/Portfolio.css';
import { db } from './firebaseConfig'; // Import your Firestore configuration
import { collection, getDocs } from 'firebase/firestore';

const Portfolio = () => {
  const portfolioRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const portfolioSnapshot = await getDocs(collection(db, 'portfolio'));
        const fetchedPortfolio = portfolioSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPortfolioItems(fetchedPortfolio);
      } catch (error) {
        console.error("Error fetching portfolio items: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const portfolioItems = portfolioRef.current.querySelectorAll('.portfolio-item');
      portfolioItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          item.classList.add('scale-up');
        } else {
          item.classList.remove('scale-up');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="portfolio" ref={portfolioRef}>
      <h2>Portfolio</h2>
      <div className="portfolio-list">
        {portfolioItems.map(item => (
          <PortfolioItem
            key={item.id}
            image={item.image}
            title={item.title}
            link={item.link}
            className="portfolio-item"
          />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
