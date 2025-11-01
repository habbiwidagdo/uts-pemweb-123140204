// src/components/NewsCard.jsx
import { Card, Button } from 'react-bootstrap';

// Fungsi helper untuk memformat tanggal (ISO String) menjadi lebih mudah dibaca
function formatDateTime(isoString) {
  if (!isoString) return 'Tanggal tidak diketahui';
  try {
    const date = new Date(isoString);
    // Format: "1 Nov 2025, 20:30 WIB"
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta' // Sesuaikan dengan zona waktu lokal Anda
    }) + ' WIB';
  } catch (error) {
    console.error("Error formatting date:", isoString, error);
    return 'Tanggal tidak valid';
  }
}

// Komponen ini menerima satu prop 'article' yang berisi detail satu berita
function NewsCard({ article }) {
  // Destructuring object article agar lebih mudah digunakan
  const { title, description, url, urlToImage, publishedAt, source } = article;

  // URL Gambar placeholder jika 'urlToImage' tidak ada (null)
  const imageUrl = urlToImage ? urlToImage : 'https://placehold.co/600x400?text=No+Image';

  return (
    // Gunakan Card dari react-bootstrap
    // 'h-100' (height 100%) agar semua card dalam satu baris sama tinggi
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={imageUrl} 
        onError={(e) => { 
          // Fallback jika URL gambar error (misal 404)
          e.target.onerror = null; 
          e.target.src = 'https://placehold.co/600x400?text=Image+Error'; 
        }}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Oleh: {source.name || 'Tidak diketahui'}
        </Card.Subtitle>
        <Card.Text>
          {description ? description.substring(0, 100) + '...' : 'Tidak ada deskripsi.'}
        </Card.Text>
        
        {/* 'mt-auto' mendorong tombol dan footer ke bagian bawah card */}
        <Button 
          variant="primary" 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-auto"
        >
          Baca Selengkapnya
        </Button>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          Dipublikasikan: {formatDateTime(publishedAt)}
        </small>
      </Card.Footer>
    </Card>
  );
}

export default NewsCard;