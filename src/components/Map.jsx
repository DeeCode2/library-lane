import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
//import './Map.scss'
const Map = (props) => {
    return (
        <MapContainer className="w-full aspect-video " center={[props.lat, props.long]} zoom={14}>
            <TileLayer
                attribution='&copy <a href="www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            />
            <Marker position={[props.lat, props.long]}/>
            
        </MapContainer>
    )
}

export default Map;