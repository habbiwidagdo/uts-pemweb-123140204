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

function Header({ onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState('general');
  const handleCategorySelect = (selectedKey) => {
    setActiveCategory(selectedKey);
    onCategoryChange(selectedKey);
  };

  return (
    <Navbar className='navbar-footer' variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">HW News</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            variant="pills"
            activeKey={activeCategory}
            onSelect={handleCategorySelect}
            className="me-auto"
          >
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