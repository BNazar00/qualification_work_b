import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const getAllContacts = async () => {
    return await fetchRequest.get(BASE_URL + "/api/v1/club/contact-type").then((response) => {
        return response.data
    });
};
