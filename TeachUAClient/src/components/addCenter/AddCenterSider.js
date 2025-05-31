import {Steps} from "antd";
import React, {useEffect, useState} from "react";
import "./css/AddCenter.css";

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
                <Step title="Гуртки"></Step>
            </Steps>
        </div>
    )

};

export default AddCenterSider;