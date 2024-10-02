import L from 'leaflet'

export const VenueLocationIcon = L.icon({
    iconUrl: require("../assets/venue_location_icon.svg"),
    iconRetinaUrl: require("../assets/venue_location_icon.svg"),
    iconAnchor: null,
    shadowAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    iconSize: [35,35],
    className: "leaflet-venue-ico",
})