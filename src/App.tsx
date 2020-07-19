import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import DailyForeCast from './DailyForecast';
import SearchForm from './SearchForm';
import axios from 'axios';
import { format } from 'date-fns';

const Title = styled.h1`
  margin-bottom: 50px;
  margin-top: 20px;
`;

const API_BASE_URL = '/api';

interface ConsolidatedWeather {
  air_pressure: number;
  applicable_date: string;
  created: string;
  humidity: number;
  id: number;
  max_temp: number;
  min_temp: number;
  predictability: number;
  the_temp: number;
  visibility: number;
  weather_state_abbr: string;
  weather_state_name: string;
  wind_direction: number;
  wind_direction_compass: string;
  wind_speed: number;
}

const App: React.FC = () => {
  const [query, setQuery] = React.useState('Ho Chi Minh City');
  const [days, setDays] = React.useState([]);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  React.useEffect(() => {
    async function getWeatherForecast() {
      const locSearchResp = await axios.get(`${API_BASE_URL}/location/search`, { params: { query } });
      const { woeid } = locSearchResp.data[0];
      const locWeatherResp = await axios.get(`${API_BASE_URL}/location/${woeid}`);
      const data = locWeatherResp.data.consolidated_weather.map((item: ConsolidatedWeather) => ({
        date: format(new Date(item.applicable_date), 'EEEE'),
        minTemp: Math.round(item.min_temp),
        maxTemp: Math.round(item.max_temp),
        weatherImgUrl: `https://www.metaweather.com/static/img/weather/${item.weather_state_abbr}.svg`,
      }));
      setDays(data);
    }
    if (query) {
      getWeatherForecast();
    }
  }, [query]);

  return (
    <Container>
      <Title>Weather Forecast</Title>
      <SearchForm query={query} onChange={onChange} />
      {!days && <p>No data.</p>}
      <Row>
        {days.map(({ date, minTemp, maxTemp, weatherImgUrl }) => (
          <Col key={date} lg={2} md={3} xs={6}>
            <DailyForeCast date={date} minTemp={minTemp} maxTemp={maxTemp} weatherImgUrl={weatherImgUrl} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
