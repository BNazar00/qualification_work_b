import React, {useRef} from "react";
import {Carousel} from "antd";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import {Link} from "react-router-dom";
import "./css/NewsCarousel.css";
import moment from "moment";
import {BASE_URL} from "../../service/config/ApiConfig";

const NewsCarousel = ({newsList}) => {

    const DATE_FORMAT = "DD.MM.YYYY";

    const carousel = useRef(null);
    const settings = {
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3
    }

    return (<div className="news-carousel-block">
        <ArrowLeftOutlined className="arrow" onClick={() => {carousel.current.prev(); console.log(newsList)}}/>
        <Carousel {...settings} ref={node => carousel.current = node} className="news-carousel" >
            {newsList.map((news) =>
                <div className="carousel-container">
                        <div className="carousel-item">
                            <div id="newsImage" style={{
                                background: `url("${BASE_URL + news.urlTitleLogo}") center / cover`
                            }}></div>
                            <div id="newsData">
                                <div>
                                    <div id="newsTitle">{news.title}</div>
                                    <div id="newsDate">{moment(news.date.toString()).format(DATE_FORMAT)}</div>
                                </div>
                                <div id="detailButton">
                                    <Link to={`/news/${news.id}`}>Детальніше <ArrowRightOutlined /></Link>
                                </div>
                            </div>
                        </div>
                </div>)}
        </Carousel>
        <ArrowRightOutlined className="arrow" onClick={() => carousel.current.next()}/>
    </div>
    )

};

export default NewsCarousel;