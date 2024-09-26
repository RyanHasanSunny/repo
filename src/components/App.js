import React from 'react';
import '../Styles/App.css'; // Make sure to create an App.css file for styles
import Introduction from './Introduction';
import Articles from './Articles';
import Portfolio from './Portfolio';
import Collaboration from './Collaboration';
import Contact from './Contact';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      {/* <nav>
        <ul className="nav-links">
          <li><a href="#introduction">Introduction</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#articles">Articles</a></li>
          <li><a href="#collaboration">Collaboration</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav> */}

      <section id="introduction" >
        <Introduction />
        </section>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="articles">
        <Articles />
      </section>
      <section id="collaboration">
        <Collaboration />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </div>
  );
}

export default App;
