import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig"; // Import your Firestore configuration
import { doc, getDoc } from "firebase/firestore";
import "../Styles/Introduction.css";
import "../Styles/Style.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion


const Introduction = () => {
  const [welcomeText, setWelcomeText] = useState("WELCOME TO");
  const [name, setName] = useState("RYAN");
  const [subtitle, setSubtitle] = useState("Graphic Boy.");

  // Document ID for your introduction data in Firestore
  const docId = "BXORMSgnVvlVBbczIC7J"; // Replace with your actual doc ID

  // Fetch data from Firestore
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
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };

    fetchData();
  }, []);

  // Framer Motion animations
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="introduction-section">
      {/* Custom Cursor */}
      
      {/* Main Content */}
      <div id="home-content" className="home-content">
        <div id="home-content-header" className="home-content-header">
          <div id="text-content" className="text-content">
            {/* Animate the welcomeText, name, and subtitle */}
            <motion.h2
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
              variants={textVariants}
            >
              {welcomeText}
            </motion.h2>

            <motion.h1
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.3 }}
              variants={textVariants}
            >
              {name}
            </motion.h1>

            <motion.h3
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.5 }}
              variants={textVariants}
            >
              {subtitle}
            </motion.h3>

            <div className="buttons">
              <motion.div
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.7 }}
                variants={textVariants}
              >
                <NavLink to="/about" className="connect-btn ">
                  About me
                </NavLink>
              </motion.div>
            </div>
          </div>
        </div>

        <div id="introduction-title">
          <motion.div
            className="title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2>Dive into my projects,</h2>
            <h2>where creativity meets precision</h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;