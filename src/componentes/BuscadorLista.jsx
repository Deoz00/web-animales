import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';

function BuscadorLista({ data, fotos }) {

  return (
    <ListGroup className='lista shadow-lg'>

      {data.especie.map((element, index) => (

        <a key={index} onClick={ () => fotos(element.data["nombre_cientifico"]) } >
          <ListGroup.Item>

            <div className='d-flex'>

              <Image width={75} height={75} src={element.data["foto"]==null?"src/assets/img/image_not_available.png":element.data["foto"]} roundedCircle />
              <p className='mt-auto mb-auto ms-4'> {element.data["nombre_comun"]} ( <i className='cursiva'>{element.data["nombre_cientifico"]} </i> )</p>

            </div>
          </ListGroup.Item>

          </a>
      ))}
    </ListGroup>
  );
}

export default BuscadorLista;