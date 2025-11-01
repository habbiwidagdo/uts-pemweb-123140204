// src/App.jsx
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import FilterForm from './components/FilterForm';
// 1. Import NewsList (kita tidak perlu import NewsCard di sini)
import NewsList from './components/NewsList';

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
      setArticles([]); 

      let url = '';
      const { keyword, category, date } = filters;

      try {
        if (keyword) {
          console.log(`Mencari berdasarkan KEYWORD: ${keyword}, Tanggal: ${date}`);
          url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${API_KEY}`;
          if (date) {
            url += `&from=${date}&to=${date}`;
          }
        } else {
          console.log(`Mencari berdasarkan KATEGORI: ${category}`);
          url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401) {
             throw new Error("API Key tidak valid. Cek file .env.local Anda dan restart server.");
          }
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

  const handleCategoryChange = (category) => {
    setFilters({
      category: category,
      keyword: '',
      date: '' 
    });
  };

  const handleSearch = (searchData) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      keyword: searchData.keyword,
      date: searchData.date,
    }));
  };

  return (
    <>
      <Header onCategoryChange={handleCategoryChange} />
      
      <Container className="my-4">
        <h2>Portal Berita (NIM: 123140204)</h2>
        <p>Oleh: Habbi Widagdo</p>
        
        <FilterForm onSearch={handleSearch} />
        <hr />
        
        <h3>
          Hasil Berita 
          {filters.keyword ? ` untuk "${filters.keyword}"` : ` (Kategori: ${filters.category})`}
        </h3>
        
        {/* 2. Ganti blok <ul>...</ul> yang lama dengan komponen NewsList.
          Kita kirim state kita sebagai props.
        */}
        <NewsList articles={articles} loading={loading} error={error} />
        
      </Container>
    </>
  );
}

export default App;