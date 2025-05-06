import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/pages/Admin_layout";
import Home from "../components/Home";
import Login from "../components/pages/Login";
import { ProtectedRouter } from "../components/pages/Login";
import Artikel from "../components/pages/Artikel";
import ChartComponent from "../components/pages/Charts";
import ArtikelDetail from "../components/Detail_artikel";

function AppRoutes() {
  return (
    <Routes>
      {/* Route Publik */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tentang" element={<Home scrollTo="tentang" />} />
      <Route path="/risk-factors" element={<Home scrollTo="faktor" />} />
      <Route path="/articles" element={<Home scrollTo="artikel" />} />
      <Route path="/prediction" element={<Home scrollTo="prediksi" />} />
      <Route path="/contact" element={<Home scrollTo="contact"/>}/>
      <Route path="/artikel/:id" element={<ArtikelDetail/>}/>
      {/* Route Admin */}
      <Route element={<ProtectedRouter />}>
        <Route path="/home" element={<AdminLayout />}>
          <Route index element={<ChartComponent />} />
          <Route path="artikel" element={<Artikel />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;