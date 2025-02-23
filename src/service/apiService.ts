import { BodyTemperatureType, WeatherData } from '@/lib/type';
import { getRandomTemperature, parseTemperature } from '@/lib/utils';
import { AttendanceResponse } from '@/types/types';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_OPEN_WEATHER_BASE_URL;
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

const BODY_TEMP_BASE_URL = process.env.NEXT_PUBLIC_BODY_TEMPERATURE_BASE_URL;
const ENV = process.env.NEXT_PUBLIC_ENV;

//curl --location --request POST 'http://192.168.1.221/read906'
//Ambient = 29.43*C	Object = 18.51*C
export const fetchBodyTemperature =
  async (): Promise<BodyTemperatureType | null> => {
    let res: BodyTemperatureType | null = null;

    if (ENV == 'PROD') {
      const response = await axios.post(`${BODY_TEMP_BASE_URL}/read906`);
      res = parseTemperature(response.data);
    } else {
      res = parseTemperature(
        //TODO : temp for tesing
        `Ambient = ${getRandomTemperature()}*C	Object = 20.52*C`
      );
    }

    return res;
  };

export const useBodyTemperatureQuery = () =>
  useQuery<BodyTemperatureType | null, Error>({
    queryKey: ['bodyTemp'],
    queryFn: fetchBodyTemperature,
    refetchInterval: 5000, // Fetches data every 5 seconds
  });

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const sendFrameToBackend = async (
  formData: FormData
): Promise<AttendanceResponse> => {
  try {
    const response = await fetch(`${backendUrl}/api/v1/attendance/create`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to send frame to backend: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error('Error in sendFrameToBackend:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to send frame to backend: ${errorMessage}`);
  }
};

export const useSendFrameMutation = (p0: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: sendFrameToBackend,
    onError: p0.onError,
    onSuccess: p0.onSuccess,
  });
};
