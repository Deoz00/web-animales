import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../css/estilos.css';
import Icard from './Icard';
import especies from '../helper/especies.json';




function InicioCard() {


  return (

    
    <Row xs={1} md={4} className="g-4">
      { especies.especies.map ((especies, index) =>(
        <Col key={index}>
        <Icard  foto={especies.foto}  nombre={especies.nombre} nombre_cientifico={especies.nombre_cientifico}  descripcion={especies.descripcion}/>
       </Col>
      ) ) }
        
      
    </Row>
  );
}

export default InicioCard;