import React from 'react';

import { Container, ContentWrapper, Button, MainWrapper, Location} from './styles';

import Logo from '../../assets/images/Logo.svg'
import { FiArrowRight } from 'react-icons/fi';

const LadingPage: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <img src={Logo} alt="Logo"/>
        <MainWrapper>
          <h1>Leve felicidade para o mundo!</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças</p>
        </MainWrapper>

        <Location>
          <strong>Nova Trento</strong>
          <span>Santa Catarina</span>
        </Location>

        <Button to='/orphanagesmap'>
          <FiArrowRight/>
        </Button>
      </ContentWrapper>
    </Container>
  );
};

export default LadingPage;
