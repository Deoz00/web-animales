import ListGroup from 'react-bootstrap/ListGroup';

function BuscadorLista({data}) {
  return (
    <ListGroup className='lista'>
      
      {data.especie.map((element, index) => (
       <ListGroup.Item>
        <div className='d-flex'>
        <img className='pl-4' src={element.data["foto"]} alt="" />
        <p className='mt-auto mb-auto ms-4'> {element.data["nombre_comun"]} ( {element.data["nombre_cientifico"]} )</p>
        
         </div>
          </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default BuscadorLista;