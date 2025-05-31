import {Checkbox, Form, Input, InputNumber, Steps} from "antd";
import React from "react";
import "./css/AddClubSider.css";

const {Step} = Steps;

const AddClubSiderMobile = ({step}) => {

    return (
        <Steps className="add-club-sider-mobile"
               style={{background: "#FAFAFA"}}
               current={step}>
            <Step style={{display: step == 0 ? "block" : "none"}} title="Основна інформація" />
            <Step style={{display: (step == 0 || step == 1 || step == 2)  ? "block" : "none"}} title="Контакти" />
            <Step style={{display: (step == 1 || step == 2) ? "block" : "none"}} title="Опис" />
        </Steps>
    )
};

export default AddClubSiderMobile;