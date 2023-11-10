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



function ModalFotos({ nombre, modalShow }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setShow(false);
    setData(null);
  };
  const handleShow = () => setShow(true);

  const [data, setData] = useState(null);



  useEffect(() => {




    const fetchData = async () => {

      setShow(modalShow);
      setLoading(true);
      const url = 'https://api.inaturalist.org/v1/taxa/autocomplete?q=' + nombre;
      const url2 = 'https://api.inaturalist.org/v1/taxa/';


      helpHttp().get(url).then(async (result) => {
       

        const fetch = await helpHttp().get(url2 + result.results[0].id)
        setData(fetch.results[0]);
    

        setTimeout(() => {
         
          setLoading(false);
        }, 2000);

      });

    }

    fetchData();
  }, [nombre]);





  return (



    <>
      
      {data && <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header  closeButton>
          <Modal.Title  >  <i className='cursiva'> {data.name} </i>  </Modal.Title>
        </Modal.Header>
        {loading && <span className="loader m-auto mt-4 mb-4"></span>}
        {!loading && <Modal.Body>

          <Container>
            <Row>

              <Col md={12}>

                {data.taxon_photos.map((e, i) => (
                  <Image key={i} src={e.photo.original_url} thumbnail />
                ))}

              </Col>
            </Row>
          </Container>

        </Modal.Body>}

        <Modal.Footer>
          {data.id}
        </Modal.Footer>
      </Modal>
      }
    </>
  );
}

export default ModalFotos;