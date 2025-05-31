import React, {useEffect, useState} from "react";
import {Button, Layout} from "antd";
import Search from "../Search";
import "./css/aboutProject.css";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import YoutubeOutlined from "@ant-design/icons/lib/icons/YoutubeOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";


const AboutUsHeader = () => {

    return (
        <div>
            <div className="lower-header-box about-header">
                <div className="city-name-box">
                    <h2 className="city-name">
                        Ініціатива “Навчай українською”
                    </h2>
                </div>
                <Search redirect/>
            </div>
            <div className="title"
                 style={{background: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)),
                                      url(${process.env.PUBLIC_URL}/static/images/service/banerAboutUs.jpg) no-repeat 50% 25% / cover`}}>
                <span className="text">Навчай українською</span>
                <span className="content">Ініціатива</span>
            </div>
            <p/>
            <p/>
            <div className="social-info">
                <div className="social-media">
                    <span className="text">Наші контакти</span>
                    <div className="links">
                        <a target="_blank" href=""></a>
                        <a target="_blank" href="https://www.facebook.com/teach.in.ukrainian"><FacebookOutlined
                            className="icon"/></a>
                        <a target="_blank"
                           href="https://www.youtube.com/channel/UCP38C0jxC8aNbW34eBoQKJw"><YoutubeOutlined
                            className="icon"/></a>
                        <a target="_blank" href="https://www.instagram.com/yedyni.ruh/"><InstagramOutlined
                            className="icon"/></a>
                        <a target="_blank" href="mailto:teach.in.ukrainian@gmail.com"><MailOutlined className="icon"/></a>
                    </div>
                </div>
                <div className="help-button">
                    <a target="blank"
                       href="https://secure.wayforpay.com/payment/s0f2891d77061">
                        <Button className="flooded-button donate-button">
                            Допомогти проєкту
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );

};

export default AboutUsHeader;