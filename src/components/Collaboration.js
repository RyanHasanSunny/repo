import React from 'react';
import '../Styles/Collaboration.css';
import CollaborationItem from '../components/CollaborationItem';
import Item1 from '../assets/ring2.png'
import Item2 from '../assets/ring2.png'
import Item3 from '../assets/ring2.png'
import Item4 from '../assets/ring2.png'



const Portfolio = () => {
    const collaborationItems = [
        {
          id: 1,
          image: Item1, // Replace with your image link
          title: 'Graphic Design',
          description: 'Partner with me for stunning graphic designs tailored to your needs.',
        },
        {
          id: 2,
          image: Item2, // Replace with your image link
          title: '3D Modeling',
          description: 'Collaborate on 3D modeling projects for a variety of applications.',
        },
        {
          id: 3,
          image: Item3, // Replace with your image link
          title: 'Animation',
          description: 'Create engaging animations that captivate your audience.',
        },
        {
          id: 4,
          image: Item4, // Replace with your image link
          title: 'Web Development',
          description: 'Get in touch for web development collaborations to enhance your online presence.',
        },
      ];

      
  
    return (
        <section className="collaboration">
      <h2>Collaboration</h2>
      <p>Let's work together to create amazing projects!</p>
      <div className="collaboration-grid">
      {collaborationItems.map(item => (
            <CollaborationItem
              key={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}
      </div>
    </section>
    );
  };
  
  export default Portfolio;
