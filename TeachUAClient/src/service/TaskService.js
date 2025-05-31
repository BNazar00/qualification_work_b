import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const getTasksByChallenge = (id) => {
    return fetchRequest.get(BASE_URL + "/api/v1/challenge/task?challengeId=" + id)
        .then((response) => {
            return response.data;
        });
};

export const getTasks = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/challenge/task")
        .then((response) => {
            return response.data;
        });
};

export const createTask = async (data, id) => {
    return await fetchRequest
        .post(BASE_URL + "/api/v1/challenge/task?challengeId=" + id, {
            name: data.name,
            headerText: data.headerText,
            description: data.description,
            startDate: data.startDate,
            picture: data.picture && data.picture.file.response,
            challengeId: data.challengeId
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error.response);
            if (!id) {
                error.response.message = "Please, select challenge";
                return error.response;
            }
            return error.response.data;
        });
};

export const deleteTask = async (id) => {
    return await fetchRequest
        .delete(BASE_URL + "/api/v1/challenge/task/" + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const updateTask = async (data, id) => {
    return await fetchRequest
        .put(BASE_URL + "/api/v1/challenge/task/" + id, {
            name: data.name,
            headerText: data.headerText,
            description: data.description,
            startDate: data.startDate,
            picture: data.picture,
            challengeId: data.challengeId
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const getTask = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/v1/challenge/task/" + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error);
            return error.response.data
        });
};
