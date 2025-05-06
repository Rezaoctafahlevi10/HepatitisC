import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("isLoggedIn");
      setLoading(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      {loading && <div className="loading">Loading...</div>}
      <div className="admin-container">
        <div className="sidebar">
          <div>
            <div className="logo">Admin</div>
            <ul>
              <li>
                <Link to="/home">📊 Dashboard</Link>
              </li>
              <li>
                <Link to="/home/artikel">👤 Artikel</Link>
              </li>
              <li>
                <Link to="/home/statistics">📈 Statistik</Link>
              </li>
              <li>
                <Link to="/home/reports">📑 Reports</Link>
              </li>
            </ul>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
