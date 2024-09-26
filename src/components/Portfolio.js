import React from 'react';
import PortfolioItem from '../components/PortfolioItem';
import '../Styles/Portfolio.css';
import Item1 from '../assets/gemstone ring.png'
import Item2 from '../assets/ring2.png'
import Item3 from '../assets/ring2.png'
import Item4 from '../assets/ring2.png'
import Item5 from '../assets/ring2.png'


const Portfolio = () => {
    const portfolioItems = [
      {
        id: 1,
        image: Item1,  // Replace with actual image URL
        title: '3D Jewelry Design',
        link: '/portfolio-item-1',
      },

      {
        id: 2,
        image: Item2,  // Replace with actual image URL
        title: 'Logo Design',
        link: '/portfolio-item-2',
      },

      {
        id: 3,
        image: Item3,  // Replace with actual image URL
        title: 'Logo Design',
        link: '/portfolio-item-3',
      },

      {
        id: 4,
        image: Item4,  // Replace with actual image URL
        title: 'Logo Design',
        link: '/portfolio-item-4',
      },

      {
        id: 5,
        image: Item5,  // Replace with actual image URL
        title: 'Logo Design',
        link: '/portfolio-item-5',
      },

      
      // Add more items as needed
    ];
  
    return (
      <section className="portfolio">
        <h2>Portfolio</h2>
        <div className="portfolio-list">
          {portfolioItems.map(item => (
            <PortfolioItem
              key={item.id}
              image={item.image}
              title={item.title}
              link={item.link}
            />
          ))}
        </div>
      </section>
    );
  };
  
  export default Portfolio;
