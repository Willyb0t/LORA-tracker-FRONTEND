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
import Sidebar from './Sidebar'

const markerIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  shadowSize: [41, 41]
})

const MapView = (props) => {
  const {coord, setCoord, agregarCoordenadas, agregarDireccion, pastDir, setPastDir, direccionFija, setDireccionFija} = useContext(CoordenadesContext);
  const [position, setPosition] = useState([coord.latitude, coord.longitude]);
  //const agregarCoordenadas = useContext(CoordenadesContext);
  //const {direccionFija, setDireccionFija} = useContext(CoordenadesContext);
  //const {pastDir, setPastDir} = useContext(CoordenadesContext);
  //const agregarDireccion = useContext(CoordenadesContext)
  const [state, setState] = useState({
    currentLocation: {lat:coord.latitude, lng: coord.longitude},
    zoom: 15,
  })
  let dir;
  const fetchNewPosition = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/position/');
        const { latitude, longitude } = response.data;
        setPosition([latitude, longitude]);
        fetchNewData();
        agregarCoordenadas(latitude,longitude)
    } catch (error) {
        console.error('Error al obtener la nueva posición:', error);
    }
  };

  const fetchNewData = async () =>{
    try{
      const response = await axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.a529b87203880f3210ed7974b8c22671&lat=${position[0]}&lon=${position[1]}&format=json&`)
      const direccion = response.data.address.road
      dir = response.data.address.road
      agregarDireccion(dir);
    }catch (error){
      console.error('Error al obtener los datos de las coordenadas', error)
    }
  }

  useEffect(()=>{
    if(coord.latitude && coord.longitude){
      const currentLocation = {
        lat: coord.latitude,
        lng: coord.longitude
      }
    }
    const interval = setInterval(()=>{
      fetchNewPosition();
      console.log(direccionFija)
    }, 2000);
    return () => clearInterval(interval)
  },[])
  return (
    <div className='grid grid-flow-row-dense grid-cols-5 grid-rows-1'>
      <div className='col-start-auto z-40'><Sidebar></Sidebar></div>
      <div className='col-span-5 col-end-auto z-30'>
        <MapContainer center={state.currentLocation} zoom={state.zoom}  >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
            <Marker position={state.currentLocation} icon={markerIcon}>
              <Popup>
                Tu posicion <br/> Latitud: {coord.latitude}, Longitud: {coord.longitude} <br/> Tu direccion: <br/> {direccionFija}
              </Popup>
            </Marker>
            <Marker position={position} icon={markerIcon}>
              <Popup>
                Posicion actual <br/> Latitud: {position[0]}, Longitud: {position[1]} <br/> Tu direccion: <br/> {pastDir[pastDir.length -1]}
              </Popup>
              
            </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default MapView;