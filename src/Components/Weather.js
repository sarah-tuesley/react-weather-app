import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NextDays from './NextDays';

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://weatherdbi.herokuapp.com/data/weather/Brisbane`
    );
    setWeatherData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(weatherData);

  const currentCon = weatherData?.currentConditions;

  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          {weatherData.region}
          <div>{weatherData?.next_days[0].day}</div>
          <img src={currentCon.iconURL} alt="weatherIcon"></img>
          <div>{currentCon.temp.c}</div>
          <div>{currentCon.comment}</div>
        </>
      )}
      <NextDays weatherData={weatherData} />
    </div>
  );
};

export default Weather;
