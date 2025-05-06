import React from 'react';
import '../App.css'
const HepatitisStats = () => {
  return (
    <div className="stats-container">
      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-number">242.000</div>
          <div className="stat-label">juta meningkat dunia terkena infeksi Hepatitis C</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">50.000</div>
          <div className="stat-label">juta orang terkena Hepatitis C secara kronis</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-number">1.000</div>
          <div className="stat-label">juta orang terinfeksi Hepatitis C pertahun</div>
        </div>
      </div>
      <section className="about-section">
      <div className="about-container">
        <h2 className="about-title">Tentang Heptiscare</h2> 
        <div className="about-content">
          <p className="about-description">
            Heptiscare merupakan website untuk memprediksi kesehatan Anda dengan menggunakan teknologi machine learning 
            dan memberikan informasi terkait faktor klinis yang menyebabkan terinfeksinya Hepatitis C.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3 className="feature-title">Menganalisis Faktor Klinis</h3>
              <p className="feature-text">
                Kami memberikan wawasan terkait faktor resiko secara klinis yang dapat menyebabkan terinfeksi penyakit Hepatitis.
              </p>
            </div>
            <div className="feature-card">
              <span className='machine-learning-img'>
                <h3 className="feature-title">Menggunakan model machine learning</h3>
                <img src='' className=''>
                </img>
                <p className="feature-text">
                Menggunakan algoritma machine learning dengan akurasi yang tinggi mencapai 99% dapat memberikan prediksi yang akurat.
                </p>
                
              </span>
            </div>
          </div>
          <div className="testimonial-container">
            <div className="doctor-image-wrapper">
                <img src='http://pngimg.com/uploads/doctor/doctor_PNG15987.png' alt='Doctor' className="doctor-image"/>
            </div>
            <div className="testimonial-box">
                <blockquote className="testimonial-text">
      "Sayangi tubuh anda, jangan sampai terkena Hepatitis C. Gunakan platform Heptiscare, sebagai deteksi kesehatan 
      karena platform ini menggunakan algoritma machine learning dengan akurasi yang tinggi. Bagi tenaga medis platform 
      ini memudahkan kami untuk mengetahui hasil secara cepat dan akurat."
                </blockquote>
            <p className="testimonial-author">Dr. Galih Hartono Putra</p></div>
        </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default HepatitisStats;