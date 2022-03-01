/* eslint-disable @typescript-eslint/no-var-requires */
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import provinces from '@/constants/provinces';
import React, { useEffect, useRef, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { fetchWeatherAction, selectData } from '../weatherSlice';
export const WeatherFeed = () => {
  const [country, setCountry] = useState('Hà Nội');
  const [activeSelectWeather, setActiveSelectWeather] = useState(false);
  const dispatch = useAppDispatch();
  const slug = require('slug');
  const [countrySlug, setCountrySlug] = useState('ha-noi');
  const hanldePickCountry = (event: React.MouseEvent<HTMLLIElement>) => {
    setCountrySlug(slug(event.currentTarget.innerHTML));
    setActiveSelectWeather(false);
    setCountry(event.currentTarget.innerHTML);
  };
  const data = useAppSelector(selectData);
  useEffect(() => {
    dispatch(fetchWeatherAction(countrySlug));
  }, [dispatch, countrySlug]);
  return (
    <div className="content-utilities">
      <div className="content-weather">
        <div className="weather-header">
          <div className="img-weather">
            <img src={data[0]?.icon} alt="" />
          </div>
          <div className="temperature">
            <h3>{`${data[0]?.avgtemp_c}º`}</h3>
            <span>{`${data[0]?.mintemp_c}º - ${data[0]?.maxtemp_c}º`}</span>
          </div>
          <div className="weather-detail">
            <span>{data[0]?.text}</span>
            <span>{`Độ ẩm: ${data[0]?.avghumidity}%`}</span>
            <span>{`Gió: ${data[0]?.maxwind_kph}km/h`}</span>
            {/* <span>Khả năng mưa: 2%</span> */}
          </div>
        </div>
        <div className="location-select">
          <div
            className="name-select"
            onClick={() => setActiveSelectWeather(!activeSelectWeather)}
          >
            {country}
            <RiArrowDropDownLine />
          </div>
          <div
            className="option-select"
            style={
              !activeSelectWeather ? { display: 'none' } : { display: 'block' }
            }
          >
            <ul className="list-select">
              {provinces.map((province, i) => (
                <li
                  className="item-select"
                  onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                    hanldePickCountry(e)
                  }
                >
                  {province}
                </li>
              ))}
            </ul>
          </div>
          <div className="weather-forecast">
            <div className="list-day">
              {data.map((e: any) => {
                return (
                  <div className="item-day">
                    <span>17/12</span>
                    <div className="img-weather-day">
                      <img src={e?.icon} alt="" />
                    </div>
                    <span>{`${e?.mintemp_c}º - ${e?.maxtemp_c}º`}</span>
                    <span></span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
