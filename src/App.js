import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes"; 
import { AuthProvider } from "./components/context/AuthContext";

function App() {
  return (
      <Router>
        <AuthProvider> {}
          <AppRoutes />
        </AuthProvider>
      </Router>
  );
}

export default App;
