import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const LOAD_EXCEL_TO_DB = BASE_URL + "/api/v1/club/load-excel-to-db";

export const loadExcelToDatabase = async (data) => {
    return await fetchRequest.post(LOAD_EXCEL_TO_DB,
        data
    )
        .then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};
