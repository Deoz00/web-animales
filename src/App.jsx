import { useState } from 'react'
import { BrowserRouter, Route, Routes, Link, Navigate, useParams } from "react-router-dom"
//import './App.css'
/* import './css/estilos.css'; */
import './Pages/Principal'
import Principal from './Pages/Principal';
import Datos from './Pages/Datos';






function App() {
  

  return (
    
    <BrowserRouter>
   
      <Routes>
        <Route path= "/" element= { <Principal/> } />
        <Route path= "/inicio" element= { <h1>inicio</h1> } />
        <Route path= "/especie/:id" element= { <Datos/> }  />

        <Route path= "*" element= { <Navigate to="/" /> } />
      </Routes>
    </BrowserRouter>

  )
}

export default App
