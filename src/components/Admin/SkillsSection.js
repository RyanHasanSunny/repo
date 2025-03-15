import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebaseConfig';
import { collection, getDocs,} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../../Styles/AdminPanel.css';


const SkillsSection = () => {
  // About Me state
  const [aboutMe, setAboutMe] = useState({
    skills: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

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




  // Add a new skill with an empty images array
const handleAddSkill = () => {
  setAboutMe((prev) => ({
    ...prev,
    skills: [...prev.skills, { skill: "", images: [] }],
  }));
};

// Update skill name or images
const handleSkillChange = (index, field, value) => {
  setAboutMe((prev) => {
    const updatedSkills = [...prev.skills];
    updatedSkills[index][field] = value;
    return { ...prev, skills: updatedSkills };
  });
};

// Add an image to a skill
const handleAddImageToSkill = async (index, e) => {
  const file = e.target.files[0];
  if (!file) return;

  setImageUploadLoading(true);
  const storageRef = ref(storage, `skill-images/${file.name}`);
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setAboutMe((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index].images = [...updatedSkills[index].images, url];
      return { ...prev, skills: updatedSkills };
    });
  } catch (error) {
    setError("Error uploading image: " + error.message);
    console.error("Error uploading image: ", error);
  } finally {
    setImageUploadLoading(false);
  }
};

// Delete an image from a skill
const handleDeleteImageFromSkill = (skillIndex, imageIndex) => {
  setAboutMe((prev) => {
    const updatedSkills = [...prev.skills];
    updatedSkills[skillIndex].images = updatedSkills[skillIndex].images.filter((_, i) => i !== imageIndex);
    return { ...prev, skills: updatedSkills };
  });
};

// Delete a skill
const handleDeleteSkill = (index) => {
  setAboutMe((prev) => {
    const updatedSkills = prev.skills.filter((_, i) => i !== index);
    return { ...prev, skills: updatedSkills };
  });
};



 

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
      <section className="admin-sections">
        <div className="content">
          <h3>Skills</h3>
    {aboutMe.skills.map((skill, index) => (
      <div key={index} className="skill-item">
        <input
          type="text"
          value={skill.skill}
          onChange={(e) => handleSkillChange(index, "skill", e.target.value)}
          placeholder="Skill Name"
        />
        <div className="skill-images">
          {skill.images.map((image, imageIndex) => (
            <div key={imageIndex} className="skill-image">
              <img src={image} alt={`Skill ${index}  ${imageIndex}`} width="100" />
              <button className="button" onClick={() => handleDeleteImageFromSkill(index, imageIndex)}>Delete Image</button>
            </div>
          ))}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleAddImageToSkill(index, e)}
          />
          {imageUploadLoading && <p>Uploading...</p>}
        </div>
        <button className="button" onClick={() => handleDeleteSkill(index)}>Delete Skill</button>
      </div>
    ))}
    <button className="button" onClick={handleAddSkill}>Add Skill</button>

        </div>
    </section>
  );
};

export default SkillsSection;