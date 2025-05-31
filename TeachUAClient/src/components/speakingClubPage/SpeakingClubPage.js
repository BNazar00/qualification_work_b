import React, { useEffect } from "react";
import { Layout } from "antd";
import "./css/SpeakingClubPage.css";
import SpeakingClubBanner from "./SpeakingClubBanner";
import SpeakingClubDescription from "./SpeakindClubDescription";
import AboutHeader from "../mainPage/MainHeader";
const SpeakingClubPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <Layout className="global-padding speakingclub-page">
            <AboutHeader />
            <SpeakingClubBanner imageURL={`${process.env.PUBLIC_URL}/static/images/about/slider/maraton.jpg`} />
            <SpeakingClubDescription />
        </Layout>
    );
};

export default SpeakingClubPage;