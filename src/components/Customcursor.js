import React, { useEffect, useRef, useState } from "react";
import "../Styles/CustomCursor.css"; // Create this file for cursor styles

const CustomCursor = () => {
  const cursor = useRef(null);
  const cursorTrail = useRef(null);

  // State for mouse position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Detect if the user is on a mobile device
  const isMobile = () => {
    // Check for touch support
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    // Check screen width (common mobile breakpoint is 768px)
    const isSmallScreen = window.innerWidth <= 768;
    return isTouchDevice || isSmallScreen;
  };

  // Track mouse movement
  useEffect(() => {
    if (isMobile()) return; // Disable cursor for mobile users

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Add hover effects for interactive elements
  useEffect(() => {
    if (isMobile()) return; // Disable cursor for mobile users

    const interactiveElements = document.querySelectorAll(".interactive");

    const handleMouseEnter = () => {
      cursor.current.classList.add("scale-up", "color-change");
      cursorTrail.current.classList.add("color-change");
    };

    const handleMouseLeave = () => {
      cursor.current.classList.remove("scale-up", "color-change");
      cursorTrail.current.classList.remove("color-change");
    };

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Do not render the cursor for mobile users
  if (isMobile()) return null;

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursor}
        className="cursor"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      ></div>

      {/* Cursor Trail */}
      <div
        ref={cursorTrail}
        className="cursor-trail"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      ></div>
    </>
  );
};

export default CustomCursor;