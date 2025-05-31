import React, { useEffect } from "react";
import {Button, Layout, Menu} from "antd";
import "./css/Page.css";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined"

import AboutHeader from "../mainPage/MainHeader";
import {Link} from "react-router-dom";


const MarathonPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <Layout className="global-padding marathon-page">
            <AboutHeader />
            <div className="button-alain">
            <Link to="/challengeUA"><Button className="details-back"><ArrowLeftOutlined />Назад до челенджу</Button></Link>
            </div>
          <div className = "google-form">
           <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScleEh1yGaJ3ZkgDfM7hAqgc2w2NP_znchFKmq_qp-6iv7IeQ/viewform?embedded=true" width="700" height="2000" frameborder="0" marginheight="0" marginwidth="0">Завантаження…</iframe>
         </div>
        </Layout>
    );
};

export default MarathonPage;