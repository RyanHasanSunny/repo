import React, { useEffect, useRef, useState } from 'react';
import PortfolioItem from '../components/PortfolioItem';
import '../Styles/Portfolio.css';
import { db } from './firebaseConfig'; // Import your Firestore configuration
import { collection, getDocs } from 'firebase/firestore';
import _ from 'lodash'; // Lodash for debouncing

const Portfolio = () => {
  const portfolioRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    // Fetch Portfolio Items
    let isMounted = true; // Flag to check if component is still mounted
    const fetchPortfolioItems = async () => {
      try {
        const portfolioSnapshot = await getDocs(collection(db, 'portfolio'));
        if (isMounted) {
          const fetchedPortfolio = portfolioSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPortfolioItems(fetchedPortfolio);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching portfolio items: ", error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPortfolioItems();

    return () => {
      isMounted = false; // Cleanup function to avoid memory leaks
    };
  }, []);

  useEffect(() => {
    // Debounced Scroll Handling
    const handleScroll = _.debounce(() => {
      const portfolioItems = portfolioRef.current.querySelectorAll('.portfolio-item');
      const titlefms = portfolioRef.current.querySelectorAll('.titlefm');

      portfolioItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          item.classList.add('scale-up');
        } else {
          item.classList.remove('scale-up');
        }
      });

      titlefms.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          item.classList.add('scale-up');
        } else {
          item.classList.remove('scale-up');
        }
      });
    }, 100); // Adjust debounce delay as needed

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="portfolio" ref={portfolioRef}>
      <div className='titlefm'>
        <div className='title'>
          <h2>Dive into my projects,</h2>
          <h2> where creativity meets</h2>
          <div className='texthere'>precision</div>
        </div>
      </div>
      <div className='headertitle'>
        Portfolio
      </div>
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
