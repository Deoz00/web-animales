import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import '../css/estilos.css';


function ImgDinasty() {
    return (

        <div style={{ position: 'relative' }}>  
        <Image src="https://static.inaturalist.org/photos/51015966/original.jpg" width="200px" height="200px" />
        
        <Image className='imgdinasty' src="https://static.inaturalist.org/photos/51015966/original.jpg" width="200px" height="200px" />

        </div>

    );
}

export default ImgDinasty;