import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("pasienData");
    return savedData ? JSON.parse(savedData) : { Total: 0, Sehat: 0, Terinfeksi: 0 };
  });

  useEffect(() => {
    setLoading(true);

    axios.get("http://127.0.0.1:5000/ListDataPasien")
      .then(response => {
        const result = response.data;
        if (!result || Object.keys(result).length === 0) {
          throw new Error("Data tidak ditemukan");
        }
        setData(result);
        localStorage.setItem("pasienData", JSON.stringify(result));
        setChartData({
          labels: ["Sehat", "Terinfeksi"],
          datasets: [
            {
              label: "Jumlah Pasien",
              data: [result["Sehat"] || 0, result["Terinfeksi"] || 0],
              backgroundColor: ["#2ecc71", "#e74c3c"],
            }
          ]
        });
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        const savedData = localStorage.getItem("pasienData");
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setData(parsedData);
          setChartData({
            labels: ["Sehat", "Terinfeksi"],
            datasets: [
              {
                label: "Jumlah Pasien",
                data: [parsedData["Sehat"] || 0, parsedData["Terinfeksi"] || 0],
                backgroundColor: ["#2ecc71", "#e74c3c"],
              }
            ]
          });
        }
        setLoading(false);
      });
  }, []);
  return (
    <div className="container">
      <div className="header">
        <h2>Dashboard</h2>
      </div>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Pasien</h3>
          <p>{data?.Total || 0}</p>
        </div>
        <div className="card">
          <h3>Sehat</h3>
          <p>{data?.Sehat || 0}</p>
        </div>
        <div className="card">
          <h3>Terinfeksi</h3>
          <p>{data?.Terinfeksi || 0}</p>
        </div>
      </div>
      <div className="chart-container">
        <h3>Grafik Statistik</h3>
        {loading ? <p>Loading...</p> : chartData ? <Bar data={chartData} /> : <p>Data tidak tersedia</p>}
      </div>
    </div>
  );
};

export default ChartComponent;
