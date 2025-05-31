import fetchRequest from "./FetchRequest";
import {BASE_URL} from "./config/ApiConfig";
import {searchInputData, searchParameters} from "../context/SearchContext";
import {handleDownloadFile} from "../util/FileUtil";

export const getPossibleResults = async (parameters) => {
    return await fetchRequest.get(BASE_URL + "/api/v1/club/search", {
        params: {
            text: searchInputData.input,
            cityName: parameters.cityName
        }
    }).then((response) => {
        return response.data
    });
};

export const getPossibleResultsByText = async (text, parameters) => {
    return await fetchRequest.get(BASE_URL + "/api/v1/club/search", {
        params: {
            text: text,
            cityName: parameters.cityName
        }
    }).then((response) => {
        return response.data
    });
};

export const getResultSearchReport = async (parameters, fileName) => {
    const response = await fetchRequest.get(BASE_URL + `/api/v1/club/pdf/resultsearch`,
        {
            method: "get",
            responseType: "blob",
            params: {
                clubName: searchInputData.input,
                cityName: parameters.cityName,
                isOnline: parameters.isOnline,
                categoryName: parameters.categoryName
            }
        }
    )
    handleDownloadFile(response.data, fileName, "pdf")
}
