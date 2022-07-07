import React, { useState } from 'react';
import { City } from '../interfaces/city';
import './css/main.css';
import Result from './result';
import { api } from '../api/apiService';
import { CityLatLon } from '../interfaces/cityLatLon';

function CityForm(props:any) {
    const [city, setCity] = useState("");
    const [cityData, setCityData] = useState<City | undefined>(undefined);

    const handleSubmit = (evt:any) => {
        evt.preventDefault();
        getCityLatLong();
    }

    function getCityLatLong(){
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=a800d5978d1ccafe375097237d6a4ef8`;
        api<[CityLatLon]>(url)
        .then(([CityLatLon] ) => {
            getCityInfo([CityLatLon][0].lat, [CityLatLon][0].lon);
          })
    }

    function getCityInfo(lat:String, lon:String) {
        const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a800d5978d1ccafe375097237d6a4ef8`;
            api<City>(url2)
                .then((city:City) => {
                    setCityData(city);
                })
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