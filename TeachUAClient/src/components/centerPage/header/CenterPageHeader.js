import {Header} from "antd/es/layout/layout";
import React from "react";
import PropTypes from 'prop-types';
import './css/PageHeader.css';
import {Button} from "antd";
import CenterLogo from "../../centerList/CenterLogo";
import {BASE_URL} from "../../../service/config/ApiConfig";

const CenterPageHeader = ({center}) => {
    return (
        !center ? <div className="empty-block"/> :
        <Header className="page-header" style={{background: `url(${BASE_URL}${center.urlBackgroundPicture}) 50% 50% / cover no-repeat`}}>
            <div className="blur">
                <div className="row">
                    <div className="tags-name-box">
                        <div className="name-box">
                            <CenterLogo urlLogo={center.urlLogo} back/>
                            <span className="center-name">{center.name}</span>
                        </div>
                    </div>
                    <div className="apply-box">
                        <Button className="flooded-button apply-button">Як записатись до центру </Button>
                    </div>
                </div>
            </div>
        </Header>
    )
};

CenterPageHeader.propTypes = {
    //center: PropTypes.object.isRequired
};

export default CenterPageHeader;