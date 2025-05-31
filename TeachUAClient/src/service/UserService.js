import { fetchRequest, authRequest } from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";
import { getRefreshToken } from "./StorageService";

export const resetPassword = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/auth/password/reset", {
        email: data.email,
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const changePassword = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/auth/password/reset/verify", {
        id: data.id,
        email: data.email,
        password: data.password,
        verificationCode: data.verificationCode
    }).then((response) => {
        return response.data
    });
};

export const getUserById = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/v1/user/" + id).then((response) => {
        return response.data
    });
};

export const signUp = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/auth/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        roleName: data.role,
        urlLogo: data.urlLogo && data.urlLogo.file.response
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const signIn = async (data) => {
    return await authRequest.post(BASE_URL + "/api/v1/auth/signin", {
        email: data.email,
        password: data.password
    }).then((response) => {
        return response.data
    });
};

export const refreshAccessToken = async () => {
    return await fetchRequest.post(BASE_URL + "/api/v1/jwt/refresh", {
        refreshToken: getRefreshToken(),
    }).then((response) => {
        return response.data
    });
}

export const revokeRefreshToken = async () => {
    return await authRequest.post(BASE_URL + "/api/v1/jwt/revoke", {
        refreshToken: getRefreshToken(),
    }).then((response) => {
        return response.data
    });
}

export const verify = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/auth/password/verify", {
        id: data.id,
        password: data.currentPassword
    }).then((response) => {
        return response.data
    });
};

export const updateUser = async (data) => {
    return await fetchRequest.put(BASE_URL + "/api/v1/user/" + data.id, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        roleName: data.roleName,
        urlLogo: data.urlLogo,
        status: data.status
    }).then((response) => {
        return response.data;
    });
};

export const updatePassword = async (data) => {
    return await fetchRequest.patch(BASE_URL + "/api/v1/user/" + data.id, {
        oldPassword: data.currentPassword,
        newPassword: data.password,
        newPasswordVerify: data.password
    }).then((response) => {
        return response.data
    });
};

export const getAllUsers = async () => {
    return await fetchRequest.get(BASE_URL + "/api/v1/user")
        .then((response) => {
            return response.data
        }).catch((error) => {
            return error.response.data
        })
};

export const getUsersByRole = async (role) => {
    return await fetchRequest.get(BASE_URL + "/api/v1/user/role/" + role)
        .then((response) => {
            return response.data
        }).catch((error) => {
            return error.response.data
        });
};

export const deleteUserById = async (id) => {
    return await fetchRequest.delete(BASE_URL + "/api/v1/user/" + id, {
        id: id
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};
