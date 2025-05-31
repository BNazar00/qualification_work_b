import axios from "axios";
import { getAccessToken } from "./StorageService";

export const fetchRequest = axios.create({
    headers: {
        "content-type": "application/json"
    }
})

/**
 * Use this axios instance only for authentication or refresh token
 */
export const authRequest = axios.create({
    headers: {
        "content-type": "application/json"
    }
})

fetchRequest.interceptors.request.use(
    config => {
        const accessToken = getAccessToken();
        if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
    },
    error => Promise.reject(error)
)

export default fetchRequest;