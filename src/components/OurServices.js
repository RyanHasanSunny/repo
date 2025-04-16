import React from 'react';
import '../Styles/Services.css';
import ServiceCard from './ServiceCard';

function Services() {
  const services = [
    { 
      title: 'Graphic Design', 
      description: 'Creative and professional design work for brands including logos, branding materials, and marketing collateral.',
      type: 'graphic',
      quotationItems: [
        "Guarantee: 100% satisfaction or money-back.",
        "Revisions: 2-3 rounds included. Extra revisions are chargeable.",
        "File Formats: JPEG, PNG, PDF, PSD, AI, SVG, EPS.",
      ]
    },
    { 
      title: '3D Modeling', 
      description: 'Professional 3D modeling services including character design, product visualization, and architectural rendering.',
      type: 'modeling' ,
      quotationItems: [
        "Guarantee: Final review phase for accuracy.",
        "Revisions: 2-3 rounds included. Major changes may incur extra charges.",
        "File Formats: OBJ, FBX, STL, 3DS, DAE, Blend, GLTF/GLB, PLY."
      ]
    },
    { 
      title: 'Video Editing', 
      description: 'High-quality video editing and production services for commercials, social media, and corporate videos.',
      type: 'videoedit',
      quotationItems: [
        "Guarantee: Final approval after rough cut.",
        "Revisions: 2-3 rounds. Additional revisions may cost extra.",
        "File Formats: MP4, MOV, AVI, MKV, GIF, ProRes, DNxHD, PNG."
      ]
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
            description={service.description}
            quotationItems={service.quotationItems}
          />
        ))}
      </div>
    </div>
  );
}

export default Services;