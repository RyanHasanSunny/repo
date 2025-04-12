import React from 'react';
import '../Styles/ServiceCard.css';
import GraphicCard from './GraphicCard/GraphicdesignCard';
//import VideoCard from './VideoCard';

// Card data organized by type
const cardData = {
  graphic: {
    description: 'Creative and professional design work for brands including logos, branding materials, and marketing collateral.',
    // image: graphicDesignImage,
  },
  modeling: {
    description: 'Professional 3D modeling services including character design, product visualization, and architectural rendering.',
    // image: modelingImage,
  },
  videoedit: {
    description: 'High-quality video editing and production services for commercials, social media, and corporate videos.',
    // image: videoEditingImage,
  }
};

function ServiceCard({ title, type, index }) {
  const renderCard = () => {
    switch(type) {
      case 'graphic':
      case 'modeling':
        case 'videoedit':
        return (
          <GraphicCard
            title={title}
            description={cardData[type].description}
            type={type}
          />
        );
      // case 'video':
      //   return (
      //     <VideoCard
      //       title={title}
      //       description={cardData[type].description}
      //     />
      //   );
      default:
        return null;
    }
  };

  return (
    <div className={`service-card service-card-${index}`}>
      <div id='box1' className="service-titleholder">
        <div className='sticky'>
          <h2 className="service-title">{title}</h2>
        </div>
      </div>
      <div id='box2' className="service-descriptionholder">
        {renderCard()}
      </div>
    </div>
  );
}

export default ServiceCard;