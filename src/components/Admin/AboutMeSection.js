import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, updateDoc, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import '../../Styles/AdminPanel.css';


const AboutMeSection = () => {
  // About Me state
  const [aboutMe, setAboutMe] = useState({
    name: "",
    experience: "",
    projects: "",
    clients: "",
    hours: "",
    description: "",
    skills: [],
    experiences: [],
    education: [],
  });



  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  // Fetch all data from Firestore
  useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch About Me (including experiences, education, and contact)
      const aboutSnapshot = await getDocs(collection(db, "about"));
      if (!aboutSnapshot.empty) {
        const aboutData = aboutSnapshot.docs[0].data();
        setAboutMe(aboutData);
      }

    } catch (error) {
      setError("Error fetching data: " + error.message);
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


const handleSaveAboutMe = async () => {
  try {
    const docRef = doc(db, "about", "aboutDocId");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, aboutMe);
    } else {
      await setDoc(docRef, aboutMe);
    }
    alert("About Me updated successfully!");
    // Optionally, you can fetch the updated data again to ensure the state is up-to-date
    const updatedDocSnap = await getDoc(docRef);
    setAboutMe(updatedDocSnap.data());
  } catch (error) {
    setError("Error saving About Me: " + error.message);
    console.error("Error saving About Me: ", error);
  }
};



  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    
      <section className="admin-sections">
        <h2>Edit About Me</h2>
        <div className="content">
          <input
            type="text"
            value={aboutMe.name}
            onChange={(e) => setAboutMe({ ...aboutMe, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="text"
            value={aboutMe.experience}
            onChange={(e) => setAboutMe({ ...aboutMe, experience: e.target.value })}
            placeholder="Years of Experience"
          />
          <input
            type="text"
            value={aboutMe.projects}
            onChange={(e) => setAboutMe({ ...aboutMe, projects: e.target.value })}
            placeholder="Projects Completed"
          />
          <input
            type="text"
            value={aboutMe.clients}
            onChange={(e) => setAboutMe({ ...aboutMe, clients: e.target.value })}
            placeholder="Clients"
          />
          <input
            type="text"
            value={aboutMe.hours}
            onChange={(e) => setAboutMe({ ...aboutMe, hours: e.target.value })}
            placeholder="Hours of Designing"
          />
          <textarea
            value={aboutMe.description}
            onChange={(e) => setAboutMe({ ...aboutMe, description: e.target.value })}
            placeholder="About Me Description"
            rows={5}
          />
    <button className="button" onClick={handleSaveAboutMe}>Save About Me</button>
        </div>
    </section>
  );
};

export default AboutMeSection;