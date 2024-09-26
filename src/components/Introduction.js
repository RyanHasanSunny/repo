import React from 'react';
import '../Styles/Introduction.css';
import sideimg from '../assets/sunny.jpg';
import bgimg from '../assets/r0004.png';

const Introduction = () => {
  return (
    <section id="home" className="introduction-section">
      <div className="home-content">
      <div className="bgimg">
          <img src={bgimg} alt="Ryan Hasan Sunny" className="home-img" />
        </div>
        <div className="home-content-header">
          <div className="img">
            <img src={sideimg} alt="Ryan Hasan Sunny" className="home-img" />
          </div>
          <div className="text-content">
            <h2>WELCOME TO</h2>
            <h1>RYAN</h1>
            <h3>Graphic Boy.</h3>
            <div className="buttons">
              <a href="#connect" className="connect-btn">Connect</a>
              <a href="#connect" className="download-btn">Download Resume</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
