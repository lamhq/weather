import React from 'react';
import styled from 'styled-components';

interface DailyForeCastProps {
  date: string;
  minTemp: number;
  maxTemp: number;
  weatherImgUrl: string;
}

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 160px;
  margin-bottom: 30px;
`;

const Header = styled.header`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const WeatherImg = styled.img`
  max-width: 80px;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const LowTemp = styled.div`
  color: #878787;
`;

const HiTemp = styled(LowTemp)`
  font-weight: bold;
`;

const DailyForeCast: React.FC<DailyForeCastProps> = ({ date, minTemp, maxTemp, weatherImgUrl }) => {
  return (
    <Container>
      <Header>{date}</Header>
      <WeatherImg src={weatherImgUrl} alt="" />
      <Footer>
        <LowTemp>{minTemp}&#xB0;</LowTemp>
        <HiTemp>{maxTemp}&#xB0;</HiTemp>
      </Footer>
    </Container>
  );
};

export default DailyForeCast;