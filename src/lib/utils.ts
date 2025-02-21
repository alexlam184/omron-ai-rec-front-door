import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BodyTemperatureType } from './type';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseTemperature(data: string): BodyTemperatureType | null {
  const regex = /Ambient\s*=\s*([\d.]+)\*C\s*Object\s*=\s*([\d.]+)\*C/;
  const match = data.match(regex);

  if (match) {
    return {
      ambient: parseFloat(match[1]),
      object: parseFloat(match[2]),
    };
  }

  return null; // Return null if the format is invalid
}

export const getRandomTemperature = (): number => {
  return parseFloat((Math.random() * (38.5 - 36.8) + 36.8).toFixed(1));
};
