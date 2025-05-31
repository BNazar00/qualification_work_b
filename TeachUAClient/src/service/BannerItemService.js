import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const addBannerItem = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/banner", {
        title: data.title,
        subtitle: data.subtitle,
        link: data.link,
        picture: data.picture && data.picture.file.response,
        sequenceNumber: data.sequenceNumber
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const updateBannerItemById = async (data) => {
    return await fetchRequest.put(BASE_URL + "/api/v1/banner/" + data.id, {
        title: data.title,
        subtitle: data.subtitle,
        link: data.link,
        picture: data.picture,
        sequenceNumber: data.sequenceNumber
    }).then((response) => {
        console.log(response);
        return response.data;
    }).catch((error) => {
        return error.response.data;
    });
};

export const deleteBannerItemById = async (id) => {
    return await fetchRequest.delete(BASE_URL + "/api/v1/banner/" + id)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response.data;
        });
};

export const getBannerItemById = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/v1/banner/" + id)
        .then((response) => {
            return response.data;
        });
};

export const getAllBannerItems = async () => {
    return await fetchRequest.get(BASE_URL + "/api/v1/banner")
        .then((response) => {
            return response.data;
        });
};
