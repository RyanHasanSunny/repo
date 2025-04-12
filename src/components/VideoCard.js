import React from 'react';
import '../Styles/ServiceCard.css';

function VideoCard({ title, image, description }) {
  return (
    <div className="video-card">
      <div className="video-image-container">
        <img src={image} alt={title} className="video-image" />
        <div className="play-icon">
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="video-description">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default VideoCard;