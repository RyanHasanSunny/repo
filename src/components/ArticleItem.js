import React from 'react';
import '../Styles/ArticleItem.css';

const ArticleItem = ({ image, title, description, link }) => {
    return (
      <div className="article-item">
        <img src={image} alt={title} className="article-image" />
        <div className="article-content">
          <h3>{title}</h3>
          <p>{description}</p>
          <a href={link} className="learn-more">Learn More</a>
        </div>
      </div>
    );
  };
  

  export default ArticleItem;
  
