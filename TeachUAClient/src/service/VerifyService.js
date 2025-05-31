import fetchRequest from "./FetchRequest";
import {BASE_URL} from "./config/ApiConfig";

export const verifyUser = async (verifyCode) => {
    return await fetchRequest.get(BASE_URL + "/api/v1/auth/password/verify?code=" + verifyCode)
        .then((response) => {
            return response;
        });
};
