import React, { useRef } from "react";
import '../App.css';
import Navbar from "./Navbar";
import HepatitisStats from "./Tentang";
import FaktorRisiko from "./FaktorResiko";
import ArtikelList from "./ArtikelUser";
import PredictionForm from "./Prediksi";
import Footer from "./Footer";

const Home = () => {
  const prediksiSectionRef = useRef(null);

  const scrollToPrediksi = () => {
    prediksiSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (    
    <div>
      <Navbar/>
      <section className="header-section">
        <div className="header-container">
          <div className="header-text">
            <h1>Prediksi Status Kesehatan Anda, terhadap Penyakit Hepatitis C</h1>
            <p className="tagline">Hepiscare merupakan website untuk memprediksi kesehatan Anda dengan menggunakan teknologi machine learning</p>
            <button onClick={scrollToPrediksi} className="prediction-heptis">
              Cek Kesehatan mu sekarang juga!
            </button>
          </div>
          <div className="logo-container">
            <img src="https://cdn-icons-png.flaticon.com/512/4806/4806200.png" alt="Hepiscare Logo" className="logo-timnile" />
          </div>
          <div className="accuracy-container">
            <div className="accuracy-badge">
              <span>
                <img className="icon-accuracy" src="https://cdn-icons-png.flaticon.com/512/4729/4729465.png" alt="Accuracy Icon"/>
                <span className="accuracy-value">99%</span>
              </span>
              <span className="accuracy-label">Tingkat Akurasi</span>
            </div>
          </div>
        </div>
      </section>

      <section id="tentang">
        <HepatitisStats />
      </section>
      
      <section id="faktor">
        <FaktorRisiko />
      </section>
      
      <section id="artikel">
        <ArtikelList/>
      </section>
      
      <section id='prediksi' ref={prediksiSectionRef}>
        <PredictionForm/>
      </section>
      <section id='contact'>
        <Footer/>
      </section>
    </div>
  );
};

export default Home;