import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import '../../Styles/AdminPanel.css';
import IntroductionSection from './IntroductionSection';
import AboutMeSection from './AboutMeSection';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';
import EduSection from './EduSection';
import PortfolioSection from './PortfolioSection';
import ContactInfoSection from './ContactInfoSection';

const AdminPanel = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const sectionRefs = {
    intro: React.createRef(),
    about: React.createRef(),
    skills: React.createRef(),
    experience: React.createRef(),
    edu: React.createRef(),
    contact: React.createRef(),
    portfolio: React.createRef(),
  };

  // Use onAuthStateChanged to track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login if user is not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [navigate, setIsAuthenticated]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add your data fetching logic here
      } catch (error) {
        setError("Error fetching data: " + error.message);
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Scroll to specific section
  const scrollToSection = (section) => {
    sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      navigate("/"); // Redirect to home
      alert("Successfully logged out!");
    } catch (error) {
      setError("Logout error: " + error.message);
      console.error("Logout error: ", error);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <section className="admin-panel">
        <div className="admin-header">
        <h1>Admin Panel</h1>
          <ul>
            <li><button className="nav-link" onClick={() => scrollToSection('intro')}>Introduction</button></li>
            <li><button className="nav-link" onClick={() => scrollToSection('about')}>About Me</button></li>
            <li><button className="nav-link" onClick={() => scrollToSection('skills')}>Skills</button></li>
            <li><button className="nav-link" onClick={() => scrollToSection('experience')}>Experience</button></li>
            <li><button className="nav-link" onClick={() => scrollToSection('edu')}>Education</button></li>
            <li><button className="nav-link" onClick={() => scrollToSection('contact')}>Contact Info</button></li>
            <li><button className="nav-link" onClick={() => scrollToSection('portfolio')}>Portfolio</button></li>
          </ul>
          {/* Logout and Back to Home Buttons */}
        <div className='admin-buttons'>
          <button className="button" onClick={handleLogout}>Logout</button>
          <button className="button" onClick={() => navigate("/")}>Back to Home</button>
        </div>
        </div>


<div id='sections'>
      {/* Sections */}
      <div ref={sectionRefs.intro}>
        <IntroductionSection />
      </div>
      <div ref={sectionRefs.about}>
        <AboutMeSection />
      </div>
      <div ref={sectionRefs.skills}>
        <SkillsSection />
      </div>
      <div ref={sectionRefs.experience}>
        <ExperienceSection />
      </div>
      <div ref={sectionRefs.edu}>
        <EduSection />
      </div>
      <div ref={sectionRefs.contact}>
        <ContactInfoSection />
      </div>
      <div ref={sectionRefs.portfolio}>
        <PortfolioSection />
      </div>
      </div>
    </section>
  );
};

export default AdminPanel;
