import React, { useEffect, useState, useRef } from "react";

import { useFetch } from "../hooks/useFetch";
import { helpHttp } from "../helper/helpHttp";
import CardB from "./CardB";
import '../css/estilos.css';
import BuscadorLista from "./BuscadorLista";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Buscador( {fotos} ) {

    const initialForm = {
        name:""
        
    };

    const [form, setForm] = useState(initialForm);
    const [data, setData] = useState(null);
    const [dataImg, setDataImg] = useState(null);
    const [fetch, setFetch] = useState(null);
    const [inputFocus, setInputFocus] = useState(false);


    useEffect(() => {

        if (form.name === "") return;


        const fetchData = async () => {

            //const url = 'https://api.enciclovida.mx/autocompleta/especies/' + form.name;
            const url = `https://api.inaturalist.org/v1/taxa/autocomplete?q=${form.name}&rank=species&locale=es`;
            const fetch = await helpHttp().get(url);

            

            if (fetch.term === "undefined") {
                setData(null);
                return;
            }
            setData(fetch.results);
           
        }

        fetchData();
    }, [form.name]);


        const inputRef = useRef(null);
        const listaRef = useRef(null);
      
        useEffect(() => {
         
          function handleClickOutside(event) {
            if (
              inputRef.current &&
              !inputRef.current.contains(event.target) &&
              listaRef.current &&
              !listaRef.current.contains(event.target)
            ) {
              
              setInputFocus(false);
            }
          }
      
          
          document.addEventListener('click', handleClickOutside);
      
          // Remover el event listener al desmontar el componente
          return () => {
            document.removeEventListener('click', handleClickOutside);
          };
        }, []);




    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });


    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    const handleFocus = (e) => {
        setInputFocus(e);
      };

    


    return (
        <div className="search text-center ">
            
               
                
                    {/* <h4 className="text-secondary"> Busca entre más de 114 mil especies válidas o aceptadas y su sinonimia</h4> */}
                    <input
                        ref={inputRef}
                        type="text"
                        name="name"
                        id="name"
                        value={form.name}
                        placeholder="Buscar por nombre común o cientifico"
                        onChange={handleChange}
                        onFocus={() => handleFocus(true)}
                       
                        className="form-control rounded-pill  border-2 border-secondary form-control-lg shadow-sm"
                    />
                    <div ref={listaRef}>
                    {data && inputFocus && <BuscadorLista  data = {data} handleFocus={handleFocus}  />} 
                    </div>
                     
                  

                

            
             
           
            {data && dataImg && (
                
                <CardB data={data} dataImg={dataImg} />
               


            )}





        </div>
    );
}