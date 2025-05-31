import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const addContactType = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/club/contact-type", {
        name: data.name,
        urlLogo: data.urlLogo && data.urlLogo.file.response
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const updateContactTypeById = async (data) => {
    return await fetchRequest.put(BASE_URL + "/api/v1/club/contact-type/" + data.id, {
        name: data.name,
        urlLogo: data.urlLogo
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const deleteContactTypeById = async (id) => {
    return await fetchRequest.delete(BASE_URL + "/api/v1/club/contact-type/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getAllContactTypes = async () => {
    return await fetchRequest.get(BASE_URL + "/api/v1/club/contact-type").then((response) => {
        return response.data
    });
};
