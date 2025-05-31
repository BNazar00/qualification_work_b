import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const getFilesWithPath = async (path) => {
    return await fetchRequest
        .get(BASE_URL + "/api/files/list?path=" + path)
        .then((response) => {
            return response;
        });
}

export const getUnusedFiles = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/files/orphaned-files" )
        .then((response) => {
            return response;
        });
}

export const readFileWithPath = async (path) => {
    return await fetchRequest
        .get(BASE_URL + "/api/files/read?path=" + path)
        .then((response) => {
            console.log(response);
            return response;
        });
}

export const deleteFileWithPath = async (path) => {
    return await fetchRequest
        .delete(BASE_URL + "/api/files/delete?path=" + path)
        .then((response) => {
            console.log(response);
            return response;
        });
}

export const downloadFileByPath = async (path, fileName) => {
    return await fetchRequest
        .get(BASE_URL + "/api/files/download?path=" + path + '/' + fileName, {
            responseType: "blob"
        })
        .then(response => {
            let url = URL.createObjectURL(response.data);
            let anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = fileName;
            document.body.append(anchor);
            anchor.style = "dislay: none";
            anchor.click();
            anchor.remove();
            URL.revokeObjectURL(url);
        })
}
