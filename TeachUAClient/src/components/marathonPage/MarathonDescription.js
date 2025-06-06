import React from 'react'
import { Link } from "react-router-dom";
import { Button } from "antd";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import YoutubeOutlined from "@ant-design/icons/lib/icons/YoutubeOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";

const MarathonDescription = () => {
    return (
 <div>
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
                        <a target="_blank" href="https://www.instagram.com/yedyni.ruhn/"><InstagramOutlined
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

            <div className="marathon-description">
                <div className="title">Мовомаратон «30 років - 30 кроків»</div>
                <div className="subtitle">30 днів української до 30-ї річниці Незалежності України.</div>
                <div className="text">
                    Мовомаратон, який допоможе перейти на українську мову, стартує 19 серпня і триватиме до 19 вересня. Учасники
                    отримуватимуть завдання та короткі навчальні матеріали, щоб покращити свої знання та навички спілкування українською
                    мовою, та матимуть можливість взяти участь у щонайменше 4-х вебінарах і отримати підтримку однодумців.
                    <br /><br />
                    Організатори - Ініціатива "Навчай українською" за підтримки Міністерства молоді та спорту України
                    <br /><br />
                    <a style={{color: '#58a6ff' }} href="https://speak-ukrainian.org.ua/">  https://speak-ukrainian.org.ua/ </a>
                    <br />
                    <a style={{color: '#58a6ff' }} href="https://www.facebook.com/teach.in.ukrainian">  https://www.facebook.com/teach.in.ukrainian </a>
                    <br />
                    <a style={{color: '#58a6ff' }} href="mailto:teach.in.ukrainian@gmail.com"> teach.in.ukrainian@gmail.com </a>
                    <br />
                    Українська гуманітарна платформа
                    <br />
                    <br />
                     <div className = "button-div"> 
                    <Link to="/marathon/registration"><Button className="details-button">Зареєструватись</Button></Link>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default MarathonDescription;
