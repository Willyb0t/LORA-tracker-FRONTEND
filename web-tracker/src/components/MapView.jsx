import React, { useEffect, useState } from 'react'
import {MapContainer, Marker, Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { TileLayer } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import "leaflet/dist/leaflet.css"
import L from 'leaflet'
import axios from 'axios'

import { CoordenadesContext } from '../context/CoordenadesContextProvider'

const markerIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  shadowSize: [41, 41]
})

const MapView = (props) => {
  const {coord, setCoord} = useContext(CoordenadesContext);
  const [position, setPosition] = useState([coord.latitude, coord.longitude]);
  const [state, setState] = useState({
    currentLocation: {lat:coord.latitude, lng: coord.longitude},
    zoom: 15,
  })
  
  const fetchNewPosition = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/position/');
        const { latitude, longitude } = response.data;
        setPosition([latitude, longitude]);
    } catch (error) {
        console.error('Error al obtener la nueva posición:', error);
    }
  };

  console.log(coord.latitude)
  const navigate = useNavigate()

  useEffect(()=>{
    if(coord.latitude && coord.longitude){
      const currentLocation = {
        lat: coord.latitude,
        lng: coord.longitude
      }
      
    }
    const interval = setInterval(()=>{
      fetchNewPosition();
    }, 2000);
  },[])
  return (
    <MapContainer center={state.currentLocation} zoom={state.zoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
        <Marker position={state.currentLocation} icon={markerIcon}>
          <Popup>
            Tu posicion <br/> Latitud: {coord.latitude}, Longitud: {coord.longitude}
          </Popup>
        </Marker>
        <Marker position={position} icon={markerIcon}>
          <Popup>
            Posicion actual <br/> Latitud: {position[0]}, Longitud: {position[1]}
          </Popup>
        </Marker>
    </MapContainer>
  )
}

export default MapView;