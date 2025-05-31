import React, {useEffect} from "react";
import {BASE_URL} from "../../service/config/ApiConfig";

const ChallengeBanner = ({challenge}) => {
    return (
        <div className="banner" style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), 
                                    url(${BASE_URL+challenge.picture}) no-repeat 50% 28% / cover`
        }}>
            <span className="title">{challenge.title}</span>
        </div>
    )
}
export default ChallengeBanner;