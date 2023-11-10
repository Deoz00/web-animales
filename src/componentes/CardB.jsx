import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Caru from './Caru';

function CardB(props) {
  return (
    <Row xs={1} md={1} className="g-4">
      {props.data.results.especie.map((element, index) => (
        <Col className='shadow-lg' key={index}>
          <Card>
            <Caru  imagenes = {props.dataImg[index]} />
            
            <Card.Body>
              <Card.Title>{element.data.nombre_comun} </Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default CardB;