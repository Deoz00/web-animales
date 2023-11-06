import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../css/estilos.css';

function InicioCard() {
  return (
    <Row xs={1} md={4} className="g-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <Col key={idx} className=''>
          <Card  >
            <Card.Img className='cardImg' variant="top" src="src/assets/img/BG.jpg" />
            <Card.Body > 
              <Card.Title>Card title</Card.Title>
              <Card.Text className=''>
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

export default InicioCard;