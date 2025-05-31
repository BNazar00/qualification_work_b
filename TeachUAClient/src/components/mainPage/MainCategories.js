import "./css/AboutDescription.css";
import React, { useState, useEffect, useRef } from "react";
import { getAllCategories } from "../../service/CategoryService";
import PrimitiveCard from "../PrimitiveCard";
import "./css/AboutCategories.css";
import CategoryLogo from "../CategoryLogo";
import { Button, Carousel } from "antd";
import "./css/AboutCarousel.css";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";

const MainCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then((response) => {
            setCategories(response);
        });
    }, []);

    const carousel = useRef(null);
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 667,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="about-categories">
            <div className="categories-header">
                <h2 className="label">Оберіть напрям гуртків</h2>
                <a href={process.env.PUBLIC_URL + "/clubs"}>
                    <Button className="flooded-button more-button">
                        Всі гуртки
                    </Button>{" "}
                </a>
            </div>
            <div className="categories-carousel-block">
                <ArrowLeftOutlined
                    className="arrows-prev"
                    onClick={() => carousel.current.prev()}
                />
                <ArrowRightOutlined
                    className="arrows-next"
                    onClick={() => carousel.current.next()}
                />
                <div className="categories-cards">
                    <Carousel
                        {...settings}
                        ref={(node) => (carousel.current = node)}
                        className="about-carousel">
                        {categories.map((category) => (
                            <PrimitiveCard
                                key={category.id}
                                header={
                                    <div className="title">
                                        <CategoryLogo category={category} />
                                        <div className="name">
                                            {category.name}
                                        </div>
                                    </div>
                                }
                                description={category.description}
                                link={{
                                    pathname: "/clubs",
                                    state: {
                                        showAdvancedSearch: true,
                                        showActiveCategory: category.name,
                                    },
                                }}
                                buttonText="Переглянути"
                            />
                        ))}
                    </Carousel>
                </div>
            </div>
            <div className="categories-footer">
                <a href={process.env.PUBLIC_URL + "/clubs"}>
                    <Button className="flooded-button more-button">
                        Всі гуртки
                    </Button>{" "}
                </a>
            </div>
        </div>
    );
};

export default MainCategories;
