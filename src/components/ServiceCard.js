import React from 'react';
import '../Styles/ServiceCard.css';
import GraphicCard from './GraphicCard/GraphicdesignCard';
//import VideoCard from './VideoCard';

function ServiceCard({ title, type, index, description, quotationItems }) {
  const renderCard = () => {
    switch (type) {
      case 'graphic':
      case 'modeling':
      case 'videoedit':
        return (
          <GraphicCard
            title={title}
            description={description}
            type={type}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`service-card service-card-${index}`}>
      <div id='box1' className="service-titleholder">
        <div className='sticky'>
          <h2 className="service-title">{title}</h2>
        <div className='title-details'>
        <p className="service-details">{description}</p>

        <div className="qutatuionItems">
                {quotationItems && quotationItems.map((item, index) => (
                    <div key={index} className='qutatuionItem'>
                      <p>{'>'}</p>
                        <p>{item}</p>
                    </div>
                ))}
            </div>
        </div>
        </div>
      </div>
      <div id='box2' className="service-descriptionholder">
        {renderCard()}
      </div>
    </div>
  );
}

export default ServiceCard;