import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "../Styles/Aboutme.css";
import "../Styles/Style.css";
import Icon from "../assets/sunny.jpg";
import CustomCursor from "../components/Customcursor";
import { NavLink } from "react-router-dom";

const Aboutme = () => {
  const [aboutData, setAboutData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (collection, docId, setData) => {
    try {
      const docRef = doc(db, collection, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        setError(`${collection} data not found. Please check the database.`);
      }
    } catch (error) {
      setError(`Error fetching ${collection} data: ${error.message}`);
      console.error(`Error fetching ${collection} data: `, error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await fetchData("about", "aboutDocId", setAboutData);
      await fetchData("contact", "contactDocId", setContactData);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  if (loading) return <div className="loading-spinner">Loading About Me...</div>;
  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <section id="aboutme">
      <CustomCursor />
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
                <p>{aboutData?.name || "Ryan Hasan Sunny"}</p>
              </div>
              <div id="workingdetails">
                <div className="Experience">
                  <h2>Year of Experience</h2>
                  <p>{aboutData?.experience || "3+"}</p>
                </div>
                <div className="Project-Completed">
                  <h2>Project Completed</h2>
                  <p>{aboutData?.projects || "20+"}</p>
                </div>
                <div className="Clients">
                  <h2>Clients</h2>
                  <p>{aboutData?.clients || "10+"}</p>
                </div>
                <div className="Hours">
                  <h2>Hours of Designing</h2>
                  <p>{aboutData?.hours || "10000+"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="section" className="aboutme">
          <div className="title">
            <h2>About me</h2>
          </div>
          <div className="details">
            <p>{aboutData?.description || "Ryan Hasan Sunny is a skilled 3D artist, graphic designer, and Computer Science and Engineering student with a flair for creative expression and technological expertise."}</p>
          </div>
        </section>

        <section id="section" className="skills">
          <div className="title">
            <h2>Skills</h2>
          </div>
          <div className="details">
            {aboutData?.skills?.map((skill, index) => (
              <div key={index} className="skill-item">
                <p>{skill.skill}</p>
                {skill.images && skill.images.length > 0 && (
                  <div className="skill-icons">
                    {skill.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`${skill.skill} Icon ${imgIndex + 1}`}
                        className="skill-icon"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="section" className="experience">
          <div className="title">
            <h2>Experience</h2>
          </div>
          <div className="details">
            {aboutData?.experiences?.map((exp, index) => (
              <div key={index} className="item">
                <h3>{exp.title}</h3>
                <p>{exp.duration}</p>
                <p>{exp.organization}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="section" className="education">
          <div className="title">
            <h2>Education</h2>
          </div>
          <div className="details">
            {aboutData?.education?.map((edu, index) => (
              <div key={index} className="item">
                <h3>{edu.qualification}</h3>
                <p>{edu.session}</p>
                <p>{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="section" className="contact-information">
          <div className="title">
            <h2>Contact Information</h2>
          </div>
          <div className="details">
            <p><strong>Email:</strong> {contactData?.email || "No email provided"}</p>
            <p><strong>Phone:</strong> {contactData?.phone || "No phone provided"}</p>
            <p><strong>Address:</strong> {contactData?.address || "No address provided"}</p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Aboutme;