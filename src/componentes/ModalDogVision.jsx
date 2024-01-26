import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dogvision from './DogVision';

const ModalDogVision = () => {
    const values = [true];
   // const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down']; original
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
  
    function handleShow(breakpoint) {
      setFullscreen(breakpoint);
      setShow(true);
    }






    return (
        <>
          {values.map((v, idx) => (
            <Button variant="" key={idx} className="" onClick={() => handleShow(v)}>
              Dog Vision
              {typeof v === 'string' && `below ${v.split('-')[0]}`}
            </Button>
          ))}
          <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Dog vision</Modal.Title>
            </Modal.Header>
            <Modal.Body> <Dogvision/> </Modal.Body>
          </Modal>
        </>
      );
}

export default ModalDogVision;