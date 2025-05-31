import React, {useEffect, useState} from "react";
import Layout from "antd/lib/layout/layout";
import "./css/serviceInUkr.css";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import YoutubeOutlined from "@ant-design/icons/lib/icons/YoutubeOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined"
import {Button, Collapse} from "antd";
import CaretRightOutlined from "@ant-design/icons/lib/icons/CaretRightOutlined";
import {getAllQuestions} from "../../service/QuestionService";
import Search from "../Search";
import "../AboutProject/css/aboutProject.css";

const ServiceInUkr = () => {
    const {Panel} = Collapse;
    const [questions, setQuestions] = useState([]);

    const getData = () => {
        getAllQuestions().then(response => setQuestions(response))
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Layout className="serviceInUkr global-padding">
            <div className="lower-header-box about-header">
                <div className="city-name-box">
                    <h2 className="city-name">Ініціатива “Навчай українською”</h2>
                </div>
                <Search redirect/>
            </div>
            <div className="title"
                 style={{background: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), 
                                        url(${process.env.PUBLIC_URL}/static/images/service/serviceInUkr.png) center / cover`}}>
                <span className="text">Послуги українською</span>
            </div>
            <p/><p/>
            <div className="social-info">
                <div className="social-media">
                    <span className="text">Наші контакти</span>
                    <div className="links">
                        <a target="_blank" href=""></a>
                        <a target="_blank" href="https://www.facebook.com/teach.in.ukrainian"><FacebookOutlined className="icon"/></a>
                        <a target="_blank" href="https://www.youtube.com/channel/UCP38C0jxC8aNbW34eBoQKJw"><YoutubeOutlined className="icon"/></a>
                        <a target="_blank" href="https://www.instagram.com/yedyni.ruh/"><InstagramOutlined className="icon"/></a>
                        <a target="_blank" href="mailto:teach.in.ukrainian@gmail.com"><MailOutlined className="icon"/></a>
                    </div>
                </div>
                <div className="help-button">
                    <a target="blank" href="https://secure.wayforpay.com/payment/s0f2891d77061"><Button className="flooded-button donate-button">Допомогти
                        проєкту</Button> </a>
                </div>
            </div>
            <div className="content">
                <div className="content-title">
                    Освітні послуги українською мовою у закладах позашкільної освіти
                </div>
                <div className="content-text">
                    Із 16 січня 2021 набуває чинності стаття 30 закону “Про забезпечення функціонування української мови
                    як державної” про державну мову у сфері обслуговування споживачів. З 16 січня всі надавачі послуг,
                    незалежно від форми власності, зобов’язані обслуговувати споживачів і надавати інформацію про
                    товари і послуги державною мовою. Громадяни мають право отримати освітні послуги українською мовою у
                    закладах позашкільної освіти.
                </div>
            </div>
            <div className="faq">
                <div className="faq-title">Популярні Питання (FAQ)</div>

                <Collapse className="collapse"
                          defaultActiveKey={['1']}
                          expandIconPosition="start"
                          expandIcon={({isActive}) => <CaretRightOutlined style={{color: '#2E69C9'}}
                                                                          rotate={isActive ? 90 : 0}/>}
                >
                    <Panel className="panel"
                           header="Як діяти, якщо вам відмовляють в інформації чи послугах українською мовою" key="1">
                        <p>- Спочатку варто спробувати владнати ситуацію на місці та попросити працівника обслуговувати
                            вас державною мовою.
                            - У разі відмови працівника, звернутись до керівництва закладу або на “гарячу лінію”
                            установи.
                            - У разі відмови або не забезпечення надання інформації (послуг) державною мовою необхідно
                            зафіксувати факт відмови (за допомогою аудіо-, відео, письмового підтвердження очевидців
                            тощо) та дані суб’єкта господарювання (назву, місцезнаходження, контакти суб’єкта).
                        </p>
                    </Panel>
                </Collapse>
                <Collapse className="collapse"
                          expandIconPosition="start"
                          expandIcon={({isActive}) => <CaretRightOutlined style={{color: '#2E69C9'}}
                                                                          rotate={isActive ? 90 : 0}/>}>
                    <Panel className="panel" header="Куди можна подавати скаргу" key="2">
                        <p>Ви можете подати скаргу до Уповноваженого із захисту державної мови на поштову адресу 01001, м. Київ, провулок Музейний, 12, електронну скриньку skarha@mova-ombudsman.gov.ua або заповнити відповідну форму на сайті Уповноваженого https://mova-ombudsman.gov.ua/</p>
                    </Panel>
                </Collapse>
                <Collapse className="collapse"
                          expandIconPosition="start"
                          expandIcon={({isActive}) => <CaretRightOutlined style={{color: '#2E69C9'}}
                                                                          rotate={isActive ? 90 : 0}/>}>
                    <Panel className="panel" header="Що має містити скарга" key="3">
                        <p>У скарзі обов’язково має бути зазначено: прізвище, ім’я, по батькові, місце проживання особи, викладено суть скарги, який саме суб’єкт/працівник суб’єкта, коли, за якою адресою, яким чином порушив право скаржника. Рекомендуємо також додати докази на підтвердження.</p>
                    </Panel>
                </Collapse>
            </div>
        </Layout>
    )
}
export default ServiceInUkr;