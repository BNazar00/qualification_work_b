import React from "react";
import NewsItem from "./NewsItem";
import EmptySearch from "../EmptySearch";
import {Pagination} from "antd";
import "./css/NewsList.css";

const NewsList = ({newsList,currentPage, setCurrentPage}) => {

    const onPageChange = (page) => {
        setCurrentPage(page - 1);
        window.scrollTo(0, 0);
    };

    return newsList.length === 0 ? <EmptySearch/> : (
        <div>
            {newsList.content.map((news, index) => <NewsItem key={index} news={news}/>)}
            <Pagination className="pagination"
                        hideOnSinglePage
                        showSizeChanger={false}
                        onChange={onPageChange}
                        current={currentPage + 1}
                        pageSize={newsList.size}
                        total={newsList.totalElements}/>
        </div>
    )

};

export default NewsList;