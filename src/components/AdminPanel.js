import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage, auth } from './firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
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


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

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
    category: '', // New field for category
  });
  const [editingPortfolioItem, setEditingPortfolioItem] = useState(null);

  // Category state
  const [categories, setCategories] = useState([]); // Existing categories
  const [newCategory, setNewCategory] = useState(''); // New category input
  const [editingCategory, setEditingCategory] = useState(null); // Category being edited

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch introduction
        const introSnapshot = await getDocs(collection(db, "introduction"));
        if (!introSnapshot.empty) {
          const introData = introSnapshot.docs[0].data();
          setWelcomeText(introData.welcomeText);
          setName(introData.name);
          setSubtitle(introData.subtitle);
          setImageUrl(introData.image);
        }

        // Fetch portfolio
        const portfolioSnapshot = await getDocs(collection(db, "portfolio"));
        if (!portfolioSnapshot.empty) {
          const fetchedPortfolio = portfolioSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setPortfolioItems(fetchedPortfolio);
        }

        // Fetch categories
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        if (!categoriesSnapshot.empty) {
          const fetchedCategories = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCategories(fetchedCategories);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Save introduction data
  const handleSaveIntroduction = async () => {
    try {
      const introData = { welcomeText, name, subtitle, image: imageUrl };
      const docRef = doc(db, "introductionDocId", "BXORMSgnVvlVBbczIC7J"); // Replace with your document ID
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
      setCategories([...categories, { id: Date.now().toString(), name: newCategory }]); // Update local state
      setNewCategory(''); // Clear input
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
      setCategories(categories.map(cat => (cat.id === editingCategory.id ? editingCategory : cat))); // Update local state
      setEditingCategory(null); // Clear editing state
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
      setCategories(categories.filter(cat => cat.id !== id)); // Update local state
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