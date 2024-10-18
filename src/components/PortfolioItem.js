import React from 'react';
import '../Styles/PortfolioItem.css';

const PortfolioItem = ({ image, title, link }) => {
  return (
    <div className="portfolio-item">
      <img src={image} alt={title} className="portfolio-image" />
      <div className="portfolio-content">
        <h3>{title}</h3>
      </div>
      <a href={link} className="view-btn">View</a>
    </div>
  );
};

export default PortfolioItem;
