import React, {useEffect, useState} from "react";
import {getAllCurrentNews, getNewsById} from "../../service/NewsService";
import {Button, Layout, Result} from "antd";
import {BASE_URL} from "../../service/config/ApiConfig";
import {useParams} from "react-router-dom";
import "./css/NewsPage.css";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import YoutubeOutlined from "@ant-design/icons/lib/icons/YoutubeOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";
import moment from "moment";
import Loader from "../Loader";
import NewsCarousel from "./NewsCarousel";
import {Helmet} from "react-helmet";

const NewsPage = () => {

    const [news, setNews] = useState();
    const [newsList, setNewsList] = useState([]);
    const {id} = useParams();
    const [load, setLoad] = useState(true);

    const DATE_FORMAT = "DD.MM.YYYY";

    useEffect(() => {
        setLoad(true);
        getData();
    }, [id]);

    const getData = () => {
        getNewsById(id).then(response => {
            console.log(response);
            if (response.status) {
                setNews(undefined)
            } else {
                setNews(response);
            }
            setLoad(false)
        })
        // exlude current news from another news list
        getAllCurrentNews().then(response => {
            setNewsList(response.filter(news => news.id != id));
        })
    }

    return load ? <Loader /> : <Layout className="global-padding">{
        news ? (
            <div className="news-page">
                <div className="image"
					style={{ background: `url("${BASE_URL + news.urlTitleLogo}") center / cover` }}>
					<div id="major-title">{news.title}</div>
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
                        <div id="title">{news.title}</div>
                        <div id="date">{moment(news.date.toString()).format(DATE_FORMAT)}</div>
                    </div>
                    <div className="content-text">
                        <div id="description" dangerouslySetInnerHTML={{__html: `${news.description}`}}></div>
                    </div>
                </div>
                <div className="other-news">
                    <div className="title">Інші новини</div>
                    <NewsCarousel newsList={newsList}/>
				</div>
				<Helmet>
					<script type="text/javascript" >
						{`
						let lastKnownScrollPosition = 0;
						let image = document.getElementsByClassName('image')[0];
						window.addEventListener('scroll',(event) => {
							lastKnownScrollPosition = window.scrollY;
							bgPositionY = 50 + lastKnownScrollPosition/15;
							if (bgPositionY < 100) {
								image.style.backgroundPosition =  "50% " + bgPositionY + "%";
							}
						});
						`}
					</script>
            	</Helmet>
            </div>
        ) : <Result
            className="news-not-found"
            status="404"
            title="404"
            subTitle="Новина яку ви намагаєтесь відкрити не існує або у вас немає доступу"
        />}
    </Layout>
};

export default NewsPage;