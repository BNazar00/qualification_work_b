import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const loadDataCertificatesByTemplateToDB = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/certificate-by-template",
        data
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const loadTemplateName = async (value) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/certificate-by-template/pdf", {
            filePath: value
        }
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const validateCertificateExcelData = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/certificate-by-template/validate", data
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const saveGoogleFormCertificateData = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/certificate-by-template/save-gf", data
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const downloadInvalidCertificatesExcel = async (values) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/certificate-by-template/get-invalid-certificates-excel",
        JSON.stringify(values)
        , {
            headers: {"content-type": "application/octet-stream"},
            responseType: "blob"
        }
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error
    });
}
