// src/components/Header.jsx
import { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

// Daftar kategori yang didukung oleh endpoint 'top-headlines' NewsAPI
const categories = [
  { name: 'General', value: 'general' },
  { name: 'Technology', value: 'technology' },
  { name: 'Business', value: 'business' },
  { name: 'Sports', value: 'sports' },
  { name: 'Health', value: 'health' },
  { name: 'Science', value: 'science' },
  { name: 'Entertainment', value: 'entertainment' },
];

// Komponen Header menerima prop 'onCategoryChange' dari App.jsx
function Header({ onCategoryChange }) {
  // Kita gunakan state lokal untuk menandai kategori mana yang sedang aktif
  const [activeCategory, setActiveCategory] = useState('general');

  const handleCategorySelect = (selectedKey) => {
    // 1. Update state lokal untuk highlight di Navbar
    setActiveCategory(selectedKey);
    // 2. Panggil fungsi prop untuk mengirim kategori yang dipilih ke App.jsx
    onCategoryChange(selectedKey);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Anda bisa ganti nama portal dan NIM di sini */}
        <Navbar.Brand href="#home">Habbi News (204)</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            variant="pills"
            activeKey={activeCategory}
            onSelect={handleCategorySelect}
            className="me-auto"
          >
            {/* Kita render daftar kategori secara dinamis */}
            {categories.map((cat) => (
              <Nav.Link key={cat.value} eventKey={cat.value} href={`#${cat.value}`}>
                {cat.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;