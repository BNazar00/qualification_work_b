import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const createNews = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/v1/news", {
        title: data.title,
        date: data.date,
        isActive: data.isActive,
        description: data.description,
        urlTitleLogo: data.urlTitleLogo
    }).then((response) => {
        return response.data
    }).catch((error) => {
            return error.response.data;
    })
};

export const getPageableNews = async (size) => {
    return await fetchRequest.get(BASE_URL + "/api/v1/news/search?size=" + size)
        .then((response) => {return response.data});
};

export const getAllNews = async () => {
    return await fetchRequest.get(BASE_URL + "/api/v1/news")
        .then((response) => {return response.data})
        .catch((error) => {
            return error.response.data;
        });
};

export const getAllCurrentNews = async () => {
    return await fetchRequest.get(BASE_URL + "/api/v1/news/current")
        .then((response) => {return response.data})
        .catch((error) => {
            return error.response.data;
        });
};

export const updateNewsById = async (id, data) => {
    return await fetchRequest.put(BASE_URL + "/api/v1/news/" + id, {
        title: data.title,
        date: data.date,
        isActive: data.isActive,
        description: data.description,
        urlTitleLogo: data.urlTitleLogo})
        .then((response) => {
            return response.data})
        .catch((error) => {
            return error.response.data;
        });
};

export const deleteNewsById = async (id) => {
    return await fetchRequest.delete(BASE_URL + "/api/v1/news/" + id)
        .then((response) => {return response.data});
};

export const getNewsList = async (page) => {
    return await fetchRequest.get(BASE_URL + "/api/v1/news/search?page=" + page)
        .then((response) => {return response.data});
}

export const getNewsById = async (id) => {
    return await fetchRequest
        .get(BASE_URL + "/api/v1/news/" + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const getSimilarNewsByTitle = async (data) => {
    return await fetchRequest.get(BASE_URL + "/api/v1/news/search/similar", {
            params: {
                title: data.title
            }
         })
        .then((response) => {return response.data})
        .catch((error) => {
            return error.response.data;
        });
}
