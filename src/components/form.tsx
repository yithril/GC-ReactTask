import React, { SyntheticEvent, useEffect, useState } from 'react';
import { City } from '../interfaces/city';
import './css/main.css';
import Result from './result';

function CityForm(props:any) {
    const [city, setCity] = useState("");
    const [data, setData] = useState({lat: "", lon: ""});
    const [cityData, setCityData] = useState<City | undefined>(undefined);

    const handleSubmit = (evt:any) => {
        evt.preventDefault();
        getCityLatLong();
    }

    function getCityLatLong(){
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=a800d5978d1ccafe375097237d6a4ef8`;
        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json[0]))
            .then((json) => getCityInfo(data.lat, data.lon))
            .catch((error) => console.log(error));  
    }

    function getCityInfo(lat:String, lon:String) {
        if(data !== undefined && data.lat !== "" && data.lon !== ""){
            const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a800d5978d1ccafe375097237d6a4ef8`;
            fetch(url2)
            .then((response) => response.json())
            .then((json) => setCityData(json))
            .catch((error) => console.log(error)); 
        }
    }

    return(
        <div className='container'>
            <div className="row box">
            <div className="card">
            <form onSubmit={handleSubmit} className="input-group vertical">
            <label htmlFor="name">City:</label>
             <input type="text" name="city" value={city} onChange={e => setCity(e.target.value)} placeholder="enter city name" />
             <div className="input-group">
             <button className="primary bordered medium" type="submit">Search</button>
             </div>
            </form>
            </div>
            </div>

            { cityData !== undefined && 
            <div className="row box">
                <Result city = {cityData}></Result> 
            </div>
            }

        </div>
    );
}

export default CityForm;