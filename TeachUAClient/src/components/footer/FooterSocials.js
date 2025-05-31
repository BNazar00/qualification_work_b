import React from 'react';
import YoutubeOutlined from "@ant-design/icons/lib/icons/YoutubeOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";

const FooterSocials = () => {

    return (
        <div className="footer-social">
            <a href={process.env.PUBLIC_URL}>
                <div className="footer-logo"/>
            </a>
            <div className="description">
                <div className="text">
                    <span> Нам небайдуже майбутнє </span>
                    <span>дітей та української мови</span>
                </div>
            </div>
            <div className="social-media">
                <div className="links">
                    <a target="_blank" href="https://www.facebook.com/teach.in.ukrainian"><FacebookOutlined className="icon" /></a>
                    <a target="_blank" href="https://www.youtube.com/channel/UCP38C0jxC8aNbW34eBoQKJw"><YoutubeOutlined className="icon"/></a>
                    <a target="_blank" href="https://www.instagram.com/yedyni.ruh/"><InstagramOutlined className="icon"/></a>
                    <a target="_blank" href=""></a>
                </div>
            </div>
            <div className="qubstudio">
                ©2021-2022 Design by Qubstudio & Development by SoftServe
            </div>
        </div>
    );
};

export default FooterSocials