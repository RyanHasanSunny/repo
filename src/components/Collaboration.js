import React from 'react';
import '../Styles/Collaboration.css';
import '../Styles/Style.css';
import CollaborationItem from '../components/CollaborationItem';
import Item1 from '../assets/ring2.png';
import Item2 from '../assets/ring2.png';
import Item3 from '../assets/ring2.png';
import Item4 from '../assets/ring2.png';

const Portfolio = () => {
  const collaborationItems = [
    {
      id: 1,
      image: Item1,
      title: 'Graphic Design',
      description: 'Graphic design is the art of transforming ideas into visually compelling stories. As a passionate graphic designer, I specialize in creating designs that not only captivate but also communicate your brand’s unique identity. Whether you’re building a brand from scratch or refreshing an existing one, I’m here to collaborate with you every step of the way to bring your vision to life. My expertise lies in crafting designs that are both aesthetically pleasing and strategically effective. From eye-catching logos to engaging social media content, I ensure every design aligns with your goals and resonates with your audience. Let’s collaborate to turn your ideas into impactful visuals. Whether you’re a startup, small business, or established brand, I’m here to help you stand out in a crowded marketplace. Together, we’ll create designs that not only look great but also drive results.',
      services: ['Logo Design', 'Branding', 'Print Design', 'Illustration'],
    },
    {
      id: 2,
      image: Item2,
      title: '3D Modeling',
      description: 'Bring your ideas to life with stunning 3D models! I specialize in creating high-quality, realistic 3D designs for a variety of applications. Whether you need product visualizations, character designs, or hard surface modeling, I can help you create captivating 3D assets that showcase your vision. With my expertise in 3D modeling, I can transform your concepts into detailed, lifelike renderings that captivate your audience. From product prototypes to animated characters, I’ll work with you to create 3D models that meet your specific needs and exceed your expectations. Let’s collaborate to bring your ideas to life in stunning 3D!',
      services: ['Product Visualization', 'Character Design', 'Hard Surface Modeling'],
    },
    {
      id: 3,
      image: Item3,
      title: 'Animation',
      description: 'Create engaging animations that captivate your audience. As an experienced animator, I specialize in bringing stories to life through motion graphics, 3D animation, and visual effects. Whether you need an explainer video, a product demo, or a promotional animation, I can help you create compelling visuals that resonate with your audience. With my expertise in animation, I can transform your ideas into dynamic, eye-catching videos that convey your message effectively. From concept development to final delivery, I’ll work with you every step of the way to ensure your animation meets your goals and exceeds your expectations. Let’s collaborate to create animations that inspire, inform, and entertain!',
      services: ['Motion Graphics', '3D Animation', 'Visual Effects'],
    },
    {
      id: 4,
      image: Item4,
      title: 'Web Development',
      description: 'Get in touch for web development collaborations to enhance your online presence and reach your target audience. I specialize in creating custom websites that are tailored to your unique needs and goals. Whether you need a simple landing page, a complex e-commerce site, or a dynamic web application, I can help you bring your vision to life. With my expertise in web development, I can create responsive, user-friendly websites that engage your audience and drive conversions. From front-end design to back-end development, I’ll work with you to build a website that reflects your brand and delivers a seamless user experience. Let’s collaborate to create a website that sets you apart from the competition and helps you achieve your online goals.',
      services: ['React.js', 'Next.js', 'UI/UX Design', 'API Integration'],
    },
  ];

  return (
    <section className="collaboration">
      <h2>Let's work together to <br /> create amazing projects!</h2>
      <div className="collaboration-grid">
        {collaborationItems.map(item => (
          <CollaborationItem
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            services={item.services}
          />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
