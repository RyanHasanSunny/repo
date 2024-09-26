import React from 'react';
import '../Styles/CollaborationItem.css';

const CollaborationItem = ({ image, title, description }) => {
  return (
      <div className="collaboration-grid">
          <div className="collaboration-card">
            <img src={image} alt={title} className="collaboration-image" />
            <h3 className="collaboration-title">{title}</h3>
            <p className="collaboration-description">{description}</p>
            <a href="#contact" className="collaboration-button">Get in Touch</a>
          </div>
        
      </div>
  );
};

export default CollaborationItem;
