import React, { useEffect, useState, useRef } from "react";

//import './App.css'
import '../css/estilos.css';
import { helpHttp } from "../helper/helpHttp.js";
import Buscador from '../componentes/Buscador.jsx'
import NavB from '../componentes/NavB.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Route, Routes, Link, useParams, json } from "react-router-dom"
import Navb from '../componentes/NavB'
import Image from 'react-bootstrap/Image';
import cheerio from 'cheerio';
import Map from '../componentes/Map.jsx';











function Informacion() {

  const [data, setData] = useState({});
  const [dataWiki, setDataWiki] = useState(null);
  const [observations, setObservations] = useState(null);

  const id = useParams().id;






  useEffect(() => {




    const fetchData = async () => {


      const url = 'https://api.inaturalist.org/v1/taxa/' + id;
      helpHttp().get(url).then(async (fetch) => {

        setData(fetch.results[0]);


        // Wikipedia
        const wikipediaUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${fetch.results[0].wikipedia_url.split('/').reverse()[0]}&origin=*`;

        return helpHttp().get(wikipediaUrl);
      }).then((wikipediaData) => {




        const pageId = Object.keys(wikipediaData.query.pages)[0];
        const extract = wikipediaData.query.pages[pageId].extract;


        // Utilizamos Cheerio para cargar el HTML del extracto
        const $ = cheerio.load(extract);

        // Buscamos todos los elementos <p> dentro del extracto
        const paragraphs = $('p').toArray().map(p => $(p).text());



        setDataWiki(paragraphs);

      }).catch((error) => {
        console.error('Error fetching data:', error);
      });




      const observations = await helpHttp().get(`https://api.inaturalist.org/v1/observations?taxon_id=${id}&order=desc&order_by=created_at`);

      setObservations(observations.results);






    }

    fetchData();
  }, [id]);
  return (
    <>
      <Navb search={true} />
      <Container fluid  className="">
    
        <Row className=" m-2 shadow ms-4 me-4 mb-4">
          
          <Col md="4"> 
          
            <h3 className="pt-1">{data.preferred_common_name}</h3>
            <h4>({data.name})</h4>
            {dataWiki && <Row className="overflow-y m-2" >
          <Col  >
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: dataWiki[index] }} />
            ))}
          </Col>
        </Row>}
          </Col>
          <Col className=" p-2"  style={{backgroundColor: "rgb(230, 230, 230)"}}>

            <div className="overflow-x">
            {data.taxon_photos && data.taxon_photos.map((image, index) => (
              <Image key={index} src={image.photo.url.replace(/square/g, "original")} thumbnail style={{ width: '360px', height: '300px', marginBottom: '10px' }} // Ajuste de tamaño con CSS
              />
            ))}
            </div>
          
            
          </Col>
        </Row>


        <Row className="shadow bg-light ms-4 me-4">
          <Col  >


           {/*  <Tabs
              defaultActiveKey="Info"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab act eventKey="Info" title="Info">

                {dataWiki && <div  >
                  {Array.from({ length: 10 }, (_, index) => (
                    <div key={index} dangerouslySetInnerHTML={{ __html: dataWiki[index] }} />
                  ))}
                </div>}

              </Tab>
              <Tab eventKey="Observations" title="Observations">

               


                
              </Tab>

            </Tabs> */}
          </Col>

        </Row>
        {observations && <Map marker={observations} />}


        {/*  {dataWiki && <Row className="overflow-y m-2" >
          <Col  >
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: dataWiki[index] }} />
            ))}
          </Col>
        </Row>} */}

        {/*  <Row className="m-4">

          <Col>

            {observations && <Map marker={observations} />}

          </Col>

        </Row> */}


      </Container>
    </>
  )
}

export default Informacion
