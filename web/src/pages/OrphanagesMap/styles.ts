import { Link } from 'react-router-dom';
import { Map as MapLeaflet } from 'react-leaflet';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;
  display: flex;
`;

export const AsideBar = styled.aside`
  width: 440px;
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
  padding: 80px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const  Header = styled.header`
  h2{
    font-weight: 800;
    font-size: 40px;
    line-height: 42px;
    margin-top: 64px;
  }

  p {
    line-height: 28px;
    margin-top: 24px;
  }
`;

export const  Footer = styled.footer`
  display: flex;
  flex-direction: column;
  line-height: 24px;

  strong {
    max-width: max-content;
    font-weight: 800;
    transition: color 0.3s;
    &:hover {
      color: #ffd666;
    }
  }
`;

export const Map = styled(MapLeaflet) `
  z-index: 5; 
`; 

export const ButtonAdd = styled(Link)`
  position: absolute;
  right: 40px;
  bottom: 40px;
  width: 64px;
  height: 64px;
  background: #15c3d6;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;

  z-index: 10;

  &:hover {
    background: #17d6ed;
  }
`;

export const LinkPopup = styled(Link)`
  width: 40px;
  height: 40px;
  background: #15c3d6;
  box-shadow: 17.2868px 27.6589px 41.4884px rgba(23, 142, 166, 0.16);
  border-radius: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
