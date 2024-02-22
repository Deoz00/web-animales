
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Buscador from '../componentes/Buscador.jsx'
import { Link } from 'react-router-dom';


function NavB({ search }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Link to={"/"}>
          <Navbar.Brand className='ms-2' >A</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>


          {search && <div className='ms-4 m-auto  w-50 pt-3'> {/* Mueve el div a la derecha */}
            <Buscador />
          </div>}

        </Navbar.Collapse>


      </Container>
    </Navbar>
  );
}

export default NavB;