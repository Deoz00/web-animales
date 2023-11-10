import React, { useEffect, useState, useRef } from "react";

//import './App.css'
import '../css/estilos.css';
import { helpHttp } from "../helper/helpHttp";
import Buscador from '../componentes/Buscador.jsx'
import NavB from '../componentes/NavB.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Caru from '../componentes/Caru';
import InicioCard from '../componentes/InicioCard';
import { BrowserRouter, Route, Routes, Link, useParams } from "react-router-dom"








function Datos() {

  const [data, setData] = useState({});

  const id = useParams().id;

 




  useEffect(() => {

   


    const fetchData = async () => {

        
        const url = 'https://api.inaturalist.org/v1/taxa/autocomplete?q='+id;
        

        const url2 = 'https://api.inaturalist.org/v1/taxa/';
        

         helpHttp().get(url).then( async (result) =>{
          console.log(result);

          const fetch = await helpHttp().get(url2 + result.results[0].id)
          setData(fetch.results[0]);
          console.log(fetch.results[0]);

         } );
        

       
       

     
    }

    fetchData();
}, []);
  return (
    <>
      <h2> params  especie   {useParams().id} </h2>
      <h2> fetch especie {data.name}</h2>
    </>
  )
}

export default Datos
