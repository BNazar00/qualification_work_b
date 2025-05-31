
import React, { useState, useEffect, useRef } from "react";

import PrimitiveCard from "../PrimitiveCard";
import "./css/DayCarousel.css";
import { Button, Carousel } from "antd";
import   marathonDay from "./DayData/DataObjects"
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";


const DayCarousel = () => {
    
    
   const data =  marathonDay.marathonDay;

   const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
   const startOfChallenge = new Date(2021, 10, 5);
   const today = new Date();
   let dayCount = today - startOfChallenge;
   if(dayCount < 0) {
       dayCount = 0;
   }
   const diffDays = Math.ceil(Math.abs(dayCount / oneDay)); //appear at 00:00
   data.length = diffDays;

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
                    slidesToShow: data.length > 3 ? 3: data.length,
                    slidesToScroll: data.length > 3 ? 3 : data.length,
                },
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: data.length > 2 ? 2: data.length,
                    slidesToScroll: data.length > 2 ? 2: data.length,
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

    return (
      
        <div className="challenge-day-carousel">
            {dayCount > 0 && <div className="challenge-day-header">
                <h2 className="label">Завдання челенджу</h2>
            </div>}

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
                        {data.map((day) => (
                            <PrimitiveCard
                                key={day.id}
                                header={
                                    <div className="title">
                                        <div className="day-image-box" style={{backgroundColor: "#FFFFFF"}}>
                    <img className="day-image"
                         src={process.env.PUBLIC_URL + "/static/images/marathon/challengeUA.jpg"} />
                </div>
                                        <div className="name">
                                            {day.name}
                                        </div>
                                    </div>
                                }
                             
                                link={{
                                    pathname: "/challengeUA/task/"+day.pathUrl,
                                  
                                }}
                                buttonText="Переглянути"
                            />
                        ))}
                    </Carousel>
                </div>
            </div>
           
        </div>
    );
};

export default DayCarousel;