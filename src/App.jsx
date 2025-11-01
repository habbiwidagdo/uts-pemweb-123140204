// src/App.jsx
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

// 1. Import komponen Header
import Header from './components/Header';
// import FilterForm from './components/FilterForm';
// import NewsList from './components/NewsList';

// Ambil API Key dari environment variable
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State untuk filter
  const [filters, setFilters] = useState({
    keyword: '', // Kosongkan keyword di awal
    date: '',
    category: 'general' // Kategori default saat pertama kali load
  });

  // useEffect untuk fetch data saat 'filters' berubah
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      let url = '';
      const { keyword, category, date } = filters;

      try {
        if (keyword) {
          // 2. LOGIKA BARU: Jika ada keyword, prioritas pencarian ke endpoint 'everything'
          console.log(`Mencari berdasarkan KEYWORD: ${keyword}`);
          url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${API_KEY}`;
          if (date) {
            // Filter tanggal HANYA berlaku untuk endpoint 'everything'
            url += `&from=${date}&to=${date}`;
          }
        } else {
          // 3. LOGIKA BARU: Jika tidak ada keyword, gunakan 'top-headlines' berdasarkan kategori
          console.log(`Mencari berdasarkan KATEGORI: ${category}`);
          url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
          // Endpoint 'top-headlines' di plan gratis TIDAK mendukung filter tanggal
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          // Cek jika error karena API key (401)
          if (response.status === 401) {
             throw new Error("API Key tidak valid. Cek file .env.local Anda dan restart server.");
          }
          throw new Error(errorData.message || 'Gagal mengambil data');
        }

        const data = await response.json();
        
        // Cek jika hasil pencarian kosong
        if(data.articles.length === 0) {
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
  }, [filters]); // Dependency array: jalankan effect ini jika 'filters' berubah

  // 4. Fungsi yang akan kita kirim sebagai PROP ke Header
  const handleCategoryChange = (category) => {
    setFilters({
      category: category,
      keyword: '', // Kosongkan keyword saat ganti kategori
      date: '' // Kosongkan tanggal juga (karena top-headlines tdk support)
    });
  };

  return (
    <>
      {/* 5. Tampilkan komponen Header dan kirim prop onCategoryChange */}
      <Header onCategoryChange={handleCategoryChange} />
      
      <Container className="my-4">
        <h2>Portal Berita (NIM: 123140204)</h2>
        
        {/* <FilterForm onSearch={(searchFilters) => setFilters(prev => ({...prev, ...searchFilters}))} /> */}

        {/* Nanti kita akan pindahkan ini ke NewsList.jsx */}
        <hr />
        <h3>Hasil Berita (Kategori: {filters.category})</h3>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {!loading && !error && (
          <ul>
            {articles.map((article, index) => (
              <li key={article.url || index}> {/* Gunakan URL sebagai key unik */}
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
                <p>Sumber: {article.source.name}</p>
              </li>
            ))}
          </ul>
        )}
        
        {/* <NewsList articles={articles} loading={loading} error={error} /> */}

      </Container>
    </>
  );
}

export default App;