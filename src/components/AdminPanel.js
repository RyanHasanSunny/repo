import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage, auth } from './firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import '../Styles/AdminPanel.css';

const AdminPanel = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  // Introduction state
  const [welcomeText, setWelcomeText] = useState("WELCOME TO");
  const [name, setName] = useState("RYAN");
  const [subtitle, setSubtitle] = useState("Graphic Boy.");
  const [imageUrl, setImageUrl] = useState("");

  // Articles state
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: '', description: '', image: '', link: '' });
  const [editingArticle, setEditingArticle] = useState(null);

  // Portfolio state
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [newPortfolioItem, setNewPortfolioItem] = useState({ title: '', description: '', image: '', link: '' });
  const [editingPortfolioItem, setEditingPortfolioItem] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [navigate, setIsAuthenticated]);
  
  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch introduction
        const querySnapshot = await getDocs(collection(db, "introduction"));
        if (!querySnapshot.empty) {
          const introData = querySnapshot.docs[0].data();
          setWelcomeText(introData.welcomeText);
          setName(introData.name);
          setSubtitle(introData.subtitle);
          setImageUrl(introData.image);
        }

        // Fetch articles
        const articlesSnapshot = await getDocs(collection(db, "articles"));
        if (!articlesSnapshot.empty) {
          const fetchedArticles = articlesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setArticles(fetchedArticles);
        }

        // Fetch portfolio
        const portfolioSnapshot = await getDocs(collection(db, "portfolio"));
        if (!portfolioSnapshot.empty) {
          const fetchedPortfolio = portfolioSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setPortfolioItems(fetchedPortfolio);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching data: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Introduction Handlers
  const handleSaveIntroduction = async () => {
    const introData = { welcomeText, name, subtitle, image: imageUrl };
    try {
      const docRef = doc(db, "introductionDocId", "BXORMSgnVvlVBbczIC7J"); // Replace with your document ID
      await updateDoc(docRef, introData);
    } catch (error) {
      console.error("Error updating introduction: ", error);
    }
  };

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
      console.error("Error uploading image: ", error);
    } finally {
      setImageUploadLoading(false);
    }
  };

  // Article Handlers
  const handleAddArticle = async () => {
    if (!newArticle.title || !newArticle.description || !newArticle.image || !newArticle.link) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, "articles"), newArticle);
      setNewArticle({ title: '', description: '', image: '', link: '' });
    } catch (error) {
      console.error("Error adding article: ", error);
    }
  };

  const handleEditArticle = async () => {
    if (!editingArticle.title || !editingArticle.description) {
      alert('Please fill in all fields.');
      return;
    }

    const docRef = doc(db, "articles", editingArticle.id);
    await updateDoc(docRef, editingArticle);
    setEditingArticle(null);
  };

  const handleDeleteArticle = async (id) => {
    await deleteDoc(doc(db, "articles", id));
    setArticles(articles.filter(article => article.id !== id)); // Update state after deletion
  };

  // Portfolio Handlers
  const handleAddPortfolioItem = async () => {
    if (!newPortfolioItem.title || !newPortfolioItem.image) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, "portfolio"), newPortfolioItem);
      setNewPortfolioItem({ title: '', description: '', image: '', link: '' });
    } catch (error) {
      console.error("Error adding portfolio item: ", error);
    }
  };

  const handleEditPortfolioItem = async () => {
    const docRef = doc(db, "portfolio", editingPortfolioItem.id);
    await updateDoc(docRef, editingPortfolioItem);
    setEditingPortfolioItem(null);
  };

  const handleDeletePortfolioItem = async (id) => {
    await deleteDoc(doc(db, "portfolio", id));
    setPortfolioItems(portfolioItems.filter(item => item.id !== id)); // Update state after deletion
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
      console.error("Error uploading image: ", error);
    } finally {
      setImageUploadLoading(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      console.log("Successfully logged out");
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate("/")}>Back to Home</button>

      {/* Introduction Section */}
      <section>
        <h2>Edit Introduction</h2>
        <input type="text" value={welcomeText} onChange={(e) => setWelcomeText(e.target.value)} placeholder="Welcome Text" />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Subtitle" />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imageUploadLoading ? <p>Uploading...</p> : <button onClick={handleSaveIntroduction}>Save Introduction</button>}
      </section>

      {/* Articles Section */}
      <section>
        <h2>Manage Articles</h2>
        {articles.map(article => (
          <div key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <img src={article.image} alt={article.title} width="100" />
            <button onClick={() => setEditingArticle(article)}>Edit</button>
            <button onClick={() => handleDeleteArticle(article.id)}>Delete</button>
          </div>
        ))}
        {editingArticle && (
          <div>
            <input type="text" value={editingArticle.title} onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })} />
            <input type="text" value={editingArticle.description} onChange={(e) => setEditingArticle({ ...editingArticle, description: e.target.value })} />
            <button onClick={handleEditArticle}>Save Changes</button>
            <button onClick={() => setEditingArticle(null)}>Cancel</button>
          </div>
        )}
        <input type="text" value={newArticle.title} onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })} placeholder="Article Title" />
        <input type="text" value={newArticle.description} onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })} placeholder="Article Description" />
        <input type="text" value={newArticle.link} onChange={(e) => setNewArticle({ ...newArticle, link: e.target.value })} placeholder="Article Link" />
        <button onClick={handleAddArticle}>Add Article</button>
      </section>

      {/* Portfolio Section */}
      <section>
        <h2>Manage Portfolio</h2>
        {portfolioItems.map(item => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <img src={item.image} alt={item.title} width="100" />
            <button onClick={() => setEditingPortfolioItem(item)}>Edit</button>
            <button onClick={() => handleDeletePortfolioItem(item.id)}>Delete</button>
          </div>
        ))}
        {editingPortfolioItem && (
          <div>
            <input type="text" value={editingPortfolioItem.title} onChange={(e) => setEditingPortfolioItem({ ...editingPortfolioItem, title: e.target.value })} />
            <input type="text" value={editingPortfolioItem.description} onChange={(e) => setEditingPortfolioItem({ ...editingPortfolioItem, description: e.target.value })} />
            <button onClick={handleEditPortfolioItem}>Save Changes</button>
            <button onClick={() => setEditingPortfolioItem(null)}>Cancel</button>
          </div>
        )}
        <input type="text" value={newPortfolioItem.title} onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, title: e.target.value })} placeholder="Portfolio Item Title" />
        <input type="text" value={newPortfolioItem.description} onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, description: e.target.value })} placeholder="Portfolio Item Description" />
        <input type="file" accept="image/*" onChange={handlePortfolioImageUpload} />
        <button onClick={handleAddPortfolioItem}>Add Portfolio Item</button>
      </section>
    </div>
  );
};

export default AdminPanel;
