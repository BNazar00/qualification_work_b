import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const addDistrict = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/club/district", {
        name: data.name,
        cityName: data.cityName
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const updateDistrictById = async (data) => {
    return await fetchRequest.put(BASE_URL + "/api/v1/club/district/" + data.id, {
        name: data.name,
        cityName: data.cityName
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const deleteDistrictById = async (id) => {
    return await fetchRequest.delete(BASE_URL + "/api/v1/club/district/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getDistrictsByCityName = async (name) => {
    return await fetchRequest.get(BASE_URL + "/api/v1/club/district/" + name).then((response) => {
        return response.data
    });
};

export const getAllDistrict = async () => {
    return await fetchRequest.get(BASE_URL + "/api/v1/club/district").then((response) => {
        return response.data
    });
};
