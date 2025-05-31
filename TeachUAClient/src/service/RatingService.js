import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const updateRating = async () => {
    await fetchRequest.patch(BASE_URL + "/api/v1/club/rating").then((response) => {
        return response.data
    }).catch((error) => {
    });
    await fetchRequest.patch(BASE_URL + "/api/v1/center/rating").then((response) => {
        return response.data
    }).catch((error) => {
    });
};
