import client from 'axios';

type DayField =
  | 'maxtemp_c'
  | 'mintemp_c'
  | 'avgtemp_c'
  | 'maxwind_kph'
  | 'text'
  | 'avghumidity'
  | 'icon';

type ForecastDayData = Record<DayField, string>;

type ForecastDayDataReport = ForecastDayData & Record<'name', string>;
export type WeatherResponse = ForecastDayDataReport[];

export const fetchWeatherGeneral = async (location: string) => {
  const WEATHER_API = `http://api.weatherapi.com/v1/forecast.json`;
  const { data } = await client.request({
    url: WEATHER_API,
    params: {
      key: 'fa3d93963be0400bb2844351222802',
      q: location,
      days: 5,
      aqi: 'no',
      alerts: 'no',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const forecastday = data?.forecast?.forecastday;
  return forecastday.map((e: any) => {
    console.log(e);
    const data: ForecastDayData = {
      maxtemp_c: '',
      mintemp_c: '',
      avgtemp_c: '',
      maxwind_kph: '',
      text: '',
      avghumidity: '',
      icon: '',
    };
    data.maxtemp_c = e.day.maxtemp_c;
    data.mintemp_c = e.day.mintemp_c;
    data.avgtemp_c = e.day.avgtemp_c;
    data.maxwind_kph = e.day.maxwind_kph;
    data.icon = e.day.condition?.icon;
    data.text = e.day.condition?.text;
    data.avghumidity = e.day.avghumidity;
    return data;
  });
};
