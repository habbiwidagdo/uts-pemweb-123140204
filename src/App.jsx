// src/App.jsx
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

// 1. Import CSS kustom kita
import './App.css'; 

import Header from './components/Header';
import FilterForm from './components/FilterForm';
import NewsList from './components/NewsList';
import PaginationComponent from './components/PaginationComponent';
// 2. Import Footer
import Footer from './components/Footer';


const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    keyword: '',
    date: '',
    category: 'general',
    page: 1,
    pageSize: 18
  });

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      setArticles([]); 

      let url = '';
      const { keyword, category, date, page, pageSize } = filters;

      try {
        if (keyword) {
          console.log(`Mencari KEYWORD: ${keyword}, Halaman: ${page}`);
          url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${API_KEY}`;
          if (date) {
            url += `&from=${date}&to=${date}`;
          }
        } else {
          console.log(`Mencari KATEGORI: ${category}, Halaman: ${page}`);
          url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
        }
        
        url += `&page=${page}&pageSize=${pageSize}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401) {
             throw new Error("API Key tidak valid. Cek file .env.local Anda dan restart server.");
          }
          if (response.status === 429) {
             throw new Error("Gagal: Anda telah mencapai limit request harian (100) untuk API key gratis.");
          }
          if (response.status === 426) {
             throw new Error("Gagal: Anda sudah mencapai halaman terakhir yang diizinkan oleh API (limit 100 artikel).");
          }
          throw new Error(errorData.message || 'Gagal mengambil data');
        }

        const data = await response.json();
        
        if (data.articles.length === 0) {
          if (page > 1) {
            setError("Anda sudah berada di halaman terakhir.");
          } else {
            setError("Tidak ada artikel yang ditemukan untuk kriteria ini.");
          }
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
    setFilters(prevFilters => ({
      ...prevFilters,
      category: category,
      keyword: '',
      date: '',
      page: 1
    }));
  };

  const handleSearch = (searchData) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      keyword: searchData.keyword,
      date: searchData.date,
      page: 1,
    }));
  };

  const handlePageChange = (direction) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: direction === 'prev' ? prevFilters.page - 1 : prevFilters.page + 1
    }));
  };

  const handlePageSizeChange = (size) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      pageSize: size,
      page: 1
    }));
  };

  const showPagination = !loading && !error && articles.length > 0;

  return (
    // 3. Wrapper ini membuat layout flex kolom setinggi 100vh
    // Ini penting agar footer menempel di bawah (sticky footer)
    <div className="d-flex flex-column min-vh-100">
      <Header onCategoryChange={handleCategoryChange} />
      
      {/* 4. 'flex-grow-1' membuat konten ini mengambil sisa ruang, mendorong footer ke bawah */}
      <main className="flex-grow-1">
        
        {/* 5. Terapkan className 'main-container' dari App.css */}
        <Container className="my-4 main-container">
          <h2>Portal Berita Dunia</h2>
          <p>Oleh: Habbi Widagdo (123140204)</p>
          
          <FilterForm onSearch={handleSearch} />
          <hr />
          
          <h3>
            Hasil Berita 
            {filters.keyword ? ` untuk "${filters.keyword}"` : ` (Kategori: ${filters.category})`}
          </h3>
          
          {showPagination && (
            <PaginationComponent
              currentPage={filters.page}
              pageSize={filters.pageSize}
              articlesLength={articles.length}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
          
          <NewsList articles={articles} loading={loading} error={error} />
          
          {showPagination && (
            <PaginationComponent
              currentPage={filters.page}
              pageSize={filters.pageSize}
              articlesLength={articles.length}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
          
        </Container>
      </main>
      
      {/* 6. Tampilkan Footer di sini */}
      <Footer />
    </div>
  );
}

export default App;
