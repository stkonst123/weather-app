export type LocationData = {
  country: string;
  latitude: number;
  longitude: number;
  name: string;
  timezone: string;
  population?: number;
  postcodes?: Array<string>;
};

export type CurrentTemperature = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: { time: string; interval: string; temperature_2m: string };
  current: { time: string; interval: number; temperature_2m: number };
};

export type DataRange = {
  from: string;
  to: string;
};
