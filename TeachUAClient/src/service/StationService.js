import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const addStation = async (data) => {
    return await fetchRequest
        .post(BASE_URL + "/api/v1/club/station", {
            name: data.name,
            cityName: data.cityName,
            districtName:data.districtName,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const updateStationById = async (data) => {
    return await fetchRequest
        .put(BASE_URL + "/api/v1/club/station/" + data.id, {
            name: data.name,
            cityName: data.cityName,
            districtName: data.districtName
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};
export  const  getStationsByDistrictNameAndCityName  = async (data) =>{
    return await  fetchRequest
        .post(BASE_URL + "/api/v1/club/station/district",
            {
                name: data.name,
                cityName: data.cityName,
                districtName: data.districtName
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
}

export const deleteStationById = async (id) => {
    return await fetchRequest
        .delete(BASE_URL + "/api/v1/club/station/" + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const getAllStations = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/club/station")
        .then((response) => {
            return response.data;
        });
};

export const getStationsByCity = async (name) => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/club/station/" + name)
        .then((response) => {
            return response.data;
        });
};
