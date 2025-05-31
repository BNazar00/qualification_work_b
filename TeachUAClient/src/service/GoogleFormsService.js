import fetchRequest from "./FetchRequest";
import {BASE_URL} from "./config/ApiConfig";

export const getGoogleFormResults = async (formId) => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/google-forms/responses/" + formId)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};
