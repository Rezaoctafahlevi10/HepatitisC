import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Membuat context untuk autentikasi
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  // 🔹 useEffect untuk menyinkronkan state token dengan localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]); // Akan dijalankan setiap token berubah

  const login = (newToken) => {
    setToken(newToken);
    navigate("/home");
  };

  const logout = () => {
    setToken(null);
    navigate("/login", { replace: true }); 
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Untuk mengakses autentikasi di komponen lain
export const useAuth = () => {
  return useContext(AuthContext);
};
