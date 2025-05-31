import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const getAllMetrics = () => {
    return fetchRequest.get(BASE_URL + "/api/prometheusKeysAndValues")
        .then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response;
        });
};