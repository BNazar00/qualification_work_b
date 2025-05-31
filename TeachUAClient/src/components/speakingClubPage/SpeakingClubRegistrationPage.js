import React, { useEffect } from "react";
import {Button, Layout, Menu} from "antd";
import "./css/SpeakingClubPage.css";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined"

import AboutHeader from "../mainPage/MainHeader";
import {Link} from "react-router-dom";


const SpeakingClubRegistrationPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <Layout className="global-padding speakingclub-page">
            <AboutHeader />
            <div className="button-alain">
            <Link to="/speakingclub"><Button className="details-back"><ArrowLeftOutlined /> Клуб української мови "Розмовляй" </Button></Link>
            </div>
          <div className = "google-form">
           <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeFXmeSeswRBw5pvGsoeAQiZrlX83sc0ARhsaiOgLKDG6Cv7Q/viewform" width="700" height="2000" frameborder="0" marginheight="0" marginwidth="0">Завантаження…</iframe>
         </div>
        </Layout>
    );
};

export default SpeakingClubRegistrationPage;