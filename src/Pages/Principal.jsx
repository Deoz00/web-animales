import { useState } from 'react'
//import './App.css'
import '../css/estilos.css';

import Buscador from '../componentes/Buscador.jsx'
import NavB from '../componentes/NavB.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Caru from '../componentes/Caru';
import InicioCard from '../componentes/InicioCard';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import ModalFotos from '../componentes/ModalFotos.jsx';





function Principal() {

  const [name, setName] = useState(null);
  const [modal, setmodal] = useState(false);

  const fotos = (e) => {
 /*  console.log(e); */
   setName(e);
   setmodal(true);
  }
  
  return (
    <>

{/* <NavB className='shadow-lg'/> */}
<Container className='' fluid >
  
  <Row className="justify-content-center m-3">
    <Col md="8">
      
      <Buscador fotos= {fotos} />
      
     
      
      </Col>
   
  </Row>
  <Row className="justify-content-center m-3">
    <Col md="19" className=' '>
      <div className='mt-5'> 
      <InicioCard/>
      </div>
      
      </Col>
   
  </Row>
</Container>


{name != null && <ModalFotos nombre= {name} modalShow = {modal}  /> } 


    </>
  )
}

export default Principal
