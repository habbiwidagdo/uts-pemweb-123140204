import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import NewsCard from './NewsCard';

function NewsList({ articles, loading, error }) {

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

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {articles.map((article, index) => (
        <Col key={article.url || index}>
          <NewsCard article={article} />
        </Col>
      ))}
    </Row>
  );
}

export default NewsList;