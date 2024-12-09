import React from 'react';
import '../Styles/PortfolioItem.css';

const PortfolioItem = ({ image, title, link }) => {
  return (
    <div href={link} className="portfolio-item">
      <div className="Imageplaceholder">
      <img src={image} alt={title} className="portfolio-image" />
      </div>
      {/* <div className="portfolio-content">
        <h3>{title}</h3>
      </div> */}
    </div>
  );
};

export default PortfolioItem;
