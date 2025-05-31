import { BASE_URL } from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const getPageableCategory = async (page) => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/club/category/search?page=" + page)
        .then((response) => {
            return response.data;
        });
};

export const getAllCategories = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/club/category")
        .then((response) => {
            return response.data;
        });
};

export const addCategory = async (data) => {
    return await fetchRequest
        .post(BASE_URL + "/api/v1/club/category", {
            sortby: data.sortby,
            name: data.name,
            description: data.description,
            urlLogo: data.urlLogo && data.urlLogo.file.response,
            backgroundColor: data.backgroundColor,
            tagBackgroundColor: data.tagBackgroundColor,
            tagTextColor: data.tagTextColor,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const updateCategoryById = async (data) => {
    return await fetchRequest
        .put(BASE_URL + "/api/v1/club/category/" + data.id, {
            sortby: data.sortby,
            name: data.name.text ? data.name.text : data.name,
            description: data.description,
            urlLogo: data.urlLogo.urlLogo ? data.urlLogo.urlLogo : data.urlLogo,
            backgroundColor: data.backgroundColor,
            tagBackgroundColor: data.tagBackgroundColor,
            tagTextColor: data.tagTextColor,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const deleteCategoryById = async (id) => {
    return await fetchRequest
        .delete(BASE_URL + "/api/v1/club/category/" + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};
