import React from 'react';
import '../Styles/Services.css';
import ServiceCard from './ServiceCard';

function Services() {
  const services = [
    { 
      title: 'Graphic Design', 
      type: 'graphic'
    },
    { 
      title: '3D Modeling', 
      type: 'modeling' 
    },
    { 
      title: 'Video Editing', 
      type: 'videoedit' 
    },
  ];

  return (
    <div className="services-container">
      <div className="services-list">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            type={service.type}
            index={index}
            description={services.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Services;