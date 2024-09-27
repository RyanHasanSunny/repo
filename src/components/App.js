import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import '../Styles/App.css'; // Ensure your CSS file exists
import Introduction from './Introduction';
import Articles from './Articles';
import Portfolio from './Portfolio';
import Collaboration from './Collaboration';
import Contact from './Contact';
import Footer from './Footer';
import AdminPanel from './AdminPanel'; // Import your admin panel component

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Links (optional, uncomment if you want a nav bar) */}
        {/* 
        <nav>
          <ul className="nav-links">
            <li><a href="#introduction">Introduction</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#articles">Articles</a></li>
            <li><a href="#collaboration">Collaboration</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        */}

        <Routes>
          {/* Route for the main content */}
          <Route path="/" element={
            <>
              <section id="introduction">
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
            </>
          } />
          
          {/* Route for the admin panel */}
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
