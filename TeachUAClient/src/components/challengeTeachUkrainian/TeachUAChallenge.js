import React, { useEffect } from "react";
import { Layout } from "antd";
import "./css/Page.css";
import Banner from "./Banner";
import Description from "./Description";
import AboutHeader from "../mainPage/MainHeader";
import DayCarousel from "./DayCarousel";
const TeachUAChallenge = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <Layout className="global-padding marathon-page">
            <AboutHeader />
            <Banner imageURL={`${process.env.PUBLIC_URL}/static/images/about/slider/maraton.jpg`} />
            <Description />
            <DayCarousel/>
        </Layout>
    );
};

export default TeachUAChallenge;