import React, {useState, useEffect} from "react";
import {Layout} from "antd";
import NewsList from "./NewsList";
import NewsHeader from "./NewsHeader";
import ClubSider from "./ClubSider";
import "./css/NewsList.css"
import Loader from "../Loader";
import {getNewsList} from "../../service/NewsService";
import {getTopClubsByCity} from "../../service/ClubService";
import {searchParameters} from "../../context/SearchContext";

const NewsListComponent = () => {
    const [load, setLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [newsList, setNewsList] = useState([]);
    const [clubs, setClubs] = useState([]);

    const getTopClubs = () => {
        getTopClubsByCity(searchParameters.cityName, 3).then(response => {
            setClubs(response);
        })
    };

    useEffect(() => {
        setLoad(true);
        getTopClubs();
        getNewsList(currentPage).then(response => {
            setNewsList(response);
            setLoad(false);
        })
    }, [currentPage]);

    return load ? <Loader/>: (
        <Layout>
            <NewsHeader/>
            <div className="global-padding news-content">
                <NewsList className="newslist" newsList={newsList} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                {/*<ClubSider className="clubsider" clubs={clubs} reloadAfterChange={getTopClubs}/>*/}
            </div>
        </Layout>
    );
};

export default NewsListComponent;
