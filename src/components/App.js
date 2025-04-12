import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '../Styles/App.css';
import Introduction from './Introduction';
// import Articles from './Articles';
import Portfolio from './Portfolio';
import Collaboration from './Collaboration';
import Contact from './Contact';
import Footer from './Footer';
import AdminPanel from './Admin/AdminPanel';
import Logout from './Logout';
import AdminLogin from './AdminLogin';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import Review from'./Review';
import AboutMe from './aboutme/Aboutme';

import CustomCursor from "../components/Customcursor"; // Import the CustomCursor component
import Services from './OurServices';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Edit Button */}
        {/* <div id="Adminbtnplace" className="Adminbtnplace">
          
          <NavLink to="/admin" className="admin-btn interactive">
          <div id="options">
            <div id='line'></div>
            <div id='line'></div>
            <div id='line'></div>
          </div>
          </NavLink>
        </div> */}

        <Routes>

          <Route path="/about" element={<AboutMe />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/admin" element={isAuthenticated ? <AdminPanel setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />}
          />

          <Route path="/" element={
            <>
              < CustomCursor />
              <section id="introduction">
                <Introduction />
              </section>
              <section id="ourservices">
                <Services />
              </section>

              <section id="portfolio">
                <Portfolio />
              </section>
             
              {/* <section id="articles">
                <Articles />
              </section> */}
              {/* <section id="review">
                <Review />
              </section> */}
              <section id="collaboration">
                <Collaboration />
              </section>
              <section id="contact">
                <Contact />
              </section>
              <Footer />
            </>
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
