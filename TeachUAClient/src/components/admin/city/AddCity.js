import React, {useState} from "react";
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import {Button, message} from "antd";
import "./css/AddCity.css";
import {addCity} from "../../../service/CityService";
import {addToTable} from "../../../util/TableUtil";

const AddCity = ({cities, setCities}) => {
    const [city, setCity] = useState(null);

    const onChange = (value) => {
        setCity(value);
    };

    const onClick = () => {
        if (!city) {
            message.error("Виберіть місто");
            return;
        }

        geocodeByAddress(city.label)
            .then(results => getLatLng(results[0]))
            .then(({lat, lng}) => {
                addCity({
                        name: city.value.structured_formatting.main_text,
                        longitude: lng,
                        latitude: lat
                    }
                ).then((response) => {
                    if(response.status) {
                        message.warning(response.message);
                        return;
                    }

                    message.success(`Місто ${response.name} успішно додане`);

                    setCities(addToTable(cities, response));
                });
            });
    };
    return (
        <div className="add-city">
            <div className="add-city-content">
                <GooglePlacesAutocomplete
                    apiKey={process.env.REACT_APP_MAP_KEY}
                    selectProps={{
                        className: "add-city-input",
                        placeholder: "Введіть назву міста",
                        loadingMessage: () => "Пошук...",
                        onChange: onChange,
                    }}
                    autocompletionRequest={{
                        types: ['(cities)'],
                        componentRestrictions: {
                            country: 'ua',
                        }
                    }}
                />
                <Button className="flooded-button add-city-button" onClick={onClick}>Додати</Button>
            </div>
        </div>
    );
};

export default AddCity;