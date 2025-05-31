import React, {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
import {Button, Layout, Result} from "antd";
import AboutHeader from "../mainPage/MainHeader";
import SocialInfo from "../SocialInfo";
import {getChallengeProfile} from "../../service/ChallengeService";
import "./css/ChallengePage.css";
import ChallengeDescription from "./ChallengeDescription";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import ChallengeBanner from "./ChallengeBanner";
import ChallengeCarousel from "./ChallengeCarousel";

const ChallengePage = () => {
    const [challenge, setChallenge] = useState({
        id: 0,
        name: "",
        title: "",
        description: "",
        picture: "",
        sortNumber: 0,
        isActive: true,
        tasks: [],
        user: {
            id: 0,
            firstName: "",
            lastName: ""
        }
    });
    const location = useLocation();
    const params = useParams();

    const getData = () => {
        getChallengeProfile(params.challengeId).then(response => {
            if (response.status > 400) {
                setChallenge(undefined);
            } else {
                setChallenge(response);
            }
        });
    }

    useEffect(() => {
        getData();
    }, [location]);

    return (
        <Layout className="global-padding challenge-page">
            {challenge ?
                (<div>
                    <AboutHeader/>
                    <ChallengeBanner challenge={challenge}/>
                    <SocialInfo/>
                    <ChallengeDescription challenge={challenge}/>
                    {challenge.registrationLink &&
                    <div className="button-div">
                        <Link to={"/challenges/registration/" + params.challengeId}>
                            <Button className="details-button">Зареєструватись</Button>
                        </Link>
                    </div>}
                    {
                        (challenge.tasks && challenge.tasks.length !== 0)  &&
                        <ChallengeCarousel challenge={challenge}/>
                    }
                </div>)
                : <Result
                    className="challenge-not-found"
                    status="404"
                    title="404"
                    subTitle="Челендж який ви намагаєтесь відкрити не існує або у вас немає до нього доступу"
                />}
        </Layout>
    );
};
export default ChallengePage;