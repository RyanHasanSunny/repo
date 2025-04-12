import React from 'react';
import '../Styles/ServiceCard.css';

function WebCard({ title, image }) {
  return (
    <div className="web-imageholder">
      <img src={image} alt={title} className="web-image" />
    </div>
  );
}

export default WebCard;