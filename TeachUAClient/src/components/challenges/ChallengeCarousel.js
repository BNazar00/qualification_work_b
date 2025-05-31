import React, {useRef} from "react";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import {Carousel} from "antd";
import PrimitiveCard from "../PrimitiveCard";
import "./css/DayCarousel.css";
import {BASE_URL} from "../../service/config/ApiConfig";

const ChallengeCarousel = ({challenge}) => {

    const data = challenge.tasks;


    const carousel = useRef(null);
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,

        slidesToShow: data.length > 4 ? 4 : data.length,
        slidesToScroll: data.length > 4 ? 4 : data.length,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: data.length > 3 ? 3 : data.length,
                    slidesToScroll: data.length > 3 ? 3 : data.length,
                },
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: data.length > 2 ? 2 : data.length,
                    slidesToScroll: data.length > 2 ? 2 : data.length,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
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


    return (<div className="challenge-day-carousel">
        <div className="challenge-day-header">
            <h2 className="label">Завдання челенджу</h2>
        </div>
        <div className="challenge-day-block">
            <ArrowLeftOutlined
                className="arrows-prev"
                onClick={() => carousel.current.prev()}
            />
            <ArrowRightOutlined
                className="arrows-next"
                onClick={() => carousel.current.next()}
            />
            <div className="challenge-day-cards">
                <Carousel
                    {...settings}
                    ref={(node) => (carousel.current = node)}
                    className="about-carousel">
                    {data.map((task) => (
                        <PrimitiveCard
                            key={task.id}
                            header={
                                <div className="title">
                                    <div className="day-image-box" style={{backgroundColor: "#FFFFFF"}}>
                                        <img className="day-image"
                                             src={BASE_URL + task.picture}/>
                                    </div>
                                    <div className="name">
                                        {task.name}
                                    </div>
                                </div>
                            }
                            link={{pathname: "/challenges/task/" + task.id}}
                            buttonText="Переглянути"
                        />
                    ))}
                </Carousel>
            </div>
        </div>

    </div>);

}

export default ChallengeCarousel;