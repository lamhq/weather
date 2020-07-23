import React from 'react';
import { format } from 'date-fns';
import axios, { AxiosResponse } from 'axios';
import { DailyWeather, MwCity, MwWeather, ConsolidatedWeather, RetryableError } from './types';

const API_BASE_URL = '/api1';

interface UseFetchWeatherResult {
  isLoading: boolean;
  data: DailyWeather[];
  error?: RetryableError;
  fetchData: () => Promise<void>;
}

export default function useFetchWeather(city: string): UseFetchWeatherResult {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<DailyWeather[]>([]);
  const [error, setError] = React.useState();

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(undefined);

      const locSearchResp: AxiosResponse<MwCity[]> = await axios.get(`${API_BASE_URL}/location/search`, {
        params: { query: city },
      });
      if (!locSearchResp.data.length) {
        setData([]);
        return;
      }

      const { woeid } = locSearchResp.data[0];
      const locWeatherResp: AxiosResponse<MwWeather> = await axios.get(`${API_BASE_URL}/location/${woeid}`);
      const dailyWeathers: DailyWeather[] = locWeatherResp.data.consolidated_weather.map(
        (item: ConsolidatedWeather) => ({
          date: format(new Date(item.applicable_date), 'EEEE'),
          minTemp: Math.round(item.min_temp),
          maxTemp: Math.round(item.max_temp),
          weatherImgUrl: `https://www.metaweather.com/static/img/weather/${item.weather_state_abbr}.svg`,
        }),
      );
      setData(dailyWeathers);
    } catch (err) {
      (err as RetryableError).retry = fetchData;
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setData, setError, city]);

  React.useEffect(() => {
    if (city) {
      fetchData();
    }
  }, [city, fetchData]);

  return {
    isLoading,
    error,
    data,
    fetchData,
  };
}
