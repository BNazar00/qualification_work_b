import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getAllCities } from "../../service/CityService";
import {advancedSearchCityName, mapSearchParameters} from "../../context/SearchContext";
import { getClubsByCategoryAndCity } from "../../service/ClubService";
import './css/Cities.css';


const Cities = ({ setMapClubs, setZoom, setCenter }) => {
    const { Option } = Select;
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState("");

    useEffect(() => {
        getAllCities().then(response => {
            setCities(response)
        });
        setCity(mapSearchParameters.cityName);
    }, [mapSearchParameters.cityName]);

    const onCityChange = (value) => {
        mapSearchParameters.cityName = value;

        getClubsByCategoryAndCity(mapSearchParameters).then(response => {
            const arr = [];
            response.map(club => {
                club.locations.map(location => {
                    const mapClub = JSON.parse(JSON.stringify(club));
                    mapClub.location = location;
                    arr.push(mapClub);
                })
            })
            setMapClubs(arr);
        });
        setZoom(10);
        cities.filter(city => city.name === value)
            .map(city => setCenter({
                lat: city.latitude,
                lng: city.longitude
            }));
        if (value === "") {
            setCenter({
                lat: 49.0384,
                lng: 31.4513
            });
            setZoom(6);
        }
    };

    return (
        <Select
            id="mapCitiesList"
            className="selectCity"
            value={city}
            onChange={onCityChange}
            showSearch
            placeholder={mapSearchParameters.cityName}
            style={{ borderRadius: '30px' }}
        >
            <Option value="">Всі міста</Option>
            {cities.map(city => (<Option value={city.name}>{city.name}</Option>))}
        </Select>
    )
}

export default Cities;