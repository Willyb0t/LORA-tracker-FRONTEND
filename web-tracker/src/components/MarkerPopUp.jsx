import React from 'react'
import { Popup } from 'react-leaflet'

const MarkerPopUp = props => {
    const {name} = props.data
  return (
    <Popup>
        <div>{name}</div>
    </Popup>
  )
}

MarkerPopUp.propTypes = {}

export default MarkerPopUp