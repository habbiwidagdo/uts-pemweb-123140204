// src/App.jsx
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import FilterForm from './components/FilterForm';
import NewsList from './components/NewsList';
// 1. Import PaginationComponent
import PaginationComponent from './components/PaginationComponent';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 2. Tambahkan 'page' dan 'pageSize' ke state filters
  const [filters, setFilters] = useState({
    keyword: '',
    date: '',
    category: 'general',
    page: 1,       // Halaman saat ini
    pageSize: 18   // Artikel per halaman (default 18, 3 baris x 3 kolom)
  });

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      setArticles([]); 

      let url = '';
      // Ambil 'page' dan 'pageSize' dari state
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
        
        // 3. Tambahkan parameter page dan pageSize ke SEMUA request
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
          // Error 426 = 'pageSize' terlalu besar (max 100) atau 'page' terlalu jauh
          if (response.status === 426) {
             throw new Error("Gagal: Anda sudah mencapai halaman terakhir yang diizinkan oleh API (limit 100 artikel).");
          }
          throw new Error(errorData.message || 'Gagal mengambil data');
        }

        const data = await response.json();
        
        if (data.articles.length === 0) {
          // Jika kita tidak di halaman 1 dan hasilnya 0, berarti kita di halaman "setelah" terakhir
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
  }, [filters]); // 'filters' sudah mencakup 'page' dan 'pageSize'

  // Handler untuk kategori (dari Header)
  const handleCategoryChange = (category) => {
    setFilters(prevFilters => ({
      ...prevFilters, // Pertahankan pageSize
      category: category,
      keyword: '',
      date: '',
      page: 1 // 4. Reset ke halaman 1
    }));
  };

  // Handler untuk pencarian (dari FilterForm)
  const handleSearch = (searchData) => {
    setFilters(prevFilters => ({
      ...prevFilters, // Pertahankan pageSize
      keyword: searchData.keyword,
      date: searchData.date,
      page: 1, // 4. Reset ke halaman 1
    }));
  };

  // 5. Handler baru untuk navigasi halaman
  const handlePageChange = (direction) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: direction === 'prev' ? prevFilters.page - 1 : prevFilters.page + 1
    }));
  };

  // 6. Handler baru untuk ganti ukuran halaman
  const handlePageSizeChange = (size) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      pageSize: size,
      page: 1 // Selalu reset ke halaman 1 saat ganti ukuran
    }));
  };

  // 7. Kondisi untuk menampilkan pagination
  const showPagination = !loading && !error && articles.length > 0;

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
        
        {/* 8. Tampilkan Pagination di ATAS list */}
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
        
        {/* 8. Tampilkan Pagination di BAWAH list */}
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
    </>
  );
}

export default App;