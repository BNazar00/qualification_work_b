import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import YoutubeOutlined from "@ant-design/icons/lib/icons/YoutubeOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";
import React from "react";
import {Button} from "antd";
import "./css/SocialInfo.css"

const SocialInfo = () => {
    return (
        <div className="social-info">
            <div className="social-media">
                <span className="text">Наші контакти</span>
                <div className="links">
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
        </div>);
}
export default SocialInfo;