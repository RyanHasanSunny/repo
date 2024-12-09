import React, { useEffect, useRef, useState } from "react";
import { db } from "./firebaseConfig"; // Import your Firestore configuration
import { doc, getDoc } from "firebase/firestore";
import "../Styles/Introduction.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion

const Introduction = () => {
  const [welcomeText, setWelcomeText] = useState("WELCOME TO");
  const [name, setName] = useState("RYAN");
  const [subtitle, setSubtitle] = useState("Graphic Boy.");
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

  // Framer Motion animations
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="home" className="introduction-section">
      <div
        ref={cursor}
        className="cursor"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      ></div>
      
      {/* edit button */}
      <div className="Adminbtnplace">
        <NavLink to="/admin" className="admin-btn">
          Edit
        </NavLink>
      </div>

      <div className="home-content">
        <div className="home-content-header">
          {/* <div className="img">
            
            {imageUrl ? (
              <img src={imageUrl} alt="Side" className="home-img" />
            ) : (
              <img src={imageUrl} alt="Default Side" className="home-img" />
            )}
          </div> */}
          <div className="text-content">
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

        {/* <motion.div
          className="Aboutme-section"
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 1.2 }}
          variants={textVariants}
        >
          
          <div className="details">
            <p>
              Ryan Hasan Sunny is a skilled 3D artist, graphic designer, and
              Computer Science and Engineering student with a flair for creative
              expression and technological expertise. With a strong foundation
              in digital design tools such as Blender 3D, Adobe Illustrator, and
              Photoshop, Ryan specializes in 3D modeling, rendering, and
              animation. His portfolio showcases a wide range of work, from gold
              jewelry renders to logo designs for businesses like PRS Sourcing,
              a garment trading office. As a full-time freelancer on Fiverr,
              Ryan has honed his ability to deliver high-quality, visually
              compelling projects, balancing both technical precision and
              artistic vision. His work is driven by a passion for bringing
              ideas to life in visually striking ways, whether through intricate
              3D designs or vibrant graphic illustrations.
            </p>
          </div>
        </motion.div> */}

<div className="titlefm">
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
