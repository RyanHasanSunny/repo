import React, { useEffect, useState } from 'react';
import { db, storage } from './firebaseConfig'; // Import your Firestore configuration and storage
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../Styles/Introduction.css';
import sideimg from '../assets/sunny.jpg'; // Default image if none is uploaded
import bgimg from '../assets/r0004.png';

const Introduction = ({ isEditing, onEditChange }) => {
  const [welcomeText, setWelcomeText] = useState("WELCOME TO");
  const [name, setName] = useState("RYAN");
  const [subtitle, setSubtitle] = useState("Graphic Boy.");
  const [imageUrl, setImageUrl] = useState(""); // State for the side image URL

  // Document ID for your introduction data in Firestore
  const docId = "BXORMSgnVvlVBbczIC7J"; // Replace with your actual doc ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "introductionDocId", docId); // Replace "introductionDocId" with your actual collection name
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWelcomeText(data.welcomeText || "WELCOME TO");
          setName(data.name || "RYAN");
          setSubtitle(data.subtitle || "Graphic Boy.");
          setImageUrl(data.image || ""); // Set the initial image URL if available
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };
    

    fetchData();
  }, []);

  const handleSave = async () => {
    const introductionData = {
      welcomeText,
      name,
      subtitle,
      image: imageUrl, // Include the image URL in the data
    };
    try {
      const docRef = doc(db, "introductionDocId", docId); // Replace with your actual collection name
      await setDoc(docRef, introductionData, { merge: true }); // Merge to avoid overwriting other fields
      onEditChange(false); // Exit edit mode after saving
    } catch (error) {
      console.error("Error saving data to Firestore: ", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(storageRef, file); // Upload the file
      const url = await getDownloadURL(storageRef); // Get the file URL
      setImageUrl(url); // Update the image URL state

      // Update the Firestore document with the new image URL
      const docRef = doc(db, "introductionDocId", docId);
      await setDoc(docRef, { image: url }, { merge: true }); // Merge to avoid overwriting other fields
    } catch (error) {
      console.error("Error uploading image: ", error.message);
    }
  };

  return (
    <section id="home" className="introduction-section">
      <div className="home-content">
        <div className="bgimg">
          <img src={bgimg} alt="Ryan Hasan Sunny" className="home-img" />
        </div>
        <div className="home-content-header">
          <div className="img">
            {/* Display the uploaded image or default image */}
            {imageUrl ? (
              <img src={imageUrl} alt="Side" className="home-img" />
            ) : (
              <img src={sideimg} alt="Default Side" className="home-img" />
            )}
          </div>
          <div className="text-content">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={welcomeText}
                  onChange={(e) => setWelcomeText(e.target.value)}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload} // Handle image upload
                />
                <button onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <h2>{welcomeText}</h2>
                <h1>{name}</h1>
                <h3>{subtitle}</h3>
              </>
            )}
            <div className="buttons">
              <a href="#connect" className="connect-btn">Connect</a>
              <a href="#connect" className="download-btn">Download Resume</a>
              <a href="/admin" className="admin-btn">Admin Panel</a>
              {isEditing && (
                <button onClick={() => onEditChange(false)}>Cancel</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
