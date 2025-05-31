import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './css/AddClubInputAdress.css'
import { Result } from "antd";

const place = "PLACEHOLDER";

const AddClubInputAddress = ({ editedLocation, onChange, form, inputText }) => {
    const [request, setRequest] = useState("");
    const [placeholder, setPlaceholed] = useState("Введіть адресу локації");

    const handleSearch = (text) => {
        setRequest(form.getFieldValue("cityName") + " " + text);
    };

    useEffect(() => {
        if (editedLocation) {
            setPlaceholed(editedLocation.address.value.description);
        }
        else {
            setPlaceholed("Введіть адресу локації");
        }
    }, [editedLocation])

    const noOptionsMessage = () => {
        const city = form.getFieldValue("cityName");

        return !city ?
            <Result
                status="error"
                title="Виберіть місто"
                subTitle="Щоб почати вводити адресу виберіть місто" /> :
            <Result
                status="success"
                title={`Вибране місто ${city}`}
                subTitle="Починайте вводити адресу"
            />
    };

    return (
        <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_MAP_KEY}
            selectProps={{
                className: "add-club-input input-address-auto-complete",
                placeholder: placeholder,
                noOptionsMessage: noOptionsMessage,
                loadingMessage: () => "Пошук...",
                inputValue: inputText,
                onInputChange: handleSearch,
                onChange: onChange,
            }}
            autocompletionRequest={{
                input: request,
                componentRestrictions: {
                    country: 'ua',
                }
            }}
        />
    );
};

export default AddClubInputAddress;