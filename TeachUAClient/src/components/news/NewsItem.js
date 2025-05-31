import React, {useEffect, useState} from "react";
import "./css/NewsItem.css";
import {BASE_URL} from "../../service/config/ApiConfig";
import {Link, useHistory} from "react-router-dom";
import moment from "moment";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";


const NewsItem = ({news}) => {

    const DATE_FORMAT = "DD.MM.YYYY";
    const history = useHistory();

    const handleClick = () => {
        history.push("/news/" + news.id)
    }
    //console.log("**********news.urlTitleLogo = " + news.urlTitleLogo );
    return (
        <div id="newsContainer" onClick={handleClick}>
            <div id="newsImage" style={{
                background: `url("${BASE_URL + news.urlTitleLogo}") center / cover`
            }}></div>
            <div id="newsData">
                <div id="newsDate">{moment(news.date.toString()).format(DATE_FORMAT)}</div>
                <div id="newsTitle">{news.title}</div>
                <div id="detailButton">
                    <Link to={`/news/${news.id}`}>Детальніше <ArrowRightOutlined /></Link>
                </div>
            </div>

        </div>
    )

};

export default NewsItem;