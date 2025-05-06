import '../App.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const ArtikelList = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;

  const artikelContainerRef = useRef(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const [articlesRes, countRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/artikel?page=${currentPage}&limit=${itemsPerPage}`),
          axios.get(`${API_BASE_URL}/artikel/count`)
        ]);
        if (!articlesRes.data.data || typeof countRes.data.total === 'undefined') {
          throw new Error('Invalid API response structure');
        }
        setArticles(articlesRes.data.data);
        setTotalPages(Math.ceil(countRes.data.total / itemsPerPage));
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Gagal memuat artikel. Silakan coba lagi.');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [currentPage]);

  const handleReadMore = (articleId) => {
    window.open(`/artikel/${articleId}`, '_blank');
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      artikelContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('...');
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    return pages.map((page, index) =>
      page === '...'
        ? <span key={`dots-${index}`} className="dots">...</span>
        : <button
            key={page}
            onClick={() => goToPage(page)}
            className={`page-btn ${currentPage === page ? 'active' : ''}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Memuat artikel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Coba Lagi</button>
      </div>
    );
  }

  if (articles.length === 0) {
    return <div className="empty-message">Tidak ada artikel tersedia.</div>;
  }

  return (
    <div className="artikel-container" ref={artikelContainerRef}>
      <h1 className="artikel-title">Daftar Artikel</h1>

      <div className="artikel-list">
        {articles.map((article) => (
          <article key={article.id_artikel} className="artikel-card">
            <img
              src={article.foto ? `${API_BASE_URL}/static/${article.foto}` : 'https://via.placeholder.com/300x200?text=No+Image'}
              alt={article.judul}
              className="artikel-image"
            />
            <div className="artikel-content">
              <h2 className="artikel-judul">{article.judul}</h2>
              <time className="artikel-tanggal" dateTime={article.tanggal_publikasi}>
                {new Date(article.tanggal_publikasi).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <div className="artikel-preview">
                {article.deskripsi
                  ? article.deskripsi.substring(0, 150) + '...'
                  : 'Tidak ada deskripsi tersedia.'}
              </div>
              <button
                onClick={() => handleReadMore(article.id_artikel)}
                className="read-more-btn"
                aria-label={`Baca selengkapnya tentang ${article.judul}`}
              >
                Baca Selengkapnya
              </button>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="pagination" aria-label="Navigasi halaman artikel">
          <div className="page-numbers">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-btn"
            >
              «
            </button>

            {renderPageNumbers()}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="page-btn"
            >
              »
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default ArtikelList;
