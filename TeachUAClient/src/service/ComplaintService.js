import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const createComplaint = async (text, userId, clubId) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/complaint", {
        text: text,
        userId: userId,
        clubId: clubId
    }).then((response) => {
        return response.data
    });
};
