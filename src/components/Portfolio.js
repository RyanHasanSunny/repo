import React, { useEffect, useState } from 'react';
import PortfolioItem from '../components/PortfolioItem';
import '../Styles/Portfolio.css';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
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
      <div className='titlefm'>
        <div className='title'>
          <h2>Dive into my projects,</h2>
          <h2> where creativity meets</h2>
          <h2>precision</h2>
        </div>
      </div>
      <div className="section1">
        <div className='headertitle'>
          <h3>Website Design</h3> 
        </div>
        <div className="portfolio-list">
          {portfolioItems.map(item => (
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
      <div className="section2">
        <div className='headertitle'>
          <h3>Graphic Design</h3> 
        </div>
        <div className="portfolio-list">
          {portfolioItems.map(item => (
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

      <div className="section3">
        <div className='headertitle'>
          <h3>3D Modeling</h3> 
        </div>
        <div className="portfolio-list">
          {portfolioItems.map(item => (
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
