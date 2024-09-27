import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from './firebaseConfig'; // Import Firebase Storage
import '../Styles/AdminPanel.css';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false); // Loading state for image upload

  // Introduction state
  const [welcomeText, setWelcomeText] = useState("WELCOME TO");
  const [name, setName] = useState("RYAN");
  const [subtitle, setSubtitle] = useState("Graphic Boy.");
  const [imageUrl, setImageUrl] = useState(""); // State for the image URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "introductionDocId"));
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(docs);
        if (docs.length > 0) {
          setImageUrl(docs[0].image || ""); // Set the initial image URL if available
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(prev => !prev);
  };

  const handleSaveIntroduction = async () => {
    const introductionData = {
      welcomeText,
      name,
      subtitle,
      image: imageUrl, // Include the image URL in the data
    };
    try {
      const docRef = doc(db, "introductionDocId", "BXORMSgnVvlVBbczIC7J");
      await updateDoc(docRef, introductionData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating introduction: ", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploadLoading(true); // Start loading state

    const storageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(storageRef, file); // Upload the file
      const url = await getDownloadURL(storageRef); // Get the file URL
      setImageUrl(url); // Set the image URL state
    } catch (error) {
      console.error("Error uploading image: ", error.message); // Log the specific error message
      alert(`Error uploading image: ${error.message}`); // Optional: show an alert
    } finally {
      setImageUploadLoading(false); // End loading state
    }
  };

  const handleSaveAll = async () => {
    await handleSaveIntroduction();
    navigate('/'); // Navigate to the home path
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <button onClick={handleEditToggle}>
        {isEditing ? "Exit Edit Mode" : "Edit Introduction"}
      </button>

      <h2>Edit Introduction</h2>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={welcomeText}
            onChange={(e) => setWelcomeText(e.target.value)}
            placeholder="Welcome Text"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload} // Handle image upload
          />
          {imageUploadLoading ? (
            <div>Uploading image...</div> // Display loading message
          ) : (
            imageUrl && <img src={imageUrl} alt="Uploaded" width="100" />
          )}
          <button onClick={handleSaveIntroduction}>Save Introduction</button>
          {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
        </div>
      ) : (
        <div>
          <h2>{welcomeText}</h2>
          <h1>{name}</h1>
          <h3>{subtitle}</h3>
          {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" />}
        </div>
      )}

      <button onClick={handleSaveAll}>Save All and Go Home</button>
    </div>
  );
};

export default AdminPanel;
