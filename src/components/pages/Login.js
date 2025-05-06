import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate, Outlet } from "react-router-dom";  

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.status === 200) {
        login(data.token);
        setMessage("Login berhasil! Mengarahkan ke dashboard...");
        setMessageType("success");
        navigate('/home')
      } else {
        setMessage(data.message || "Username atau password salah");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Gagal menghubungi server.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {message && (
        <p style={{
          ...styles.message,
          backgroundColor: messageType === "error" ? "#ffcccc" : "#ccffcc",
          color: messageType === "error" ? "red" : "green",
        }}>
          {message}
        </p>
      )}
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
          disabled={loading}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "300px",
    margin: "150px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40px",
  },
  message: {
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
  },
};

export default Login;

export const ProtectedRouter = () => {
  const { token } = useAuth();
  console.log("Token dari useAuth():", token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
