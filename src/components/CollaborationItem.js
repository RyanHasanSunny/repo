import React from 'react';
import '../Styles/CollaborationItem.css';
import '../Styles/Style.css';

const CollaborationItem = ({ image, title, description, services }) => {
  return (
    <div className="collaboration-grid">
      <div className="collaboration-card">
        {/* Image Holder */}
        {image && (
          <div className="collaboration-imageholder">
            <img src={image} alt={title} className="collaboration-image" />
          </div>
        )}

        {/* Text Content */}
        <div className="collaboration-text">
          <h3 className="collaboration-title">{title}</h3>
          <p className="collaboration-description">{description}</p>

          {/* Services List and Button */}
          <div className="collaboration-services_button">
            {services && (
              <ul className="services-list">
                {services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            )}
            <a href="#contact" className="collaboration-button">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationItem;