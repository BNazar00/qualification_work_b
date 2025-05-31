import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const getNumberOfUnsentCertificates = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/certificate/generate")
        .then((response) => {
            return response.data;
        });
};

export const loadDataToDatabase = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/certificate",
        data
    )
        .then((response) => {
            return response.data
        }).catch((error) => {
            return error.response.data
        });
};

export const sendCertificatesScheduler = async () => {
    return await fetchRequest
        .post(BASE_URL + "/api/v1/certificate/scheduler")
        .then((response) => {
            return response.data;
        });
};

export const getSentCertificates = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/certificate")
        .then((response) => {
            return response.data;
        });
};

export const getCertificatesByUserName = async (data) => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/certificate", {
            params: {
                userName: data.userName
            }
        })
        .then((response) => {
            return response.data;
        })
}

export const getCertificatesOfAuthenticatedUser = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/user/certificates")
        .then((response) => {
            return response.data;
        })
}

export const downloadCertificate = async (id) => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/certificate/download/" + id, {
            headers: {"content-type": "application/pdf"},
            responseType: "blob"
        })
        .then(response => {
            let url = URL.createObjectURL(response.data);
            let anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "certificate.pdf";
            document.body.append(anchor);
            anchor.style = "dislay: none";
            anchor.click();
            anchor.remove();
            URL.revokeObjectURL(url);
            return response
        })
        .catch(async error => {
            return error.response;
        });
}

export const updateCertificateProfile = async (id, data) => {
    return await fetchRequest.put(BASE_URL + "/api/v1/certificate/" + id, {
        userName: data.userName,
        sendToEmail: data.sendToEmail,
        sendStatus: null,
        serialNumber: data.serialNumber,
        updateStatus: data.updateStatus
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data;
    });
}

export const getValidationResponse = (serialNumber) => {
    return fetchRequest.get(BASE_URL + "/api/v1/certificate/" + serialNumber)
    .then((response) => {
        return response.data;
    }).catch((error) =>{
        return error.response;
    })
};
