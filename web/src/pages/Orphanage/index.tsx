import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import './orphanage.css';
import Sidebar from "../../components/Sidebar";
import mapIcon from "../../utils/mapIcon";
import api from "../../services/api";
import { useParams } from "react-router-dom";

interface Orphanage {
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  latitude: number;
  longitude: number;
  images: Array<{
    id: string;
    url: string;
  }>;
}

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const [orphanages, setOrphanages] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setOrphanages(response.data);
    })
  }, [params.id]);

  if(!orphanages) {
    return <p>Loading...</p>;
  }

  return (
    <div id="page-orphanage">

      <Sidebar/>

      <main>
        <div className="orphanage-details">
          <img src={orphanages.images[activeImageIndex].url} alt={orphanages.name} />

          <div className="images">
            {orphanages.images.map((image, index) => {
              return (
                <button 
                key={image.id} 
                className={activeImageIndex === index ? 'active' : ''} 
                type="button"
                onClick={() => [
                  setActiveImageIndex(index)
                ]}
                >
                  <img src={image.url} alt={orphanages.name} />
                </button>
              )
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanages.name}</h1>
            <p>{orphanages.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanages.latitude,orphanages.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanages.latitude,orphanages.longitude]} />
              </Map>

              <footer>
                <a target='_blank' rel='noopener noreferrer' href={`https://www.google.com/maps/dir/?api=1&destination=${orphanages.latitude},${orphanages.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanages.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanages.opening_hours}
              </div>
              {orphanages.open_on_weekends ? (
                <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
              ) : (
                <div className="open-on-weekends dont-open">
                <FiInfo size={32} color="#FF669d" />
                Não atendemos <br />
                fim de semana
              </div>
              )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}