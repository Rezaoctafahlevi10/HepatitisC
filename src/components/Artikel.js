import React, { useEffect, useState } from "react";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/artikel") // Pastikan API Flask berjalan
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section id="articles" className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Artikel Kesehatan</h2>
      
      {loading ? (
        <p className="text-center text-gray-500">Memuat artikel...</p>
      ) : articles.length > 0 ? (
        <div className="space-y-6">
          {articles.map((article) => (
            <article key={article.id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">{article.judul}</h3>
              <p className="text-gray-700">{article.deskripsi}</p>
              <img 
                src={article.link} 
                alt={article.judul} 
                className="mt-2 w-full h-auto rounded-md"
              />
              <p className="text-sm text-gray-500 mt-2">Dibuat pada: {article.created_date}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Belum ada artikel tersedia.</p>
      )}
    </section>
  );
}

export default Articles;
