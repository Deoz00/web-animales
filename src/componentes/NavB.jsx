
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Buscador from '../componentes/Buscador.jsx'
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NavB({ search }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary p-0">
      <Container fluid className=''>

        <Col xs="2">
          <Link to={"/"}>
            <Navbar.Brand className='ms-2' >A</Navbar.Brand>
          </Link>



        </Col>




        <Col xs="10">

          {search && <div className='m-2  p-0 w-75'> {/* Mueve el div a la derecha */}
            <Buscador />
          </div>}

        </Col>


      </Container>
    </Navbar>
  );
}

export default NavB;