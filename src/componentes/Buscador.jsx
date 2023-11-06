import React, { useEffect, useState } from "react";

import { useFetch } from "../hooks/useFetch";
import { helpHttp } from "../helper/helpHttp";
import CardB from "./CardB";
import '../css/estilos.css';
import BuscadorLista from "./BuscadorLista";


export default function Buscador() {

    const initialForm = {
        name:""
        
    };

    const [form, setForm] = useState({});
    const [data, setData] = useState(null);
    const [dataImg, setDataImg] = useState(null);
    const [fetch, setFetch] = useState(null);
    const [inputFocus, setInputFocus] = useState(false);


    useEffect(() => {

        if (form.name === "") return;


        const fetchData = async () => {

            /*   const url = 'https://api.api-ninjas.com/v1/animals?name=' + form.name;
              const headers = {
                  'X-Api-Key': 'PR8gjT5q97fKK9+bpcTqnQ==AakCJvR1PzBO7spq',
              }; */
            const url = 'https://api.enciclovida.mx/autocompleta/especies/' + form.name;
            //  const url = "https://api.inaturalist.org/v1/observations?photos=true&taxon_name=Panthera%20onca&order=desc&order_by=created_at";


            const fetch = await helpHttp().get(url);
            console.log(fetch.results.especie);

            if (fetch.term === "undefined") {
                setData(null);
                return;
            }
            setData(fetch.results);

            /* const apiPromises = fetch.results.especie.map(name => {
                //   console.log(name.data.nombre_cientifico);
                var namev = name.data.nombre_cientifico.replace(/ /g, "+");
                // console.log( "dsa"+name.data.nombre_cientifico);
                const link = "https://api.inaturalist.org/v1/observations?photos=true&taxon_name=" + namev + "&order=desc&order_by=created_at";



                return helpHttp().get(link);



            }); */

           /*  Promise.all(apiPromises)
                .then(results => {
                    // Guardar los resultados en el estado
                    setDataImg(results);

                })
                .catch(error => console.error('Error al obtener datos de la API:', error));
            console.log(dataImg); */
        }

        fetchData();
    }, [form.name]);


    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });


    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setData(null);
        setDataImg(null);
        alert("enviado");
        setFetch(form.name);
    };

    const handleFocus = () => {
        setInputFocus(true);
      };

      const handleBlur = () => {
        setInputFocus(false);
      };



    return (
        <div className="search">
            <form onSubmit={handleSubmit} className="text-center">
               
                
                    <h4 className="text-white"> Busca entre más de 114 mil especies válidas o aceptadas y su sinonimia</h4>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={form.name}
                        placeholder="Buscar por nombre común o cientifico"
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="form-control rounded-pill  border-2 border-success form-control-lg"
                    />
                     {data && inputFocus && <BuscadorLista data = {data} />} 
                  

                

            </form>
            
             
            <br />
            {data && dataImg && (
                
                <CardB data={data} dataImg={dataImg} />
               


            )}





        </div>
    );
}