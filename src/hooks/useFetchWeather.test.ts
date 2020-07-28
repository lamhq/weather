import { cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import useFetchWeather from './useFetchWeather';

describe('useFetchWeather hook', () => {
  afterEach(cleanup);

  it('should return forecast data', async () => {
    const mockCitySearchRsp = {
      data: [
        {
          title: 'Ho Chi Minh City',
          location_type: 'City',
          woeid: 1252431,
          latt_long: '10.759180,106.662498',
        },
      ],
    };
    const mockWeatherResp = {
      data: {
        consolidated_weather: [
          {
            applicable_date: '2020-07-28',
            weather_state_abbr: 'lr',
            min_temp: 26,
            max_temp: 33,
          },
        ],
        title: 'Ho Chi Minh City',
        location_type: 'City',
        woeid: 1252431,
      },
    };
    // set up mock for axios.get
    const mock = jest.spyOn(axios, 'get');
    mock.mockResolvedValueOnce(mockCitySearchRsp).mockResolvedValueOnce(mockWeatherResp);

    // call the hook
    const { result, waitForNextUpdate } = renderHook(() => useFetchWeather('London'));
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toEqual([]);

    await waitForNextUpdate();
    expect(mock).toHaveBeenCalledTimes(2);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data.length).toBe(1);
    expect(result.current.data[0].minTemp).toBe(26);
    expect(result.current.data[0].maxTemp).toBe(33);

    // restore axios.get
    mock.mockRestore();
  });

  it('should return empty data when city invalid', async () => {
    // set up mock for axios.get
    const mock = jest.spyOn(axios, 'get');
    mock.mockResolvedValueOnce({
      data: [],
    });

    // call the hook with invalid parameter
    const { result, waitForNextUpdate } = renderHook(() => useFetchWeather('London'));
    await waitForNextUpdate();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual([]);

    // restore axios.get
    mock.mockRestore();
  });

  it('should return error when network error', async () => {
    // set up mock for axios.get
    const mock = jest.spyOn(axios, 'get');
    mock.mockRejectedValue({ name: 'Error', message: 'Something went wrong' });

    // call the hook with invalid parameter
    const { result, waitForNextUpdate } = renderHook(() => useFetchWeather('London'));
    await waitForNextUpdate();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBeDefined();

    // restore axios.get
    mock.mockRestore();
  });
});
