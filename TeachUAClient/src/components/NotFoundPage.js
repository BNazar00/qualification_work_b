import {Result} from "antd";
import React from "react";
import "./css/NotFoundPage.css";

const NotFoundPage = () => {
    return <Result
        className="page-not-found"
        status="404"
        title="404"
        subTitle="Сторінка яку ви намагаєтесь відкрити не існує"
    />;
}
export default NotFoundPage;