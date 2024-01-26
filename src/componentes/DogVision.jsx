import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import "../css/estilos.css"
import Tf from './Tf';



const Dogvision = () => {
    const [image, setImage] = useState(null);
    const [predict, setPredict] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [imgPedict, setImgPedict] = useState(false);



    // Manejar cambios en el campo de archivo (input type="file")
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        setImageLoaded(false);
        setPredict(null);
        setImgPedict(null);

        //handleSubmit()
    };

    const handleImageLoaded = () => {

        setImageLoaded(true);
    };

    const setLoadingFalse = () =>{
        setLoading(false);
    };
    




    // Manejar envío del formulario
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true)
        if (!image) {
            alert('Seleccione una imagen antes de enviar');
            return;
        }

        // Crear un objeto FormData para enviar la imagen al servidor
      
        try {
            setImgPedict(null);
            const imageUrl = URL.createObjectURL(image);
            setImgPedict(imageUrl);
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <>
            <Container fluid="sm" className="d-flex flex-column align-items-center justify-content-center">
                <Row className='w-50'>
                    < Col className="d-flex justify-content-center">
                        <Form.Group controlId="formFile w-100" className="mb-3">
                            <Form.Label>Seleccionar Imagen</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />
                        </Form.Group>


                    </Col>

                </Row>


                <Row className=' '>
                    {image && < Col className="d-flex justify-content-center">
                        <Image className='dogVisionIMG ' src={URL.createObjectURL(image)} rounded onLoad={handleImageLoaded} />


                    </Col>}

                </Row>
                <Row className=' mt-4'>
                    {image && < Col className="d-flex justify-content-center w-100">

                        <Button className="align-self-start" onClick={handleSubmit } variant="outline-dark" disabled={isLoading} /* onClick={!isLoading ? handleClick : null} */>
                        
                            {isLoading ? 'Cargando...' : 'Hacer prediccion'}
                            
                        </Button>
                        

                    </Col>}
                </Row>

                
                <Row className=' mt-4'>
                < Col className="d-flex justify-content-center w-100">

                        
                        {/* {predict && <h1> {predict[0]} {predict[1]}% </h1>} */}
                       {imgPedict && <Tf  img={imgPedict}  loading={setLoadingFalse} />}

                    </Col>
                </Row>


            </Container>


        </>
    );
};

export default Dogvision;
