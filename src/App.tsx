import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import DailyForeCast from './DailyForecast';
import SearchForm from './SearchForm';
import useFetchWeather from './useFetchWeather';
import AsyncContent from './AsyncContent';

const Title = styled.h1`
  margin-bottom: 50px;
  margin-top: 20px;
`;

const App: React.FC = () => {
  const [query, setQuery] = React.useState('Ho Chi Minh City');
  const { isLoading, error, data } = useFetchWeather(query);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <Container>
      <Title>Weather Forecast</Title>
      <SearchForm query={query} onChange={onChange} />
      <AsyncContent error={error} isLoading={isLoading} hasData={!!data}>
        {() => (
          <Row>
            {data.map(({ date, minTemp, maxTemp, weatherImgUrl }) => (
              <Col key={date} lg={2} md={3} xs={6}>
                <DailyForeCast date={date} minTemp={minTemp} maxTemp={maxTemp} weatherImgUrl={weatherImgUrl} />
              </Col>
            ))}
          </Row>
        )}
      </AsyncContent>
    </Container>
  );
};

export default App;
