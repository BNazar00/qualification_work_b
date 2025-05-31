import React, {useEffect, useState} from "react";
import {Button, Layout, Result} from "antd";
import "./css/RegistrationPage.css";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined"
import AboutHeader from "../mainPage/MainHeader";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import {getChallengeProfile} from "../../service/ChallengeService";

const RegistrationPage = () => {
    const [challenge, setChallenge] = useState({
        id: 0,
        name: "",
        title: "",
        description: "",
        picture: "",
        sortNumber: 0,
        isActive: true,
        tasks: {},
        registrationLink: "",
        user: {
            id: 0,
            firstName: "",
            lastName: ""
        }
    });

    const params = useParams();

    useEffect(() => {
        getChallengeProfile(params.challengeId).then(response => {
            if (response.status === 404) {
                setChallenge(undefined);
            } else {
                setChallenge(response)
            }
        });
    }, []);

    return (
        <Layout className="global-padding marathon-page">
            {challenge && challenge.registrationLink  ?
                <div><AboutHeader/>
                    <div className="button-alain">
                        <Link to={"/challenges/" + params.challengeId}><Button className="details-back"><ArrowLeftOutlined/>Назад
                            до
                            челенджу</Button></Link>
                    </div>
                    <div className="google-form">
                        <iframe src={challenge.registrationLink} width="700" height="2000" frameborder="0"
                                marginheight="0"
                                marginwidth="0">Завантаження…
                        </iframe>
                    </div>
                </div> : <Result
                    className="challenge-not-found"
                    status="404"
                    title="404"
                    subTitle="Челендж який ви намагаєтесь відкрити не існує або немає форми реєстрації"
                />}
        </Layout>
    );
};

export default RegistrationPage;