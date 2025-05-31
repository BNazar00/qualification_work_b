import fetchRequest from "./FetchRequest";
import {BASE_URL} from "./config/ApiConfig";

export const createCertificateType = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/certificate/type", data
    ).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    });
};

export const getCertificateTypes = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/certificate/type")
        .then((response) => {
            return response.data;
        });
};

export const updateCertificateType = async (id, data) => {
    return await fetchRequest
        .put(BASE_URL + "/api/v1/certificate/type/" + id, data)
        .then((response) => {
            return response.data
        }).catch((error) => {
            return error.response.data;
        });
}

export const deleteCertificateType = async (id) => {
    return await fetchRequest
        .delete(BASE_URL + "/api/v1/certificate/type/" + id)
        .catch((error) => {
            return error.response.data;
        });
};
