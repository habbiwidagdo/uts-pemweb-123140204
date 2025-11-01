// src/components/NewsList.jsx
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import NewsCard from './NewsCard'; // Import komponen card yang baru kita buat

// Ini adalah komponen yang menangani logika tampilan list
function NewsList({ articles, loading, error }) {
  
  // 1. Tampilkan Spinner saat loading
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Sedang memuat berita...</p>
      </div>
    );
  }

  // 2. Tampilkan Alert jika ada error
  if (error) {
    return (
      <Alert variant="danger" className="my-4">
        <Alert.Heading>Oops! Terjadi Kesalahan</Alert.Heading>
        <p>{error}</p>
        <p className="mb-0">
          Ini mungkin terjadi karena API key Anda habis limit (100 request/hari) 
          atau masalah jaringan.
        </p>
      </Alert>
    );
  }

  // 3. Tampilkan grid berita jika data berhasil dimuat
  return (
    // 'g-4' (gap 4) memberi jarak antar card
    <Row xs={1} md={2} lg={3} className="g-4">
      {articles.map((article, index) => (
        // Tentukan ukuran kolom untuk layar (responsive)
        // 'key' harus unik, kita gunakan 'article.url' atau 'index' sebagai fallback
        <Col key={article.url || index}>
          <NewsCard article={article} />
        </Col>
      ))}
    </Row>
  );
}

export default NewsList;