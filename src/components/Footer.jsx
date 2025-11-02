import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="py-4 mt-auto navbar-footer">
      <Container className="text-center">
        <small>
          &copy; {new Date().getFullYear()} Habbi Widagdo (123140204) - UTS Pengembangan Aplikasi Web
        </small>
      </Container>
    </footer>
  );
}

export default Footer;
