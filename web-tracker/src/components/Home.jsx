import { useState } from 'react'
import React from 'react'
import { useEffect } from 'react'
import Link from 'react-router-dom'
import { useContext } from 'react'
import { CoordenadesContext } from '../context/CoordenadesContextProvider'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate =  useNavigate();
    const [state, setState] = useState({
        latitude: 0,
        longitude: 0
    })
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            function (position){
                setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            function (error){
                console.error("error code ="+ error.code + "-" + error.message)
            }, {enableHighAccuracy:true,}
        )
    },[])
    const {coord, setCoord} = useContext(CoordenadesContext)
    const clicked = e =>{
        setCoord({
            latitude: state.latitude,
            longitude: state.longitude
        })
        navigate("/Map")
    }
  return (
    <>
    <div style={{zIndex:'1', paddingTop:'10rem'}} className='p-[0px] h-56 grid grid-cols-1 pt-8 content-center content-around blur-[0.4px] saturate-200 '> 
        <div style={{alignContent:'center', opacity:'inherit'}} className='rounded-lg divide-y divide-teal-400 hover:divide-pink-400 border-double border-4 border-sky-500 hover:border-dotted backdrop-blur-sm bg-white/30 shadow-lg shadow-red-500 md:shadow-xl justify-self-center text-white p-4 grid-auto-columns text-2xl'>
            <h1 style={{alignSelf:'center'}}>Tu ubicacion</h1>
            <p>Latitud: {state.latitude}</p>
            <p>Longitud: {state.longitude}</p>
        </div>
        <button onClick={clicked} style={{marginLeft:'35em', marginRight:'35em', marginTop:'10px', borderRadius:'10px'}} type="button" className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 ...">
            Ver mapa
        </button>
    </div>
    
    </>
  )
}

export default Home