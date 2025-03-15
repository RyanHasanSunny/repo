import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../../Styles/AdminPanel.css';



const PortfolioSection = () => {

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
  // eslint-disable-next-line
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  // Fetch all data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
       
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
      // Delete from Firestore
      await deleteDoc(doc(db, "categories", id));

      // Update local state
      setCategories((prev) => prev.filter((cat) => cat.id !== id));

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
      const docRef = await addDoc(collection(db, "portfolio"), newPortfolioItem);
      setPortfolioItems((prev) => [...prev, { id: docRef.id, ...newPortfolioItem }]);
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
      // Delete from Firestore
      await deleteDoc(doc(db, "portfolio", id));

      // Update local state
      setPortfolioItems((prev) => prev.filter((item) => item.id !== id));

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

 

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  return (
    
      <section className='admin-sections'>
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
      </section>
  );
};

export default PortfolioSection;