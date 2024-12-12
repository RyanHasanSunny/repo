//import React, { useEffect, useRef, useState } from "react";
//import { db } from "./firebaseConfig"; // Import your Firestore configuration
//import { doc, getDoc } from "firebase/firestore";
import "../Styles/Aboutme.css";
import "../Styles/Style.css";
import Icon from "../assets/sunny.jpg";
import ps from "../assets/photoshop.png"
import ai from "../assets/illustrator.png"
import id from "../assets/indesign.png"
import figma from "../assets/figma.png"
import xd from "../assets/xd_5968559.png"
import bl from "../assets/Blender-Symbol.png"
import autodesk3ds from "../assets/autodesk3ds.png"
//import AboutItem from "./AboutItem";
import { NavLink } from "react-router-dom";
//import { motion } from "framer-motion"; // Import framer-motion

const Aboutme = () => {


  return (
    <section id="aboutme">

      {/* edit button */}
      <div className="Adminbtnplace">
        <NavLink to="/admin" className="admin-btn">
          Edit
        </NavLink>
      </div>

      <div id="aboutme-content">
        <div className="home-content-header">

          <div id="Image-name">
            <div id="img">
              <img className="imagesize" src={Icon} alt="profile-image" />
            </div>
            <div id="text-content">
              <div id="Name">
                <h2>I'm</h2>
                <p>Ryan Hasan Sunny</p>
              </div>
              <div id="workingdetails">
                <div className="Exprience">
                  <h2>
                    Year of Exprience
                  </h2>
                  <p>
                    3+
                  </p>
                </div>
                <div className="Line">
                </div>
                <div className="Project-Completed">
                  <h2>
                    Project Completed
                  </h2>
                  <p>
                    20+
                  </p>
                </div>
                <div className="Line">
                </div>
                <div className="Clients">
                  <h2>
                    Clients
                  </h2>
                  <p>
                    10+
                  </p>
                </div>
                <div className="Line">
                </div>
                <div className="Hours">
                  <h2>
                    Hours of Designing
                  </h2>
                  <p>
                    10000+
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Line">
        </div>

        <section id="section" className="aboutme"
        >
          <div className="title">
            <h2>About me</h2>
          </div>
          <div className="Line">
          </div>
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
        </section>

        <section id="section" className="skills"
        >
          <div className="title">
            <h2>Skills</h2>
          </div>
          <div className="Line">
          </div>
          <div className="details">

          <div className="Items">

          
            <div id="skills">
              <p>
                Graphic Design
              </p>

              <div className="tools">
                <img className="imagesize" src={ps} alt="ps" />
                <img className="imagesize" src={ai} alt="ai" />
                <img className="imagesize" src={id} alt="id" />
                <img className="imagesize" src={figma} alt="figma" />
                <img className="imagesize" src={bl} alt="ps" />
                <img className="imagesize" src={autodesk3ds} alt="ai" />
                <img className="imagesize" src={xd} alt="id" />
              </div>

            </div>
            <div id="skills">
              <p>
                Game Development
              </p>
              <div className="tools">
                

              </div>

            </div>
            <div id="skills">
              <p>
                Programing 
              </p>

              <div className="tools">
               
              </div>

            </div>
            </div>

          </div>
        </section>






      </div>
    </section>
  );
};

export default Aboutme;
