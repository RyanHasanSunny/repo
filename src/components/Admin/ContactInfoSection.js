import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import '../../Styles/AdminPanel.css';


const ContactInfoSection = ({ setIsAuthenticated }) => {
  
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    address: "",
  });


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  // Fetch all data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
       
        
      } catch (error) {
        setError("Error fetching data: " + error.message);
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleSaveContactInfo = async () => {
    try {
      const docRef = doc(db, "contact", "contactDocId"); // Replace with your document ID
      await setDoc(docRef, contactInfo);
      alert("Contact information saved successfully!");
    } catch (error) {
      setError("Error saving contact information: " + error.message);
      console.error("Error saving contact information: ", error);
    }
  };



  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  return (
    
      <section className="admin-sections">
        <div className="content">
          <h2>Manage Contact Information</h2>
          <div>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              placeholder="Email"
            />
            <input
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              placeholder="Phone"
            />
            <input
              type="text"
              value={contactInfo.address}
              onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
              placeholder="Address"
            />
            <button className="button" onClick={handleSaveContactInfo}>Save Contact Information</button>
          </div>
        </div>
    </section>
  );
};

export default ContactInfoSection;