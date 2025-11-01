// src/components/FilterForm.jsx
import { useState } from 'react';
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';

// Komponen ini menerima prop 'onSearch' dari App.jsx
function FilterForm({ onSearch }) {
  // State lokal untuk mengontrol input form
  const [keyword, setKeyword] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah form me-refresh halaman
    
    // Panggil prop onSearch yang dikirim dari App.jsx
    // Kirim objek berisi keyword dan date
    onSearch({ keyword, date }); 
  };

  return (
    // Gunakan Form dari react-bootstrap
    <Form onSubmit={handleSubmit} className="mb-4 p-3 bg-light rounded border">
      <Row className="g-3 align-items-end">
        
        {/* Input 1: Keyword */}
        <Col md={6}>
          {/* FloatingLabel adalah style input yang rapi dari Bootstrap */}
          <FloatingLabel controlId="formKeyword" label="Cari Berita (Keyword)">
            <Form.Control 
              type="text" 
              placeholder="cth: 'react', 'palestina', dll."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)} 
            />
          </FloatingLabel>
        </Col>
        
        {/* Input 2: Date (Ini memenuhi syarat 'validasi HTML5') */}
        <Col md={4}>
          <FloatingLabel controlId="formDate" label="Pilih Tanggal (Opsional)">
            <Form.Control 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FloatingLabel>
        </Col>
        
        {/* Tombol Submit */}
        <Col md={2}>
          <Button variant="primary" type="submit" className="w-100" style={{ height: '58px' }}>
            Cari
          </Button>
        </Col>
      </Row>
      
      {/* Teks bantuan untuk menjelaskan logika API */}
      <Form.Text className="text-muted mt-2 d-block">
        *Pencarian berdasarkan keyword akan otomatis menggunakan endpoint 'everything' dan menonaktifkan filter kategori. Filter tanggal hanya berlaku untuk pencarian keyword.
      </Form.Text>
    </Form>
  );
}

export default FilterForm;