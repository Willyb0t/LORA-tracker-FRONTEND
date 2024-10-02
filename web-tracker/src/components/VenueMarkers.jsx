import React from 'react'
import { Marker } from 'react-leaflet'
import { VenueLocationIcon } from './VenueLocationIcon'
import MarkerPopUp from './MarkerPopUp'


const VenueMarkers = (props) => {
    const {venues} = props;
    const markers = venues.map((venue, i)=>{
        <Marker key={i} position={venue.geometry} icon={VenueLocationIcon}>
            <MarkerPopUp data={venue}/>
        </Marker>
    })
  return (
    <>{markers}</>
  )
}
export default VenueMarkers;
