import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ModalFotos from '../componentes/ModalFotos.jsx';



function Map({ marker }) {


    const [photo, setPhoto] = useState(null);

    const icon = L.icon({
        iconUrl: "/marker-icon.png",
        iconSize: [30, 30], // Tamaño del icono
        iconAnchor: [15, 15], // Punto de anclaje del icono (la punta)
      });



    const modalClose = () => {
        setPhoto(null);
    };


    const marks = marker.map((m, index) => {





        if (m.geojson) {
            return { index, m }
        }
        return null;
    }).filter(Boolean);



    return (

        <>
            <MapContainer center={[marks[0].m.geojson.coordinates[1], marks[0].m.geojson.coordinates[0]]} zoom={5} style={{ height: '600px' }} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                {marks.map((coordinates, index) => (


                    <Marker key={index} position={[coordinates.m.geojson.coordinates[1], coordinates.m.geojson.coordinates[0]]} icon={icon} eventHandlers={{
                        click: () => {
                            setPhoto(coordinates.m.photos);
                        },
                    }} >

                    </Marker>




                ))}

            </MapContainer>




            {photo && <ModalFotos fotos={photo} mclose={modalClose} />}


        </>

    );
}

export default Map;
