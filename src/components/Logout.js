import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';


const AuthComponent = ({ setIsAuthenticated }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      console.log("Successfully logged out");
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AuthComponent;
