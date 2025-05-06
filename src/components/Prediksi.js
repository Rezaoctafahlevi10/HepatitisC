import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { div } from 'framer-motion/client';
import '../App.css';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    Age: '',
    Sex: '',
    ALB: '',
    ALP: '',
    ALT: '',
    AST: '',
    BIL: '',
    CHE: '',
    CHOL: '',
    CREA: '',
    GGT: '',
    PROT: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const numericData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
      );
      const response = await axios.post('http://localhost:5000/predict', numericData);
      const prediction = response.data.prediction;
      if (prediction === 'SEHAT') {
        Swal.fire({
          icon: 'success',
          title: 'Hasil Prediksi',
          html: '<b>Status:</b> SEHAT C<br/>Tetap jaga tubuh anda!',
          confirmButtonColor: '#4caf50',
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Hasil Prediksi',
          html: '<b>Status:</b> INFEKSI HEPATITIS C<br/>Segera konsultasikan diri ke dokter untuk penanganan lebih lanjut.',
          confirmButtonColor: '#d33',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal memproses prediksi. Pastikan server berjalan.',
      });
    }
  };

  return (
    <div className="container-prediction">
      <div className="prediction-form">
        <h2>Form Prediksi Hepatitis C</h2>
          <p> Sex : 0= Laki - laki 1=Perempuan</p><br>
          </br>
        <form className='from-grup' onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label>{key}:</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              placeholder="Masukkan angka"
            />
          </div>
        ))}
      <button  type="submit">
          Prediksi
      </button>
      </form>
    </div>
    </div>
    
  );
};

export default PredictionForm;
