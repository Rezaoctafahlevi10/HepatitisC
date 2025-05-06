import React from 'react';
import '../App.css';


const FaktorRisiko = () => {
  const risikoItems = [
    {
      title: "Penggunaan Jarum Suntik Tidak Steril",
      description: "Berbagi jarum suntik atau peralatan injeksi lainnya merupakan cara paling umum penularan Hepatitis C."
    },
    {
      title: "Prosedur Medis Tidak Aman",
      description: "Transfusi darah tanpa skrining, dialisis ginjal jangka panjang, dan prosedur medis dengan sterilisasi kurang memadai."
    },
    {
      title: "Pekerja Kesehatan",
      description: "Tertusuk jarum yang terkontaminasi darah penderita Hepatitis C."
    },
    {
      title: "Tindik dan Tato",
      description: "Alat yang tidak steril saat membuat tato atau tindik tubuh."
    },
    {
      title: "Ibu ke Anak",
      description: "Penularan dari ibu yang terinfeksi ke bayi selama proses persalinan (risiko 5-6%)."
    },
    {
      title: "Ibu ke Anak",
      description: "Penularan dari ibu yang terinfeksi ke bayi selama proses persalinan (risiko 5-6%)."
    }
  ];

  return (
    <section className="risk-factors">
      <div className="risk-header">
        <h1>Faktor Risiko Hepatitis C</h1>
        <p>Kenali berbagai faktor yang dapat meningkatkan risiko penularan Hepatitis C</p>
      </div>
      
      <div className="risk-container">
        <div className="risk-grid">
          {risikoItems.map((item, index) => (
            <div className="risk-card" key={index}>
              <div className="risk-icon-container">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaktorRisiko;