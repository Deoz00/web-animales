import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { helpHttp } from "../helper/helpHttp";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import '../css/estilos.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function ModalFotos({ fotos, mclose }) {
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setShow(false);
    mclose();
  };
  const handleShow = () => setShow(true);



  return (



    <>
      
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header  closeButton>
          <Modal.Title  > Observations   </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Container fluid >
          <Row className="justify-content-center">
        <Col className="text-center">

                {fotos.map((e, i) => (
                  <Image key={i} src={e.url.replace(/square/g, "original")} thumbnail style={{ width: '360px', height: '300px', marginBottom: '10px' }} />
                ))}

              </Col>
            </Row>
          </Container>

        </Modal.Body>

        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
      
    </>
  );
}

export default ModalFotos;