import {useContext, useEffect} from 'react'
import {authRequest, fetchRequest} from '../service/FetchRequest'
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import {deleteUserStorage, getAccessToken, getRefreshToken, saveTokens} from "../service/StorageService";
import {BASE_URL} from "../service/config/ApiConfig";


/**
 * This component was created to get access to AuthContext and History
 * inside axios response interceptor.
 * Additional authRequest instance of axios is used to avoid unwanted
 * requests on autentiacation an refreshig token. (as they also can return 401)
 */
const WithAxios = ({children}) => {
    const {setUser, setShowLogin} = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        fetchRequest.interceptors.response.use(
            response => response,
            async (error) => {
                console.log(error)
                const originalConfig = error.config;
                if (error.response) {
                    if (error.response.status === 401 && !originalConfig._retry) {
                        originalConfig._retry = true;
                        try {
                            const tokens = await authRequest.post(BASE_URL + "/api/v1/jwt/refresh", {
                                refreshToken: getRefreshToken(),
                            }).then(response => response.data);
                            const {accessToken, refreshToken} = tokens;
                            saveTokens(accessToken, refreshToken);
                            return fetchRequest(originalConfig);
                        } catch (refreshError) {
                            deleteUserStorage();
                            setUser({urlLogo: ''});
                            setShowLogin(true);
                            history.push("/");
                            return Promise.reject(refreshError);
                        }
                    }
                }
                return Promise.reject(error);
            }
        );
        fetchRequest.interceptors.request.use(async (config) => {
            if (isTokenExpired(getAccessToken())) {
                try {
                    const tokens = await authRequest.post(BASE_URL + "/api/v1/jwt/refresh", {
                        refreshToken: getRefreshToken(),
                    }).then(response => response.data);
                    const {accessToken, refreshToken} = tokens;
                    saveTokens(accessToken, refreshToken);
                    return fetchRequest(config);
                } catch (refreshError) {
                    deleteUserStorage();
                    setUser({urlLogo: ''});
                    setShowLogin(true);
                    history.push("/");
                    return Promise.reject(refreshError);
                }
            }


            const token = getAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }, [])

    return children;

    function isTokenExpired(token) {
        try {
            // Split the JWT into parts (Header, Payload, Signature)
            const [, payloadBase64] = token.split('.');
            if (!payloadBase64) {
                throw new Error("Invalid token format");
            }

            // Decode the payload from Base64 to a JSON string
            const payloadJson = atob(payloadBase64);

            // Parse the JSON string into an object
            const payload = JSON.parse(payloadJson);

            // Check for the `exp` field
            if (!payload.exp) {
                return true; // No `exp` field, treat as expired
            }

            // Get the current time in seconds
            const currentTime = Math.floor(Date.now() / 1000);

            // Check if the token is expired
            return payload.exp < currentTime;
        } catch (error) {
            console.error("Error checking token expiration:", error);
            return true; // Treat invalid tokens as expired
        }
    }
}

export default WithAxios
