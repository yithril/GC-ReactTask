import React from 'react';
import { City } from '../interfaces/city';

interface ResultProps{
    city: City
}

function Result(props:ResultProps){
    const { city } = props;
    return(
        <div className="Card">
        <h1>City</h1><span className="dot"></span>
        <ul>
            <li>Description: {city.weather[0].description}</li>
            <li>Current temp: {city.main.temp}</li>
            <li>Feels like: {city.main.feels_like}</li>
            <li>Wind speed: {city.wind.speed}</li>
        </ul>
        </div>
    );
}

export default Result;