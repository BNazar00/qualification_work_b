import {Checkbox, Form, Input, InputNumber, Steps} from "antd";
import React from "react";
import Sider from "antd/es/layout/Sider";
import "./css/AddClubSider.css";

const { Step } = Steps;

const AddClubSider = ({step}) => {
    return (
        <Sider
            className="add-club-sider"
            width={252}>
            <Steps direction="vertical" current={step}>
                <Step title="Основна інформація" />
                <Step title="Контакти" />
                <Step title="Опис" />
            </Steps>
        </Sider>
    )
};

export default AddClubSider;