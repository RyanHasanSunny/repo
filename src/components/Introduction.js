import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig"; // Import your Firestore configuration
import { doc, getDoc } from "firebase/firestore";
import "../Styles/Introduction.css";
//import bgimg from '../assets/r0004.png';
import { NavLink } from "react-router-dom";

const Introduction = () => {
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

  return (
    <section id="home" className="introduction-section">
      
      <div className="Adminbtnplace">
        <NavLink to="/admin" className="admin-btn">
          Edit
        </NavLink>

      </div>
      <div className="home-content">
        {/* <div className="bgimg">
          <img src={bgimg} alt="Ryan Hasan Sunny" className="home-img" />
        </div> */}
        <div className="home-content-header">
          <div className="img">
            {/* Display the uploaded image or fallback */}
            {imageUrl ? (
              <img src={imageUrl} alt="Side" className="home-img" />
            ) : (
              <img src={imageUrl} alt="Default Side" className="home-img" />
            )}
          </div>
          <div className="text-content">
            <h2>{welcomeText}</h2>
            <h1>{name}</h1>
            <h3>{subtitle}</h3>
            <div className="buttons">
              <NavLink to="/connect" className="connect-btn">
                Connect
              </NavLink>
              <NavLink to="/Download-resume" className="download-btn">
                Download Resume
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
