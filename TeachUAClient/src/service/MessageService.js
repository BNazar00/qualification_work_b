import fetchRequest from "./FetchRequest";
import {BASE_URL} from "./config/ApiConfig";

export const createMessage = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/club/participant/message/", {
        text: data.text,
        senderId: data.senderId,
        recipientId: data.recipientId,
        clubId: data.clubId,
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data;
    });
}

export const getMessagesByRecipientId = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/v1/club/participant/message?recipientId=" + id)
        .then((response) => {
            return response.data
        });
}

export const updateMessageIsActiveById = async (id, data) => {
    return await fetchRequest.put(BASE_URL + "/api/v1/club/participant/message/active/" + id, {
        isActive: data.isActive
    }).then((response) => {
        return response.data
    });
}
