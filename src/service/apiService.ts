import { BodyTemperatureType, WeatherData } from '@/lib/type';
import { getRandomTemperature, parseTemperature } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_KEY = '9fd5335b9f3a19e8626718818862e335';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const CITY = 'Tsim Sha Tsui,HK';

//--------------Staff
export const fetchOpenWeather = async (): Promise<WeatherData> => {
  const response = await axios.get(
    `${BASE_URL}?q=${CITY}&appid=${API_KEY}&units=metric`
  );
  const res = response.data;
  return res;
};

export const useOpenWeatherQuery = () =>
  useQuery<WeatherData, Error>({
    queryKey: ['weather'],
    queryFn: fetchOpenWeather,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });

//curl --location --request POST 'http://192.168.1.221/read906'
//Ambient = 29.43*C	Object = 18.51*C
export const fetchBodyTemperature =
  async (): Promise<BodyTemperatureType | null> => {
    let res: BodyTemperatureType | null = null;
    const response = await axios.post(`http://192.168.1.221/read906`);
    res = parseTemperature(response.data);
    // res = parseTemperature(  //TODO : temp for tesing
    //   `Ambient = ${getRandomTemperature()}*C	Object = 20.52*C`
    // );
    return res;
  };

export const useBodyTemperatureQuery = () =>
  useQuery<BodyTemperatureType | null, Error>({
    queryKey: ['bodyTemp'],
    queryFn: fetchBodyTemperature,
    refetchInterval: 5000, // Fetches data every 5 seconds
  });
