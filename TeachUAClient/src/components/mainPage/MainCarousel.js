import {Button, Carousel} from "antd";
import React, {useEffect, useRef, useState} from "react";
import './css/AboutCarousel.css';
import './css/CarouselItems.css';
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import {getAllBannerItems} from "../../service/BannerItemService";
import {BASE_URL} from "../../service/config/ApiConfig";
import {Link} from "react-router-dom";

const MainCarousel = () => {
    const carousel = useRef(null);

    const [bannerItems, setBannerItems] = useState([]);

    const getData = () => {
        getAllBannerItems().then(response => {
            setBannerItems(response)
        });
    };

    useEffect(() => {
        getData()
    }, []);

    return (bannerItems ? (
            <div className="about-carousel-block">
                <ArrowLeftOutlined className="arrow" onClick={() => carousel.current.prev()}/>
                <Carousel ref={node => carousel.current = node} className="about-carousel" autoplay>
                    {bannerItems.map((item) =>
                        <div>
                            <div className="carousel-item" style={{
                                background: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${BASE_URL + item.picture}) no-repeat 50% 28% / cover`
                            }}>
                                <div className="carousel-item-1">
                                    <h2 className="label">{item.title}</h2>
                                    <span className="description">{item.subtitle}</span>
                                    <Link to={item.link ? item.link : "#"}><Button
                                        className="details-button">Детальніше</Button></Link>
                                </div>
                            </div>
                        </div>)}
                </Carousel>
                {/*<Carousel ref={node => carousel.current = node} className="about-carousel" autoplay>*/}
                {/*    {items.items.map((item) =>*/}
                {/*        <div>*/}
                {/*            <div className="carousel-item" style={{*/}
                {/*                background: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${item.imageURL}) no-repeat 50% 28% / cover`*/}
                {/*            }}>*/}
                {/*                {item.body}*/}
                {/*            </div>*/}
                {/*        </div>)}*/}
                {/*</Carousel>*/}
                <ArrowRightOutlined className="arrow" onClick={() => carousel.current.next()}/>
            </div>) : <div/>
    );
};

export default MainCarousel;