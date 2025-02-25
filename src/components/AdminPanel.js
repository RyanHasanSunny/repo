import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage, auth } from './firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import '../Styles/AdminPanel.css';

const AdminPanel = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  // Use onAuthStateChanged to track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login if user is not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [navigate, setIsAuthenticated]);

  // About Me state
  const [aboutMe, setAboutMe] = useState({
    name: "",
    experience: "",
    projects: "",
    clients: "",
    hours: "",
    description: "",
    skills: [],
    experiences: [],
    education: [],
  });

  const [experiences, setExperiences] = useState([]);
const [newExperience, setNewExperience] = useState({
  title: "",
  duration: "",
  organization: "",
});
const [editingExperience, setEditingExperience] = useState(null);

const [education, setEducation] = useState([]);
const [newEducation, setNewEducation] = useState({
  qualification: "",
  session: "",
  institution: "",
});
const [editingEducation, setEditingEducation] = useState(null);

const [contactInfo, setContactInfo] = useState({
  email: "",
  phone: "",
  address: "",
});

  // Introduction state
  const [welcomeText, setWelcomeText] = useState("WELCOME TO");
  const [name, setName] = useState("RYAN");
  const [subtitle, setSubtitle] = useState("Graphic Boy.");
  const [imageUrl, setImageUrl] = useState("");

  // Portfolio state
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    category: '',
  });
  const [editingPortfolioItem, setEditingPortfolioItem] = useState(null);

  // Category state
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

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

      // Fetch Introduction
      const introSnapshot = await getDocs(collection(db, "introduction"));
      if (!introSnapshot.empty) {
        const introData = introSnapshot.docs[0].data();
        setWelcomeText(introData.welcomeText);
        setName(introData.name);
        setSubtitle(introData.subtitle);
        setImageUrl(introData.image);
      }

      // Fetch Portfolio
      const portfolioSnapshot = await getDocs(collection(db, "portfolio"));
      if (!portfolioSnapshot.empty) {
        const fetchedPortfolio = portfolioSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPortfolioItems(fetchedPortfolio);
      }

      // Fetch Categories
      const categoriesSnapshot = await getDocs(collection(db, "categories"));
      if (!categoriesSnapshot.empty) {
        const fetchedCategories = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(fetchedCategories);
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


  const handleSaveAboutMe = async () => {
    try {
      const docRef = doc(db, "about", "aboutDocId"); // Replace "aboutDocId" with your document ID
      const docSnap = await getDoc(docRef); // Check if the document exists
  
      if (docSnap.exists()) {
        // Document exists, update it
        await updateDoc(docRef, aboutMe);
        alert("About Me updated successfully!");
      } else {
        // Document does not exist, create it
        await setDoc(docRef, aboutMe);
        alert("About Me created successfully!");
      }
    } catch (error) {
      setError("Error saving About Me: " + error.message);
      console.error("Error saving About Me: ", error);
    }
  };


  


  const handleAddExperience = async () => {
    try {
      const docRef = doc(db, "about", "aboutDocId"); // Replace with your document ID
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Get the existing experiences array or initialize it as an empty array
        const existingExperiences = docSnap.data().experiences || [];
  
        // Update the document with the new experience
        await updateDoc(docRef, {
          experiences: [...existingExperiences, newExperience],
        });
      } else {
        // Create a new document with the experiences array
        await setDoc(docRef, {
          experiences: [newExperience],
        });
      }
  
      // Reset the form
      setNewExperience({ title: "", duration: "", organization: "" });
      alert("Experience added successfully!");
    } catch (error) {
      setError("Error adding experience: " + error.message);
      console.error("Error adding experience: ", error);
    }
  };
  
  const handleSaveExperience = async () => {
    try {
      const docRef = doc(db, "about", "aboutDocId"); // Replace with your document ID
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Get the existing experiences array or initialize it as an empty array
        const existingExperiences = docSnap.data().experiences || [];
  
        // Update the specific experience
        const updatedExperiences = existingExperiences.map((exp, index) =>
          index === editingExperience.index ? editingExperience : exp
        );
  
        // Update the document
        await updateDoc(docRef, {
          experiences: updatedExperiences,
        });
  
        // Reset the editing state
        setEditingExperience(null);
        alert("Experience updated successfully!");
      } else {
        alert("Document does not exist!");
      }
    } catch (error) {
      setError("Error updating experience: " + error.message);
      console.error("Error updating experience: ", error);
    }
  };
  
  const handleDeleteExperience = async (index) => {
    try {
      const docRef = doc(db, "about", "aboutDocId"); // Replace with your document ID
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Get the existing experiences array or initialize it as an empty array
        const existingExperiences = docSnap.data().experiences || [];
  
        // Remove the experience at the specified index
        const updatedExperiences = existingExperiences.filter(
          (_, i) => i !== index
        );
  
        // Update the document
        await updateDoc(docRef, {
          experiences: updatedExperiences,
        });
  
        alert("Experience deleted successfully!");
      } else {
        alert("Document does not exist!");
      }
    } catch (error) {
      setError("Error deleting experience: " + error.message);
      console.error("Error deleting experience: ", error);
    }
  };


  const handleAddEducation = async () => {
    try {
      const docRef = doc(db, "about", "aboutDocId"); // Replace with your document ID
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Get the existing education array or initialize it as an empty array
        const existingEducation = docSnap.data().education || [];
  
        // Update the document with the new education entry
        await updateDoc(docRef, {
          education: [...existingEducation, newEducation],
        });
      } else {
        // Create a new document with the education array
        await setDoc(docRef, {
          education: [newEducation],
        });
      }
  
      // Reset the form
      setNewEducation({ qualification: "", session: "", institution: "" });
      alert("Education added successfully!");
    } catch (error) {
      setError("Error adding education: " + error.message);
      console.error("Error adding education: ", error);
    }
  };
  
  const handleSaveEducation = async () => {
    try {
      const docRef = doc(db, "about", "aboutDocId"); // Replace with your document ID
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Get the existing education array or initialize it as an empty array
        const existingEducation = docSnap.data().education || [];
  
        // Update the specific education entry
        const updatedEducation = existingEducation.map((edu, index) =>
          index === editingEducation.index ? editingEducation : edu
        );
  
        // Update the document
        await updateDoc(docRef, {
          education: updatedEducation,
        });
  
        // Reset the editing state
        setEditingEducation(null);
        alert("Education updated successfully!");
      } else {
        alert("Document does not exist!");
      }
    } catch (error) {
      setError("Error updating education: " + error.message);
      console.error("Error updating education: ", error);
    }
  };
  
  const handleDeleteEducation = async (index) => {
    try {
      const docRef = doc(db, "about", "aboutDocId"); // Replace with your document ID
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Get the existing education array or initialize it as an empty array
        const existingEducation = docSnap.data().education || [];
  
        // Remove the education entry at the specified index
        const updatedEducation = existingEducation.filter(
          (_, i) => i !== index
        );
  
        // Update the document
        await updateDoc(docRef, {
          education: updatedEducation,
        });
  
        alert("Education deleted successfully!");
      } else {
        alert("Document does not exist!");
      }
    } catch (error) {
      setError("Error deleting education: " + error.message);
      console.error("Error deleting education: ", error);
    }
  };


  const handleSaveContactInfo = async () => {
    try {
      const docRef = doc(db, "contact", "contactDocId"); // Replace with your document ID
      await setDoc(docRef, contactInfo);
      alert("Contact information saved successfully!");
    } catch (error) {
      setError("Error saving contact information: " + error.message);
      console.error("Error saving contact information: ", error);
    }
  };


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

  // Save introduction data
  const handleSaveIntroduction = async () => {
    try {
      const introData = { welcomeText, name, subtitle, image: imageUrl };
      const docRef = doc(db, "introduction", "introductionDocId"); // Replace with your document ID
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

  // Add a new category
  const handleAddCategory = async () => {
    if (!newCategory) {
      alert('Please enter a category name.');
      return;
    }

    try {
      await addDoc(collection(db, "categories"), { name: newCategory });
      setCategories([...categories, { id: Date.now().toString(), name: newCategory }]);
      setNewCategory('');
      alert("Category added successfully!");
    } catch (error) {
      setError("Error adding category: " + error.message);
      console.error("Error adding category: ", error);
    }
  };

  // Edit a category
  const handleEditCategory = async () => {
    if (!editingCategory || !editingCategory.name) {
      alert('Please enter a valid category name.');
      return;
    }

    try {
      const docRef = doc(db, "categories", editingCategory.id);
      await updateDoc(docRef, { name: editingCategory.name });
      setCategories(categories.map(cat => (cat.id === editingCategory.id ? editingCategory : cat)));
      setEditingCategory(null);
      alert("Category updated successfully!");
    } catch (error) {
      setError("Error updating category: " + error.message);
      console.error("Error updating category: ", error);
    }
  };

  // Delete a category
  const handleDeleteCategory = async (id) => {
    try {
      await deleteDoc(doc(db, "categories", id));
      setCategories(categories.filter(cat => cat.id !== id));
      alert("Category deleted successfully!");
    } catch (error) {
      setError("Error deleting category: " + error.message);
      console.error("Error deleting category: ", error);
    }
  };

  // Add portfolio item
  const handleAddPortfolioItem = async () => {
    if (!newPortfolioItem.title || !newPortfolioItem.image || !newPortfolioItem.category) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, "portfolio"), newPortfolioItem);
      setNewPortfolioItem({ title: '', description: '', image: '', link: '', category: '' });
      alert("Portfolio item added successfully!");
    } catch (error) {
      setError("Error adding portfolio item: " + error.message);
      console.error("Error adding portfolio item: ", error);
    }
  };

  // Edit portfolio item
  const handleEditPortfolioItem = async () => {
    try {
      const docRef = doc(db, "portfolio", editingPortfolioItem.id);
      await updateDoc(docRef, editingPortfolioItem);
      setEditingPortfolioItem(null);
      alert("Portfolio item updated successfully!");
    } catch (error) {
      setError("Error updating portfolio item: " + error.message);
      console.error("Error updating portfolio item: ", error);
    }
  };

  // Delete portfolio item
  const handleDeletePortfolioItem = async (id) => {
    try {
      await deleteDoc(doc(db, "portfolio", id));
      setPortfolioItems(portfolioItems.filter(item => item.id !== id));
      alert("Portfolio item deleted successfully!");
    } catch (error) {
      setError("Error deleting portfolio item: " + error.message);
      console.error("Error deleting portfolio item: ", error);
    }
  };

  // Handle portfolio image upload
  const handlePortfolioImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploadLoading(true);
    const storageRef = ref(storage, `portfolio-images/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setNewPortfolioItem((prev) => ({ ...prev, image: url }));
    } catch (error) {
      setError("Error uploading image: " + error.message);
      console.error("Error uploading image: ", error);
    } finally {
      setImageUploadLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      navigate("/");
      alert("Successfully logged out!");
    } catch (error) {
      setError("Logout error: " + error.message);
      console.error("Logout error: ", error);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <section className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <div className='admin-buttons'>
          <button className="button" onClick={handleLogout}>Logout</button>
          <button className="button" onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="admin-sections">
        <h2>Edit Introduction</h2>
        <div className="content">
          <input type="text" value={welcomeText} onChange={(e) => setWelcomeText(e.target.value)} placeholder="Welcome Text" />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Subtitle" />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imageUploadLoading ? <p>Uploading...</p> : <button className="button" onClick={handleSaveIntroduction}>Save Introduction</button>}
        </div>
      </div>

      {/* About Me Section */}
      <div className="admin-sections">
        <h2>Edit About Me</h2>
        <div className="content">
          <input
            type="text"
            value={aboutMe.name}
            onChange={(e) => setAboutMe({ ...aboutMe, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="text"
            value={aboutMe.experience}
            onChange={(e) => setAboutMe({ ...aboutMe, experience: e.target.value })}
            placeholder="Years of Experience"
          />
          <input
            type="text"
            value={aboutMe.projects}
            onChange={(e) => setAboutMe({ ...aboutMe, projects: e.target.value })}
            placeholder="Projects Completed"
          />
          <input
            type="text"
            value={aboutMe.clients}
            onChange={(e) => setAboutMe({ ...aboutMe, clients: e.target.value })}
            placeholder="Clients"
          />
          <input
            type="text"
            value={aboutMe.hours}
            onChange={(e) => setAboutMe({ ...aboutMe, hours: e.target.value })}
            placeholder="Hours of Designing"
          />
          <textarea
            value={aboutMe.description}
            onChange={(e) => setAboutMe({ ...aboutMe, description: e.target.value })}
            placeholder="About Me Description"
            rows={5}
          />
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

    <div>
  <h3>Experiences</h3>
  {aboutMe.experiences?.map((exp, index) => (
    <div key={index}>
      <h4>{exp.title}</h4>
      <p>{exp.duration}</p>
      <p>{exp.organization}</p>
      <button onClick={() => setEditingExperience({ ...exp, index })}>Edit</button>
      <button onClick={() => handleDeleteExperience(index)}>Delete</button>
    </div>
  ))}
  <input
    type="text"
    value={newExperience.title}
    onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
    placeholder="Title"
  />
  <input
    type="text"
    value={newExperience.duration}
    onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
    placeholder="Duration"
  />
  <input
    type="text"
    value={newExperience.organization}
    onChange={(e) => setNewExperience({ ...newExperience, organization: e.target.value })}
    placeholder="Organization"
  />
  <button onClick={handleAddExperience}>Add Experience</button>
</div>



    <button className="button" onClick={handleSaveAboutMe}>Save About Me</button>
        </div>
      </div>


  

<section className="admin-sections">
  <h2>Manage Education</h2>
  <div className="panel-contents">
    {education.map(edu => (
      <div key={edu.id} className="added-contents">
        <h3>{edu.qualification}</h3>
        <p>{edu.session}</p>
        <p>{edu.institution}</p>
        <div className="admin-buttons">
          <button className="button" onClick={() => setEditingEducation(edu)}>Edit</button>
          <button className="button" onClick={() => handleDeleteEducation(edu.id)}>Delete</button>
        </div>
      </div>
    ))}
  </div>

  <div>
    <h3>{editingEducation ? 'Edit Education' : 'Add New Education'}</h3>
    <input
      type="text"
      value={editingEducation ? editingEducation.qualification : newEducation.qualification}
      onChange={(e) =>
        editingEducation
          ? setEditingEducation({ ...editingEducation, qualification: e.target.value })
          : setNewEducation({ ...newEducation, qualification: e.target.value })
      }
      placeholder="Qualification"
    />
    <input
      type="text"
      value={editingEducation ? editingEducation.session : newEducation.session}
      onChange={(e) =>
        editingEducation
          ? setEditingEducation({ ...editingEducation, session: e.target.value })
          : setNewEducation({ ...newEducation, session: e.target.value })
      }
      placeholder="Session"
    />
    <input
      type="text"
      value={editingEducation ? editingEducation.institution : newEducation.institution}
      onChange={(e) =>
        editingEducation
          ? setEditingEducation({ ...editingEducation, institution: e.target.value })
          : setNewEducation({ ...newEducation, institution: e.target.value })
      }
      placeholder="Institution"
    />
    <button
      className="button"
      onClick={editingEducation ? handleSaveEducation : handleAddEducation}
    >
      {editingEducation ? 'Save Changes' : 'Add Education'}
    </button>
    {editingEducation && (
      <button className="button" onClick={() => setEditingEducation(null)}>Cancel</button>
    )}
  </div>
</section>


<section className="admin-sections">
  <h2>Manage Contact Information</h2>
  <div>
    <input
      type="email"
      value={contactInfo.email}
      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
      placeholder="Email"
    />
    <input
      type="tel"
      value={contactInfo.phone}
      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
      placeholder="Phone"
    />
    <input
      type="text"
      value={contactInfo.address}
      onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
      placeholder="Address"
    />
    <button className="button" onClick={handleSaveContactInfo}>Save Contact Information</button>
  </div>
</section>





      {/* Portfolio Section */}
      <section className='admin-sections'>
        <h2>Manage Portfolio</h2>
        <div className="panel-contents">
          {portfolioItems.map(item => (
            <div className="added-contents" key={item.id}>
              <img src={item.image} alt={item.title} width="300" />
              <p>{item.title}</p>
              <p>{item.description}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <div className='admin-buttons'>
                <a className='button' href={item.link} target="_blank" rel="noopener noreferrer">View</a>
                <button className="button" onClick={() => setEditingPortfolioItem(item)}>Edit</button>
                <button className="button" onClick={() => handleDeletePortfolioItem(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Portfolio Item Form */}
        <div>
          <h3>{editingPortfolioItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</h3>
          <input type="text" value={newPortfolioItem.title} onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, title: e.target.value })} placeholder="Portfolio Item Title" />
          <input type="text" value={newPortfolioItem.description} onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, description: e.target.value })} placeholder="Portfolio Item Description" />
          <input type="text" value={newPortfolioItem.link} onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, link: e.target.value })} placeholder="Portfolio Link" />
          <input type="file" accept="image/*" onChange={handlePortfolioImageUpload} />

          {/* Category Selection Dropdown */}
          <div>
            <h4>Select Category:</h4>
            <select
              value={newPortfolioItem.category}
              onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, category: e.target.value })}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Add New Category */}
          <div>
            <h4>Add New Category:</h4>
            <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="New Category Name" />
            <button className="button" onClick={handleAddCategory}>Add Category</button>
          </div>

          {/* Edit/Delete Category */}
          <div>
            <h4>Edit/Delete Category:</h4>
            <select
              value={editingCategory ? editingCategory.id : ''}
              onChange={(e) => {
                const selectedCategory = categories.find(cat => cat.id === e.target.value);
                setEditingCategory(selectedCategory || null);
              }}
            >
              <option value="">Select a category to edit/delete</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {editingCategory && (
              <div>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                />
                <button className="button" onClick={handleEditCategory}>Save Changes</button>
                <button className="button" onClick={() => handleDeleteCategory(editingCategory.id)}>Delete</button>
              </div>
            )}
          </div>

          <button className="button" onClick={editingPortfolioItem ? handleEditPortfolioItem : handleAddPortfolioItem}>
            {editingPortfolioItem ? 'Save Changes' : 'Add Portfolio Item'}
          </button>
        </div>
      </section>
    </section>
  );
};

export default AdminPanel;