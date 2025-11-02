import { Pagination, Form, Row, Col } from 'react-bootstrap';

function PaginationComponent({ 
  currentPage, 
  pageSize, 
  articlesLength, 
  onPageChange, 
  onPageSizeChange 
}) {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange('prev');
    }
  };

  // Handler untuk tombol "Next"
  const handleNext = () => {
    if (articlesLength === pageSize) {
      onPageChange('next');
    }
  };

  // Handler saat user mengganti ukuran halaman
  const handleSizeChange = (e) => {
    onPageSizeChange(Number(e.target.value));
  };

  // Logika untuk menonaktifkan tombol
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = articlesLength < pageSize;

  return (
    <Row className="my-4 d-flex justify-content-between align-items-center">
      <Col xs="auto">
        <Pagination className="mb-0">
          <Pagination.Prev onClick={handlePrev} disabled={isPrevDisabled} />
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next onClick={handleNext} disabled={isNextDisabled} />
        </Pagination>
      </Col>
      <Col xs="auto" className="d-flex align-items-center">
        <Form.Label htmlFor="pageSizeSelect" className="me-2 mb-0">
          Artikel per halaman:
        </Form.Label>
        <Form.Select 
          id="pageSizeSelect" 
          value={pageSize} 
          onChange={handleSizeChange} 
          style={{ width: 'auto' }}
          aria-label="Pilih jumlah artikel per halaman"
        >
          <option value={9}>9</option>
          <option value={18}>18</option>
          <option value={36}>36</option>
        </Form.Select>
      </Col>
    </Row>
  );
}

export default PaginationComponent;