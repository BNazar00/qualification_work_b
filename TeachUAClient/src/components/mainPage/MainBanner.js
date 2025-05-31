import './css/AboutChallenge.css';
import React from "react";

const MainBanner = ({imageUrl}) => {
    return (
        <div>
            <a target="_blank" href=""/>
            <a target="_blank" href="https://www.facebook.com/events/2754499954695563">
                <img className="banner-image" src={imageUrl}/>
            </a>
        </div>
    );
};

export default MainBanner;