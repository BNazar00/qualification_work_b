import {BASE_URL, DELETE_FILE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";
import {searchParameters} from "../context/SearchContext";

export const ABOUT_URL = BASE_URL + "/api/v1/about/"

export const getAllItems = async () => {
    return await fetchRequest.get(ABOUT_URL)
        .then((response) => {
            return response.data;
        });
}

export const updateItemById = async (data) => {
    return await fetchRequest
        .put(ABOUT_URL + data.id, {
            picture: data.picture,
            text: data.text,
            video: data.video,
            type: data.type,
            number: null
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response.data;
            // return "Відредагувати компонент не вдалося: " + error.response.data;
        });
};

export const createItem = async (type) => {
    return await fetchRequest
        .post(ABOUT_URL, {
            picture: null,
            text: null,
            video: null,
            type: type,
            number: null
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return "Створити компонент не вдалося: " + error.response.data;
        });
}

export const deleteItem = async(id) => {
    return await fetchRequest.delete(ABOUT_URL + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
            return "Видалити компонент не вдалося: " + error.response.data
        });
}

export const changeOrder = async (id, number) => {
    return await fetchRequest
        .patch(ABOUT_URL + id, {
            number: number
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return "Змінити порядок компонентів не вдалося: " + error.response.data;
        });
}
