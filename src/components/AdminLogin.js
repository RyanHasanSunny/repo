import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AdminLogin.css";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const AdminLogin = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Auto-login if user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        navigate("/admin"); // Redirect to admin panel
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [setIsAuthenticated, navigate]);

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Invalid email format.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      default:
        return "Login failed. Please check your credentials.";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      navigate("/admin");
    } catch (error) {
      setError(getErrorMessage(error.code));
      console.error("Login error: ", error);
    } finally {
      setLoading(false);
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
            autoFocus
            aria-label="Admin Email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Admin Password"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <button type="button" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
