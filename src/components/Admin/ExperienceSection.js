import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, updateDoc, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import '../../Styles/AdminPanel.css';



const ExperienceSection = () => {

    // About Me state
    const [aboutMe, setAboutMe] = useState({
        experiences: [],
    });



    const [newExperience, setNewExperience] = useState({
        title: "",
        duration: "",
        organization: "",
    });
    const [editingExperience, setEditingExperience] = useState(null);



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


    const handleAddExperience = async () => {
        try {
            const docRef = doc(db, "about", "aboutDocId");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const existingExperiences = docSnap.data().experiences || [];
                await updateDoc(docRef, {
                    experiences: [...existingExperiences, newExperience],
                });
                setAboutMe((prev) => ({
                    ...prev,
                    experiences: [...existingExperiences, newExperience],
                }));
            } else {
                await setDoc(docRef, {
                    experiences: [newExperience],
                });
                setAboutMe((prev) => ({
                    ...prev,
                    experiences: [newExperience],
                }));
            }

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
            const docRef = doc(db, "about", "aboutDocId");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const existingExperiences = docSnap.data().experiences || [];
                const updatedExperiences = existingExperiences.filter((_, i) => i !== index);

                // Update Firestore
                await updateDoc(docRef, {
                    experiences: updatedExperiences,
                });

                // Update local state
                setAboutMe((prev) => ({
                    ...prev,
                    experiences: updatedExperiences,
                }));

                alert("Experience deleted successfully!");
            } else {
                alert("Document does not exist!");
            }
        } catch (error) {
            setError("Error deleting experience: " + error.message);
            console.error("Error deleting experience: ", error);
        }
    };


    if (loading) return <div className="loading-spinner">Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;
    return (
            <section className="admin-sections">
                <div className="content">
                    <div>
                        <h3>Experiences</h3>
                        <div className="panel-contents">
                            {aboutMe.experiences?.map((exp, index) => (
                                <div key={index} className="added-contents">
                                    <h4>{exp.title}</h4>
                                    <p>{exp.duration}</p>
                                    <p>{exp.organization}</p>
                                    <div className="admin-buttons">
                                        <button className="button" onClick={() => setEditingExperience({ ...exp, index })}>Edit</button>
                                        <button className="button" onClick={() => handleDeleteExperience(index)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3>{editingExperience ? 'Edit Experience' : 'Add New Experience'}</h3>
                            <input
                                type="text"
                                value={editingExperience ? editingExperience.title : newExperience.title}
                                onChange={(e) =>
                                    editingExperience
                                        ? setEditingExperience({ ...editingExperience, title: e.target.value })
                                        : setNewExperience({ ...newExperience, title: e.target.value })
                                }
                                placeholder="Title"
                            />
                            <input
                                type="text"
                                value={editingExperience ? editingExperience.duration : newExperience.duration}
                                onChange={(e) =>
                                    editingExperience
                                        ? setEditingExperience({ ...editingExperience, duration: e.target.value })
                                        : setNewExperience({ ...newExperience, duration: e.target.value })
                                }
                                placeholder="Duration"
                            />
                            <input
                                type="text"
                                value={editingExperience ? editingExperience.organization : newExperience.organization}
                                onChange={(e) =>
                                    editingExperience
                                        ? setEditingExperience({ ...editingExperience, organization: e.target.value })
                                        : setNewExperience({ ...newExperience, organization: e.target.value })
                                }
                                placeholder="Organization"
                            />
                            <button
                                className="button"
                                onClick={editingExperience ? handleSaveExperience : handleAddExperience}
                            >
                                {editingExperience ? 'Save Changes' : 'Add Education'}
                            </button>
                            {editingExperience && (
                                <button className="button" onClick={() => setEditingExperience(null)}>Cancel</button>
                            )}
                        </div>

                        <button onClick={handleAddExperience}>Add Experience</button>
                    </div>
                </div>
           
        </section>
    );
};

export default ExperienceSection;