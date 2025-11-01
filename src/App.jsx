// src/App.jsx
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
// 1. Import FilterForm
import FilterForm from './components/FilterForm';
// import NewsList from './components/NewsList';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    keyword: '',
    date: '',
    category: 'general'
  });

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      setArticles([]); // Kosongkan artikel saat loading

      let url = '';
      const { keyword, category, date } = filters;

      try {
        if (keyword) {
          // Logika jika ADA KEYWORD (dari FilterForm)
          console.log(`Mencari berdasarkan KEYWORD: ${keyword}, Tanggal: ${date}`);
          url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${API_KEY}`;
          if (date) {
            url += `&from=${date}&to=${date}`;
          }
        } else {
          // Logika jika TIDAK ADA KEYWORD (dari Header)
          console.log(`Mencari berdasarkan KATEGORI: ${category}`);
          url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401) {
             throw new Error("API Key tidak valid. Cek file .env.local Anda dan restart server.");
          }
          // Tangani error jika API key habis limit (429)
          if (response.status === 429) {
             throw new Error("Gagal: Anda telah mencapai limit request harian (100) untuk API key gratis.");
          }
          throw new Error(errorData.message || 'Gagal mengambil data');
        }

        const data = await response.json();
        
        if (data.articles.length === 0) {
          setError("Tidak ada artikel yang ditemukan untuk kriteria ini.");
        } else {
          setArticles(data.articles);
        }

      } catch (err) {
        setError(err.message);
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [filters]); 

  // Handler untuk kategori (dari Header)
  const handleCategoryChange = (category) => {
    setFilters({
      category: category,
      keyword: '', // Kosongkan keyword saat ganti kategori
      date: '' 
    });
  };

  // 2. Handler untuk pencarian (dari FilterForm)
  const handleSearch = (searchData) => {
    // searchData adalah objek { keyword, date }
    setFilters(prevFilters => ({
      ...prevFilters,
      keyword: searchData.keyword,
      date: searchData.date,
      // Jika user mencari (mengisi keyword), kita nonaktifkan 'category'
      // agar logika di useEffect memprioritaskan 'keyword'.
      // Kita set category ke 'general' (atau string kosong) 
      // agar tidak membingungkan, tapi keyword akan tetap jadi prioritas.
      // Kita biarkan saja state category apa adanya, 
      // karena 'if (keyword)' di useEffect sudah menangani prioritas.
    }));
  };


  return (
    <>
      <Header onCategoryChange={handleCategoryChange} />
      
      <Container className="my-4">
        <h2>Portal Berita (NIM: 123140204)</h2>
        
        {/* 3. Tampilkan komponen FilterForm dan kirim prop onSearch */}
        <FilterForm onSearch={handleSearch} />

        <hr />
        
        {/* 4. Judul dinamis berdasarkan filter yang aktif */}
        <h3>
          Hasil Berita 
          {filters.keyword ? ` untuk "${filters.keyword}"` : ` (Kategori: ${filters.category})`}
        </h3>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {!loading && !error && (
          <ul>
            {articles.map((article, index) => (
              <li key={article.url || index}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
                <p>Sumber: {article.source.name}</p>
              </li>
            ))}
          </ul>
        )}
        
      </Container>
    </>
  );
}

export default App;