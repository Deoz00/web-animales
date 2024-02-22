import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';


function BuscadorLista({ data, fotos }) {

  return (
    <ListGroup className='lista shadow-lg'>

      {data.map((element, index) => (

        <Link key={index} to={`/especie/${element.id}`}>
          <ListGroup.Item >
            <div className='d-flex'>
              <Image width={75} height={75} src={element.default_photo.square_url == null ? "src/assets/img/image_not_available.png" : element.default_photo.square_url} roundedCircle />
              <p className='mt-auto mb-auto ms-4'> {element.preferred_common_name} ( <i className='cursiva'>{element.name} </i> )</p>
            </div>
          </ListGroup.Item>
        </Link>
      ))}
    </ListGroup>
  );
}

export default BuscadorLista;