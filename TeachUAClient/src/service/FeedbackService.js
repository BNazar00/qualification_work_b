import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const getFeedbackListByClubId = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/v1/club/feedback/" + id).then((response) => {
        return response.data
    });
};

export const createFeedback = async (text, rate, userId, clubId) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/club/feedback", {
        text: text,
        rate: rate,
        userId: userId,
        clubId: clubId
    }).then((response) => {
        return response.data
    });
};
