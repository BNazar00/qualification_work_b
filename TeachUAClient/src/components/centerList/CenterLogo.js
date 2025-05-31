import React from "react";
import PropTypes from "prop-types";
import "./css/CenterLogo.css"
import {BASE_URL} from "../../service/config/ApiConfig";

const CenterLogo = ({urlLogo}) => {
    return (
        <div className="icon-box" >
            {urlLogo !== "https://www.logodesign.net/images/illustration-logo.png" ?
                <img className="center-icon" src={`${BASE_URL}${urlLogo}`} alt="Center logo"/>
                :
                <img className="center-icon" src={urlLogo} alt="Center logo"/>
            }
        </div>
    )
};

CenterLogo.propTypes = {
    urlLogo: PropTypes.string.isRequired
};

export default CenterLogo;