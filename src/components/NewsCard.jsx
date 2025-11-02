import { Card, Button } from 'react-bootstrap';

function formatDateTime(isoString) {
  if (!isoString) return 'Tanggal tidak diketahui';
  try {
    const date = new Date(isoString);
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta'
    }) + ' WIB';
  } catch (error) {
    console.error("Error formatting date:", isoString, error);
    return 'Tanggal tidak valid';
  }
}

function NewsCard({ article }) {
  const { title, description, url, urlToImage, publishedAt, source } = article;
  const imageUrl = urlToImage ? urlToImage : 'https://placehold.co/600x400?text=No+Image';

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={imageUrl} 
        onError={(e) => { 
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