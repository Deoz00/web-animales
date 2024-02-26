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
import Navb from '../componentes/NavB.jsx'
import Image from 'react-bootstrap/Image';
import cheerio from 'cheerio';
import Map from '../componentes/Map.jsx';
import { Helmet } from 'react-helmet';
import { Concepto, Relacion } from "../componentes/Cuadro.jsx";




function Info() {

  const [data, setData] = useState(null);
  const [dataWiki, setDataWiki] = useState(null);
  const [observations, setObservations] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = index => {
    setLoadedImages(prevState => ({
      ...prevState,
      [index]: true
    }));
  };

  const id = useParams().id;






  useEffect(() => {


    setData(null);
    setDataWiki(null);
    setObservations(null);
    setLoadedImages({});

    const fetchData = async () => {


      const url = 'https://api.inaturalist.org/v1/taxa/' + id + '?&locale=es';
      //const url = `https://api.inaturalist.org/v1/taxa?taxon_id=${id}&locale=es&order=desc`
      ;
      helpHttp().get(url).then(async (fetch) => {

        setData(fetch.results[0]);

        // Wikipedia
     //   const wikipediaUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${fetch.results[0].wikipedia_url.split('/').reverse()[0]}&origin=*`;
        const wikipediaUrl = `https://es.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${fetch.results[0].name}`;
        return helpHttp().get(wikipediaUrl);
      }).then(async (wikipediaData) => {

        const wikipediaUrl = `https://es.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${wikipediaData.query.search[0].title}&origin=*`;
        const wikiData = await helpHttp().get(wikipediaUrl);

        const pageId = Object.keys(wikiData.query.pages)[0];
        const extract = wikiData.query.pages[pageId].extract;

        // Utilizamos Cheerio para cargar el HTML del extracto
        const $ = cheerio.load(extract);

        // Buscamos todos los elementos <p> dentro del extracto
        const paragraphs = $('p').toArray().map(p => $(p).text());



        setDataWiki(paragraphs);

      }).catch((error) => {
        console.error('Error fetching data:', error);
      });




      const observations = await helpHttp().get(`https://api.inaturalist.org/v1/observations?taxon_id=${id}&order=desc&order_by=created_at&per_page=200`);

      setObservations(observations.results);


     /*  const response2 = await fetch('https://api.inaturalist.org/v1/taxa?taxon_id=41962&order=asc&order_by=created_at');
    

      const data2 = await response2.json(); */

     
    }



    fetchData();

  }, [id]);
  return (
    <>

      {data && (
        <Helmet>
          <title>{`${data.preferred_common_name} - Información sobre ${data.preferred_common_name}`}</title>
          <meta name="description" content={data.preferred_common_name + ': Explora información fascinante sobre esta especie, incluyendo características, hábitats y más.'} />
        </Helmet>
      )}

      <Navb search={true} />


      {data && <Container fluid className="">



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


          <Col className=" p-2" style={{ backgroundColor: "rgb(230, 230, 230)" }}>

            <div className="overflow-x">
              {data && data.taxon_photos && data.taxon_photos.map((image, index) => (

                <Image
                  key={index}
                  src={image.photo.url.replace(/square/g, "original")}
                  thumbnail
                  style={{
                    width: '360px',
                    height: '300px',
                    marginBottom: '10px',
                    opacity: loadedImages[index] ? 1 : 0,
                    visibility: loadedImages[index] ? 'visible' : 'hidden',
                    transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out'
                  }}
                  onLoad={() => handleImageLoad(index)}
                />
              ))}
            </div>


          </Col>
        </Row>


        {observations && <Map marker={observations} />}




      </Container>}
    </>
  )
}

export default Info
