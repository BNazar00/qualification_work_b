import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const questionsImport = async (data)=>{
    return await fetchRequest
        .post(BASE_URL+"/api/v1/question/import",{
            formId: data.formId
        })
        .then((response)=>{
            return response.data
        })
        .catch((error)=>{
            return error.response.data;
        });
};

export const getAllQuestions = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/question")
        .then((response) => {
            return response.data;
        });
};

export const loadDataToDatabase = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/question/excel",
        data
    )
        .then((response) => {
            return response.data
        }).catch((error) => {
            return error.response.data
        });
};

export const downloadExcel = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/question/excel", {

            headers: {"content-type": "application/octet-stream"},
            responseType: "blob"
        })
        .then(response => {
            let url = URL.createObjectURL(response.data);
            console.info(response.data)
            console.info(response)

            let anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "questions_export.xlsx";
            document.body.append(anchor);
            anchor.style = "dislay: none";
            anchor.click();
            anchor.remove();
            URL.revokeObjectURL(url);
        })
}
