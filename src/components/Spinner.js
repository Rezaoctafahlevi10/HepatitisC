import React, { useState, useEffect } from "react";

const Spinner = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate loading for 3 seconds
  }, []);

  return (
    <div className="spinner-container">
      {loading ? (
        <div className="spinner"></div> // Spinner
      ) : (
        <p>Data telah dimuat!</p>
      )}
    </div>
  );
};

export default Spinner;
