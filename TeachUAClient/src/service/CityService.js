import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const addCity = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/club/city", {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const updateCityById = async (data) => {
    return await fetchRequest.put(BASE_URL + "/api/v1/club/city/" + data.id, {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude
    }).then((response) => {
        console.log(response);
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const deleteCityById = async (id) => {
    return await fetchRequest.delete(BASE_URL + "/api/v1/club/city/" + id,).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getCityById = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/v1/club/city/" + id).then((response) => {
        return response.data
    });
};

export const getAllCities = async () => {
    return await fetchRequest.get(BASE_URL + "/api/v1/club/city").then((response) => {
        return response.data
    });
};
