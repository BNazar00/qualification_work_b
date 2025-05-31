import {Steps} from "antd";
import React from "react";
import "./css/EditCenter.css";

const {Step} = Steps;

const AddCenterSiderMobile = ({step}) => {
    return (
        <div
            className="side-mobile">
            <Steps
                direction="horizontal"
                current={step}>
                <Step style={{display: step == 0 ? "block" : "none"}} title="Основна інформація"></Step>
                <Step style={{display: (step == 0 || step == 1)? "block" : "none"}}title="Контакти"></Step>
                <Step style={{display: (step == 1 || step == 2 || step == 3) ? "block" : "none"}} title="Опис"></Step>
                <Step style={{display: (step == 2 || step == 3)? "block" : "none"}}title="Гуртки"></Step>
            </Steps>
        </div>
    )

};

export default AddCenterSiderMobile;