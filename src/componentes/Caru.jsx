import Carousel from 'react-bootstrap/Carousel';

import 'bootstrap/dist/css/bootstrap.min.css';

function Caru(props) {


 

  return (
    <Carousel data-bs-theme="dark">


{props.imagenes && props.imagenes.results.length > 0 ? (
    props.imagenes.results.map((img, index) => (

     
      <Carousel.Item key={index}>
        <img
          className="carousel-image "
         // src={img.photos[0].url}
          src={ img.photos[0].url.replace(/square/g, "original")}
          alt={`Slide ${index}`}
        />
        <Carousel.Caption>
          {/* Puedes agregar texto de leyenda si es necesario */}
        </Carousel.Caption>
      </Carousel.Item>
    ))
  ) : (
    // Agregar un elemento predeterminado si props.imagenes está vacío
    <Carousel.Item>
      <img
        className="carousel-image"
        src="src/assets/img/image_not_available.png" // Reemplaza con tu imagen predeterminada
        alt="Slide por defecto"
      />
      <Carousel.Caption>
        {/* Puedes agregar texto de leyenda para el slide por defecto si es necesario */}
      </Carousel.Caption>
    </Carousel.Item>
  )}


     
    
    </Carousel>
  );
}

export default Caru;

