import { useState } from 'react'
import { BrowserRouter, Route, Routes, Link, Navigate, useParams } from "react-router-dom"
//import './App.css'
/* import './css/estilos.css'; */
import './Pages/Principal'
import Principal from './Pages/Principal';
import { ModelContextProvider } from './context/ModelContext';
import Info from './Pages/Info';



function App() {
  
 <navb/>
  return (

    
    
    <BrowserRouter>
   <ModelContextProvider>
      <Routes>
        <Route path= "/" element= { <Principal/> } />
        <Route path= "/inicio" element= { <h1>inicio</h1> } />
        <Route path= "/especie/:id" element= { <Info/> }  />

        <Route path= "*" element= { <Navigate to="/" /> } />
      </Routes>
      </ModelContextProvider>


    </BrowserRouter>

  )
}

export default App
