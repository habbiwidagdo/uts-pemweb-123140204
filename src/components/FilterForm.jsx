import { useState } from 'react';
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';

// Komponen ini menerima prop 'onSearch' dari App.jsx
function FilterForm({ onSearch }) {
  // State lokal untuk mengontrol input form
  const [keyword, setKeyword] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah form me-refresh halaman
    onSearch({ keyword, date }); 
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 p-3 form rounded border">
      <Row className="g-3 align-items-end">
        <Col md={6}>
          <FloatingLabel controlId="formKeyword" label="Cari Berita (Keyword)">
            <Form.Control 
              type="text" 
              placeholder="cth: 'react', 'palestina', dll."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)} 
            />
          </FloatingLabel>
        </Col>
        <Col md={4}>
          <FloatingLabel controlId="formDate" label="Pilih Tanggal (Opsional)">
            <Form.Control 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <Button variant="primary" type="submit" className="w-100" style={{ height: '58px' }}>
            Cari
          </Button>
        </Col>
      </Row>
      <Form.Text className="text-muted mt-2 d-block">
        *Pencarian berdasarkan keyword akan otomatis menggunakan endpoint 'everything' dan menonaktifkan filter kategori. Filter tanggal hanya berlaku untuk pencarian keyword.
      </Form.Text>
    </Form>
  );
}

export default FilterForm;