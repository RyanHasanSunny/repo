import React from 'react';
import '../Styles/PortfolioItem.css';

const PortfolioItem = ({ image, title, link }) => {
  return (
    <div className="portfolio-item">
      <div className="Imageplaceholder">
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img src={image} alt={title} className="portfolio-image" />
          </a>
        ) : (
          <img src={image} alt={title} className="portfolio-image" />
        )}
      </div>
    </div>
  );
};

export default PortfolioItem;
