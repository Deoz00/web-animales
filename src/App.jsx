import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'

import './css/estilos.css';

import Buscador from './componentes/Buscador.jsx'
import NavB from './componentes/NavB.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Caru from './componentes/Caru';
import InicioCard from './componentes/InicioCard';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div class="overlay"></div>

      <NavB className='shadow-lg'/>
      <Container fluid >
        <Row className="justify-content-center m-3">
          <Col md="8">
            
            <Buscador/>
           
            
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




    

    </>
  )
}

export default App
