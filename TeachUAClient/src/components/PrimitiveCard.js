import React from "react";
import { Link } from "react-router-dom";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import "./css/PrimitiveCard.css";

const PrimitiveCard = (props) => {
    return (
        <div className="primitive-card">
            <Link className="content" to={props.link}>
                {props.header}
                <div className="description">{props.description}</div>
                <div className="details">
                    {props.buttonText}
                    <ArrowRightOutlined className="arrow" />
                </div>
            </Link>
        </div>
    );
};

export default PrimitiveCard;
