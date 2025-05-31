import {Header} from "antd/es/layout/layout";
import React, {useState} from "react";
import PropTypes from 'prop-types';
import './css/PageHeader.css';
import {Button} from "antd";
import Tags from "../../Tags";
import ClubLogo from "./ClubLogo";
import {BASE_URL} from "../../../service/config/ApiConfig";
import SignUpForClub from "../messages/SignUpForClub";

const PageHeader = ({club}) => {

    const [signUpForClubVisible, setSignUpForClubVisible] = useState(false);
    const DEFAULT_BACKGROUND = "/static/images/club/bg_2.png";

    return (
        <Header className="page-header" style={{
            background: `url(${club.urlBackground == null || club.urlBackground === DEFAULT_BACKGROUND ? process.env.PUBLIC_URL + DEFAULT_BACKGROUND
                : BASE_URL + club.urlBackground}) 50% 50% / cover no-repeat`
        }}>
            <div className="blur">
                <div className="row">
                    <div className="tags-name-box">
                        <div className="name-box">
                            <ClubLogo logo={club.urlLogo} category={club.categories[0]}/>
                            <span className="club-name">{club.name}</span>
                        </div>
                        <Tags categories={club.categories}/>
                    </div>
                    <div className="apply-box">
                        <Button className="flooded-button apply-button"
                                onClick={() => setSignUpForClubVisible(true)}
                        >
                            Записатись на гурток
                        </Button>
                        <SignUpForClub isShowing={signUpForClubVisible}
                                       setShowing={setSignUpForClubVisible}
                                       club={club}
                        />
                    </div>
                </div>
            </div>
        </Header>
    )
};

PageHeader.propTypes = {
    club: PropTypes.object.isRequired
};

export default PageHeader;