import React, { useEffect, useState } from 'react';
import { Container, AsideBar, Header, Footer, ButtonAdd, Map, LinkPopup} from './styles';

import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { TileLayer, Marker, Popup} from 'react-leaflet';

import LogoFace from '../../assets/images/LogoFace.svg';
import mapIcon from '../../utils/mapIcon';

import './styles.css';
import api from '../../services/api';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, []);

  return (
    <Container>
      <AsideBar>
        <Header>
          <img src={LogoFace} alt=""/>
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita</p>
        </Header>
        <Footer>
          <strong>Nova Trento</strong>
          <span>Santa Catarina</span>
        </Footer>
      </AsideBar>
      
      <Map
        center={[-27.2754347,-48.9328095]}
        zoom={14}
        style={{width: '100%', height: '100%'}}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}

        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />

        {orphanages.map(orphanage => {
          return (
            <Marker key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude,orphanage.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <LinkPopup to={`orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color={"#fff"}/>
                </LinkPopup>
              </Popup>
            </Marker>
          )
        })}
      
      </Map>

      <ButtonAdd to='/orphanages/create'>
        <FiPlus/>
      </ButtonAdd>
    </Container>
  );
};

export default OrphanagesMap;
