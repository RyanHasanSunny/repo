import React, { useEffect, useState } from 'react';

import { db, storage } from '../firebaseConfig';
import { collection,  updateDoc,  getDocs, doc } from 'firebase/firestore';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import '../../Styles/AdminPanel.css';

const IntroductionSection = () => {

  // Introduction state
  const [welcomeText, setWelcomeText] = useState("WELCOME TO");
  const [name, setName] = useState("RYAN");
  const [subtitle, setSubtitle] = useState("Graphic Boy.");
  const [imageUrl, setImageUrl] = useState("");




  

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  // Fetch all data from Firestore
  useEffect(() => {
  const fetchData = async () => {
    try {
    
      // Fetch Introduction
      const introSnapshot = await getDocs(collection(db, "introduction"));
      if (!introSnapshot.empty) {
        const introData = introSnapshot.docs[0].data();
        setWelcomeText(introData.welcomeText);
        setName(introData.name);
        setSubtitle(introData.subtitle);
        setImageUrl(introData.image);
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


  
 









  // Save introduction data
  const handleSaveIntroduction = async () => {
    try {
      const introData = { welcomeText, name, subtitle, image: imageUrl };
      const docRef = doc(db, "introductionDocId", "BXORMSgnVvlVBbczIC7J"); // Replace with your document ID
      await updateDoc(docRef, introData);
      alert("Introduction saved successfully!");
    } catch (error) {
      setError("Error updating introduction: " + error.message);
      console.error("Error updating introduction: ", error);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploadLoading(true);
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
    } catch (error) {
      setError("Error uploading image: " + error.message);
      console.error("Error uploading image: ", error);
    } finally {
      setImageUploadLoading(false);
    }
  };

  


  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (

      <section className="admin-sections">
        <h2>Edit Introduction</h2>
        <div className="content">
          <input type="text" value={welcomeText} onChange={(e) => setWelcomeText(e.target.value)} placeholder="Welcome Text" />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Subtitle" />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imageUploadLoading ? <p>Uploading...</p> : <button className="button" onClick={handleSaveIntroduction}>Save Introduction</button>}
        </div>
    </section>
  );
};

export default IntroductionSection;