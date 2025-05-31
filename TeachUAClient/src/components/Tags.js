import {Tag} from "antd";
import React from "react";
import PropTypes from "prop-types";
import MaskIcon from "./MaskIcon";

const Tags = ({categories, className}) => {
    return (
        <div className={`tags ${className ? className : ''}`}>
            {categories.map(category =>
                <Tag className="tag" key={category.id} style={{
                    backgroundColor: category.tagBackgroundColor,
                    color: category.tagTextColor,
                }}>
                    <MaskIcon maskColor={category.tagTextColor} iconUrl={category.urlLogo}/>
                    <span className="name">{category.name}</span>
                </Tag>)
            }
        </div>
    )
};

Tags.propTypes = {
    categories: PropTypes.array.isRequired
};

export default Tags;
