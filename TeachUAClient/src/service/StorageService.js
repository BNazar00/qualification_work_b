export const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

export const saveUserId = (id) => {
    localStorage.setItem("id", id);
}

export const saveRole = (role) => {
    localStorage.setItem("role", role);
}

export const deleteTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

export const deleteUserId = () => {
    localStorage.removeItem("id");
}

export const deleteRole = () => {
    localStorage.removeItem("role");
}

export const deleteUserStorage = () => {
    deleteTokens();
    deleteUserId();
    deleteRole();
}

export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
}

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
}

export const getUserId = () => {
    return localStorage.getItem("id");
}

export const getRole = () => {
    return localStorage.getItem("role");
}