import React, { useEffect, useRef } from 'react';
import PortfolioItem from '../components/PortfolioItem';
import '../Styles/Portfolio.css';
import Item1 from '../assets/gemstone ring.png';
import Item2 from '../assets/ring2.png';
import Item3 from '../assets/ring2.png';
import Item4 from '../assets/ring2.png';
import Item5 from '../assets/ring2.png';

const Portfolio = () => {
  const portfolioItems = [
    {
      id: 1,
      image: Item1,
      title: '3D Jewelry Design',
      link: '/portfolio-item-1',
    },
    {
      id: 2,
      image: Item2,
      title: 'Logo Design',
      link: '/portfolio-item-2',
    },
    {
      id: 3,
      image: Item3,
      title: 'Logo Design',
      link: '/portfolio-item-3',
    },
    {
      id: 4,
      image: Item4,
      title: 'Logo Design',
      link: '/portfolio-item-4',
    },
    {
      id: 5,
      image: Item5,
      title: 'Logo Design',
      link: '/portfolio-item-5',
    },
  ];

  const portfolioRef = useRef(null);

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
