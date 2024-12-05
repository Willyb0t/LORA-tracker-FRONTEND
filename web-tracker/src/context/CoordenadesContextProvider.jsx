import React, {useContext, createContext, useState} from "react";

export const CoordenadesContext = createContext();

export const CoordenadesContextProvider = props =>{
  const [coord, setCoord] = useState({
    latitude: 0,
    longitude: 0
  })
  const [pastCoord, setPastCoord] = useState({
    latitude: [],
    longitude: [] 
  })

  const [pastDir, setPastDir] = useState(['']);

  const agregarDireccion = (direccion) =>{
    setPastDir((prev) => [...prev, direccion]);
  }

  const[direccionFija, setDireccionFija] = useState('');

  const agregarCoordenadas = (latitud, longitud) => {
    setPastCoord((prev) => ({
        latitude: [...prev.latitude, latitud],
        longitude: [...prev.longitude, longitud]
    }));
};

  return(
    <CoordenadesContext.Provider value={{coord, setCoord, pastCoord, setPastCoord, agregarCoordenadas, direccionFija,setDireccionFija, agregarDireccion, pastDir, setPastDir}}>
      {props.children}
    </CoordenadesContext.Provider>
  )
}