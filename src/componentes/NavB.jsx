
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
function NavB() {
  return (
    <>
        <Navbar expand="lg" >
      <Container fluid className='ms-4 mb-4'>
        <Navbar.Brand href="#home"></Navbar.Brand>
       
      </Container>
    </Navbar>
      
    </>
  );
}

export default NavB;