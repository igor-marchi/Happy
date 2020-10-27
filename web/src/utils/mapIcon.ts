import Leaflet from "leaflet";

import mapMarkerImg from '../assets/images/LogoFace.svg';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68], 
  popupAnchor: [177, 2],
})

export default mapIcon;