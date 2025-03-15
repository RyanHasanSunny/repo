import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, updateDoc, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import '../../Styles/AdminPanel.css';


const EduSection = () => {



    const [aboutMe, setAboutMe] = useState({
        education: [],
    });

    const [newEducation, setNewEducation] = useState({
        qualification: "",
        session: "",
        institution: "",
    });
    const [editingEducation, setEditingEducation] = useState(null);









    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // eslint-disable-next-line
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


    //handleAddEducation

    const handleAddEducation = async () => {
        try {
            const docRef = doc(db, "about", "aboutDocId");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const existingEducation = docSnap.data().education || [];
                await updateDoc(docRef, {
                    education: [...existingEducation, newEducation],
                });
                setAboutMe((prev) => ({
                    ...prev,
                    education: [...existingEducation, newEducation],
                }));
            } else {
                await setDoc(docRef, {
                    education: [newEducation],
                });
                setAboutMe((prev) => ({
                    ...prev,
                    education: [newEducation],
                }));
            }

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
            const docRef = doc(db, "about", "aboutDocId");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const existingEducation = docSnap.data().education || [];
                const updatedEducation = existingEducation.filter((_, i) => i !== index);

                // Update Firestore
                await updateDoc(docRef, {
                    education: updatedEducation,
                });

                // Update local state
                setAboutMe((prev) => ({
                    ...prev,
                    education: updatedEducation,
                }));

                alert("Education deleted successfully!");
            } else {
                alert("Document does not exist!");
            }
        } catch (error) {
            setError("Error deleting education: " + error.message);
            console.error("Error deleting education: ", error);
        }
    };








    if (loading) return <div className="loading-spinner">Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;
    return (
        
            <section className="admin-sections">
                <div className="content">

                    <h2>Manage Education</h2>
                    <div className="panel-contents">
                        {aboutMe.education?.map((edu, index) => (
                            <div key={index} className="added-contents">
                                <h3>{edu.qualification}</h3>
                                <p>{edu.session}</p>
                                <p>{edu.institution}</p>
                                <div className="admin-buttons">
                                    <button className="button" onClick={() => setEditingEducation(edu)}>Edit</button>
                                    <button className="button" onClick={() => handleDeleteEducation(index)}>Delete</button>
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
                </div>
        </section>
    );
};

export default EduSection;