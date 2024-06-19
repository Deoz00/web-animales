import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import '../css/estilos.css';
import { helpHttp } from "../helper/helpHttp.js";
import React, { useEffect, useState, useRef } from "react";
import { useModelContext } from '../context/ModelContext';
import { BrowserRouter, Route, Routes, Link, useParams, json } from "react-router-dom"



function Dinasty() {

	const [data, setData] = useState({});
	const [ready, setReady] = useState(null);
	const [contador, setContador] = useState(null);
	const [fin, setFin] = useState(null);


	const scrollRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	const { idf, setIdf } = useModelContext();

	const id = useParams().id;


	const onMouseDown = (e) => {
		if (scrollRef.current) {
		  setIsDragging(true);
		  setStartX(e.pageX - scrollRef.current.offsetLeft);
		  setScrollLeft(scrollRef.current.scrollLeft);
		}
	  };
	
	  const onMouseMove = (e) => {
		if (!isDragging || !scrollRef.current) return;
		e.preventDefault();
		const x = e.pageX - scrollRef.current.offsetLeft;
		const walk = (x - startX) * 1; // Multiplicar para aumentar o reducir la velocidad de arrastre
		scrollRef.current.scrollLeft = scrollLeft - walk;
	  };
	
	  const stopDragging = () => {
		setIsDragging(false);
	  };

	  


	const buscarChild = async () => {
		for (const valor of data.children) {
			await new Promise(resolve => setTimeout(resolve, 1000));
			const fetch = await helpHttp().get(`https://api.inaturalist.org/v1/taxa/${valor.id}?&locale=es`);
			valor.child = fetch.results[0];
			setReady(true)

		}
		console.log(data);
		setFin(true)
		const { current } = scrollRef;
		if (current) {
		  // Centra el scroll horizontalmente
		  current.scrollTo({
			left: (current.scrollWidth - current.clientWidth) / 2,
			behavior: 'smooth' // Puedes cambiar a 'auto' si no deseas animación
		  });
		}

		// Añadir listeners globales
		document.addEventListener('mouseup', stopDragging);
		document.addEventListener('mouseleave', stopDragging);
	
		// Limpiar los listeners al desmontar el componente
		return () => {
			document.removeEventListener('mouseup', stopDragging);
			document.removeEventListener('mouseleave', stopDragging);
		  };

		

	}

	useEffect(() => {

		console.log("di");


		const fetchData = async () => {

			/* let id = 846273; */

			const url = 'https://api.inaturalist.org/v1/taxa/' + idf + '?&locale=es';
			helpHttp().get(url).then((res) => {

				//setData(res.results[0]);

				console.log(res.results[0]);
				setData(res.results[0])
				


			});



		}



		fetchData();

	}, []);

	useEffect(() => {
		console.log(data)
		buscarChild();
	  }, [data]); // El efecto se ejecuta cuando data cambia





	if (!ready) {
		return <p>Cargando...</p>; // Muestra un mensaje de carga mientras se obtienen los datos
	}
	/* if (data) {
		
	} */


	return (

		<Container fluid ref={scrollRef}   className='overflow-x'   onMouseDown={onMouseDown}
		onMouseMove={onMouseMove}
		
		style={{
			
			cursor: isDragging ? 'grabbing' : 'grab',
			 userSelect: 'none'
		  }}>
			 <Row >
		
		

			{ data && <div className="tree">
				<ul>
					<li className={data.id === id ? 'id2' : ''}> <Link to={`/especie/${data.id}`}> <img src={data.default_photo?data.default_photo.url:""}  /><span>{data.name}</span> </Link>
						<ul>

							{data.children.map((parent) => (
								<li key={parent.id} className={parent.id === id ? 'id2' : ''}> <Link to={`/especie/${parent.id}`}><img src={parent.default_photo?parent.default_photo.url:""}  /><span>{parent.name}</span></Link>
									<ul>


										{ parent.child && parent.child.children && parent.child.children.map((pp) =>(

											<li key={pp.id}> <Link className={pp.id==id?'id2':''} to={`/especie/${pp.id}`}> <img src={pp.default_photo?pp.default_photo.url:""}  /> <span>{pp.name}</span></Link> 
											
											
											</li>


										))}
										<h1>{console.log(parent.child)}</h1>

									</ul>
								</li>
							))}




						</ul>
					</li>
				</ul>
			</div>}
			</Row>
			</Container>
	);
}

export default Dinasty;