import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';
const Base_url = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'
const ArtikelDetail = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${Base_url}/artikel/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Artikel tidak ditemukan</div>;
  }

  return (
    <div className="artikel-detail">
      <h1>{article.judul}</h1>
      <img
              src={`${Base_url}/static/${article.foto}` || 'https://via.placeholder.com/300x200?text=No+Image'}
              alt={article.judul}
              className="artikel-image"
            />
      <p className="tanggal">{new Date(article.tanggal_publikasi).toLocaleDateString()}</p>
      <div className="deskripsi" dangerouslySetInnerHTML={{ __html: article.deskripsi }} />
    </div>
  );
};

export default ArtikelDetail;