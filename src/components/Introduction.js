import React, { useEffect, useRef, useState } from "react";
import { db } from "./firebaseConfig"; // Import your Firestore configuration
import { doc, getDoc } from "firebase/firestore";
import "../Styles/Introduction.css";
import "../Styles/Style.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion

const Introduction = () => {
  const [welcomeText, setWelcomeText] = useState("WELCOME TO");
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  // const [imageUrl, setImageUrl] = useState(""); // State for the side image URL

  const cursor = useRef(null);

  // Document ID for your introduction data in Firestore
  const docId = "BXORMSgnVvlVBbczIC7J"; // Replace with your actual doc ID

  // State for actual mouse position and cursor's position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  // Smoothly interpolate the custom cursor's position
  useEffect(() => {
    const smoothCursorMovement = () => {
      setCursorPos((prevPos) => {
        const dx = mousePos.x - prevPos.x;
        const dy = mousePos.y - prevPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const damping = 1.0; // Damping factor for smoothness (lower is smoother)

        // If the cursor is close to the target, stop updating
        if (distance < 0.1) return prevPos;

        return {
          x: prevPos.x + dx * damping,
          y: prevPos.y + dy * damping,
        };
      });

      requestAnimationFrame(smoothCursorMovement);
    };

    // Start the animation loop
    requestAnimationFrame(smoothCursorMovement);

    return () => {
      // Cancel the animation frame if the component is unmounted
      cancelAnimationFrame(smoothCursorMovement);
    };
  }, [mousePos]);

  // Add hover effect for cursor scaling
  useEffect(() => {
    const textContent = document.querySelector(".text-content");

    const handleMouseEnter = () => {
      cursor.current.classList.add("scale-up");
    };

    const handleMouseLeave = () => {
      cursor.current.classList.remove("scale-up");
    };

    if (textContent) {
      textContent.addEventListener("mouseenter", handleMouseEnter);
      textContent.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (textContent) {
        textContent.removeEventListener("mouseenter", handleMouseEnter);
        textContent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "introductionDocId", docId); // Replace "introductionDocId" with your actual collection name
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWelcomeText(data.welcomeText || "");
          setName(data.name || "");
          setSubtitle(data.subtitle || "");
          // setImageUrl(data.image || ""); // Set the initial image URL if available
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
      <div
        ref={cursor}
        className="cursor"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      ></div>
      
      {/* edit button */}
      <div id="Adminbtnplace" className="Adminbtnplace">
        <NavLink to="/admin" className="admin-btn">
          Edit
        </NavLink>
      </div>

      <div id="home-content" className="home-content">
        <div id="home-content-header" className="home-content-header">
          {/* <div className="img">
            
            {imageUrl ? (
              <img src={imageUrl} alt="Side" className="home-img" />
            ) : (
              <img src={imageUrl} alt="Default Side" className="home-img" />
            )}
          </div> */}
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
                <NavLink to="/about" className="connect-btn">
                  About me
                </NavLink>
              </motion.div>

              {/* <motion.div
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.9 }}
                variants={textVariants}
              >
                <NavLink to="/Download-resume" className="download-btn">
                  Download Resume
                </NavLink>
              </motion.div> */}
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
