import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../css/estilos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Icard( {foto, nombre, nombre_cientifico, descripcion} ) {
  return (
    <Card className='icard shadow-sm' >
            <Card.Img  width={300} height={250} className='cardImg shadow-sm' variant="top" src={foto}     alt={nombre} />
            <Card.Body > 
              <Card.Title style={{  overflow: 'hidden' }}> {nombre}  ( <i className='cursiva'>{nombre_cientifico}</i>) </Card.Title>
              <Card.Text style={{height: '110px' }} >
                {descripcion}
              </Card.Text>
            </Card.Body>
          </Card>
  );
}

export default Icard;