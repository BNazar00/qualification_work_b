import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const createTemplate = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/certificate/template", {
        name: data.name,
        courseDescription: data.courseDescription,
        projectDescription: data.projectDescription,
        certificateType: data.certificateType,
        filePath: data.filePath,
        properties: JSON.stringify(data.properties)
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    });
};

export const loadTemplateMetadata = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/certificate/template/load-metadata",
        data
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getAllTemplates = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/certificate/template")
        .then((response) => {
            return response.data;
        });
};


export const getTemplateById = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/v1/certificate/template/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const updateTemplate = async (data) => {
    return await fetchRequest
        .put(BASE_URL + "/api/v1/certificate/template/" + data.id, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const deleteTemplate = async (id) => {
    return await fetchRequest
        .delete(BASE_URL + "/api/v1/certificate/template/" + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const downloadTemplate = async (id) => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/certificate/template/download/" + id, {
            headers: {"content-type": "application/pdf"},
            responseType: "blob"
        })
        .then(response => {
            let url = URL.createObjectURL(response.data);
            let anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "template.pdf";
            document.body.append(anchor);
            anchor.style = "dislay: none";
            anchor.click();
            anchor.remove();
            URL.revokeObjectURL(url);
            return response
        })
        .catch(async error => {
            console.log(JSON.parse(await error.response.data.text()));
            return error.response;
        });
}

