import {Steps} from "antd";
import React from "react";
import "./css/EditCenter.css";

const {Step} = Steps;

const AddCenterSider = ({step}) => {
    return (
        <div
            className="side">
            <Steps
                direction="vertical"
                current={step}>
                <Step title="Основна інформація"></Step>
                <Step title="Контакти"></Step>
                <Step title="Опис"></Step>
            </Steps>
        </div>
    )

};

export default AddCenterSider;