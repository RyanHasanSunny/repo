import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '../Styles/App.css';
import Introduction from './Introduction';
import Articles from './Articles';
import Portfolio from './Portfolio';
import Collaboration from './Collaboration';
import Contact from './Contact';
import Footer from './Footer';
import AdminPanel from './AdminPanel';
import Logout from './Logout';
import AdminLogin from './AdminLogin';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
        <Routes>
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />

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
          
          <Route
          path="/admin"
          element={isAuthenticated ? <AdminPanel setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />}
        />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
