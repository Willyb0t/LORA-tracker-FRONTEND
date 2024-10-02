import React, {useContext, createContext, useState} from "react";

export const CoordenadesContext = createContext();

export const CoordenadesContextProvider = props =>{
  const [coord, setCoord] = useState({
    latitude: 0,
    longitude: 0
  })
  return(
    <CoordenadesContext.Provider value={{coord, setCoord}}>
      {props.children}
    </CoordenadesContext.Provider>
  )
}