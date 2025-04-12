import React, { useState, useEffect } from 'react';
import { easeInOut, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../../Styles/ServiceCard.css';
import Card from './LogoDesignCard';

const AnimatedCard = ({ service, delay, scrollDirection }) => {
  const [ref, inView] = useInView({
    threshold: 0.7,
    triggerOnce: false
  });

  const xDirection = scrollDirection === 'right' ? 50 : -50;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xDirection, scale: 0.95 }}
      animate={inView ? { 
        opacity: 1, 
        x: 0, 
        scale: 1,
        transition: { 
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay
        }
      } : { 
        opacity: 0, 
        x: xDirection, 
        scale: 0.95 
      }}
      exit={{ 
        opacity: 0, 
        x: xDirection * -1, 
        scale: 0.95,
        transition: { duration: 0.3 } 
      }}
      transition={{ ease: easeInOut }}
    >
      <Card
        title={service.title}
        type={service.type}
        description={service.description}
        serviceItems={service.serviceItems} // Pass through
      />
    </motion.div>
  );
};

function GraphicCard({ type }) {
  // Service data organized by type
  const serviceData = {
    graphic: [
      { 
        title: 'Brand Identity Design', 
        description: 'A strong brand identity is the foundation of your business\'s visual presence. Our services include custom logo design that captures your unique story, values, and market position. We also create comprehensive brand style guides to ensure consistency across all platforms, detailing color palettes, typography, and logo usage rules. Additionally, we design professional business cards, letterheads, and stationery that reflect your brand\'s personality, leaving a lasting impression on clients and partners. Whether you\'re launching a startup or rebranding an established business, we craft cohesive visuals that build recognition and trust.',
        type: 'Brand_Identity_Design',
        serviceItems: [
          "Custom logo design",
          "Comprehensive brand style guide",
          "Business card & stationery design",
          "Multiple concepts to choose from"
        ]
      },
      { 
        title: 'Print & Marketing Materials', 
        description: 'Make a powerful impact with professionally designed print materials. Our poster designs combine striking visuals and clear messaging to promote events, products, or campaigns effectively. We also create flyers and brochures tailored to your audience, whether for handouts, mailers, or digital downloads. For larger-scale visibility, we design billboards and banners that grab attention from afar. Every piece is optimized for print quality and readability, ensuring your marketing materials stand out and communicate your message clearly.',
        type: 'Print_and_Marketing_Materials',
        serviceItems: [
          "Professional poster designs",
          "Marketing flyers & brochures",
          "Billboard and banner designs",
          "Print-ready file formats"
        ]
      },
      { 
        title: 'Digital Graphics', 
        description: 'In today\'s digital world, eye-catching visuals are essential. We design social media graphics, including posts, covers, and ads, tailored to platforms like Instagram, Facebook, and LinkedIn to boost engagement. Our email templates are crafted to align with your brand, making newsletters and promotional campaigns visually appealing and professional. We also create web graphics, such as banners, icons, and infographics, to enhance your website\'s user experience and convey information dynamically. These designs are optimized for fast loading and responsiveness across all devices.',
        type: 'Digital_Graphics',
        serviceItems: [
          "Social media graphics",
          "Digital ad designs",
          "Email newsletter templates",
          "Website banners and hero images",
        ]
      },
      { 
        title: 'Packaging & Merchandise', 
        description: 'Transform your products with eye-catching packaging designs that stand out on shelves and create memorable unboxing experiences. We specialize in creating packaging solutions for various products, including boxes, labels, and bags. Additionally, we design branded merchandise like t-shirts, mugs, and tote bags that help promote your business while providing value to customers. Our designs consider both aesthetics and functionality, ensuring your packaging and merchandise effectively represent your brand.',
        type: 'Packaging_and_Merchandises',
        serviceItems: [
          "Product packaging design",
          "Retail-ready packaging solutions",
          "Merchandise design",
          "Label and sticker designs",
        ]
      }
    ],

    modeling: [
      { 
        title: 'Character Modeling', 
        description: 'Bring your characters to life with professional 3D modeling services. We create stylized or realistic models—from low-poly game assets to intricate NFT avatars—complete with rigging, texturing, and animation-ready topology. Our character designs begin with concept refinement, followed by detailed modeling, UV unwrapping, and texturing (procedural or hand-painted). Whether for games, animations, or digital collectibles, we deliver characters with personality and technical precision, exported in your preferred format (FBX, OBJ, etc.).',
        type: 'Character_Modeling'
      },
      { 
        title: 'Product Visualization', 
        description: 'Showcase your products with photorealistic 3D visualization. Our modeling focuses on precision for e-commerce, prototyping, or 3D printing applications, with careful attention to materials, lighting, and manufacturable details. We create detailed product renders that highlight features and functionality, perfect for marketing materials, crowdfunding campaigns, or internal reviews. Our visualizations help customers understand your product better while reducing the need for physical prototypes.',
        type: 'Product_Visualization'
      },
      { 
        title: 'Architectural Rendering', 
        description: 'Visualize your architectural projects with stunning 3D renderings. We create detailed interiors, exteriors, and landscapes that bring designs to life before construction begins. Our services include immersive VR walkthroughs that let clients experience spaces virtually. From residential projects to commercial developments, we produce high-quality visualizations that communicate design intent clearly to stakeholders, investors, and planning committees, helping to streamline the approval and marketing processes.',
        type: 'Architectural_Rendering'
      },
      { 
        title: 'Hard-Surface Modeling', 
        description: 'Create precise industrial and mechanical designs with our hard-surface modeling expertise. We specialize in vehicles, weapons, machinery, and other complex mechanical objects with clean topology and accurate details. Our models are built for functionality—whether for engineering visualization, game assets, or product design. We focus on proper edge flow, appropriate polycount, and manufacturable specifications, ensuring models meet both aesthetic and technical requirements.',
        type: 'Hard_Surface_Modeling'
      }
    ],


    videoedit: [
      { 
        title: 'Video Editing', 
        description: 'Elevate your content with professional video editing services. We transform raw footage into polished videos with seamless transitions, color grading, and audio mixing. Our editing enhances storytelling through careful pacing, engaging effects, and proper sequencing. Whether you need social media clips, corporate videos, or commercial spots, we deliver videos that captivate audiences and communicate your message effectively, optimized for various platforms and aspect ratios.',
        type: 'Video_Editing'
      },
      { 
        title: 'Motion Graphics', 
        description: 'Bring your visuals to life with dynamic motion graphics. We create animated logos, explainer videos, and kinetic typography that make your content more engaging and memorable. Our animations combine creative design with smooth movement to explain complex ideas simply or add flair to promotional content. Perfect for social media, presentations, or broadcast, our motion graphics help your brand stand out in today\'s visually competitive landscape',
        type: 'Motion_Graphics'
      },
     
    ],




  };

  const [scrollDirection, setScrollDirection] = useState('right');
  const [lastScrollX, setLastScrollX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollX = window.scrollX || window.pageXOffset;
      setScrollDirection(currentScrollX > lastScrollX ? 'right' : 'left');
      setLastScrollX(currentScrollX);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollX]);


  const services = serviceData[type] || {};

  return (
    <div className="graphic-card-container">
      {Object.values(services).map((service, index) => (
        <AnimatedCard 
          key={service.type}
          service={{
            title: service.title,
            description: service.description,
            type: service.type,
            serviceItems: service.serviceItems // Pass serviceItems here
          }}
          delay={index * 0.15}
          scrollDirection={scrollDirection}
        />
      ))}
    </div>
  );
}

export default GraphicCard;