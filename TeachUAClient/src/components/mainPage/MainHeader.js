import React from "react";
import "./css/AboutHeader.css"
import Search from "../Search";

const AboutHeader = () => {
    return (
        <div className="lower-header-box about-header">
            <div className="city-name-box">
                <h2 className="city-name">Ініціатива “Навчай українською”</h2>
            </div>
            <Search redirect/>
        </div>
    );
};

export default AboutHeader;