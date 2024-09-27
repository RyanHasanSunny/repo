import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AdminLogin.css";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const AdminLogin = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      navigate("/admin")
    } catch (error) {
      setError(error.message);
      console.error("Login error: ", error);
    }
  };

  return (
    <section className="loginpanel">
      <div className="logincontents">
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          
        <button onClick={() => navigate("/")}>Back to Home</button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
