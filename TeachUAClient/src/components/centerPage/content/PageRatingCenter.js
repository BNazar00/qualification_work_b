import React from "react";
import './css/PageRating.css';
import PropTypes from "prop-types";
import {Rate} from "antd";

const PageRatingCenter = ({rating, count}) => {
    let feedback;
    switch (count%10) {
        case 1 :
            feedback = "відгук"
            break;
        case 2 :
            feedback = "відгуки"
            break;
        case 3 :
            feedback = "відгуки"
            break;
        case 4 :
            feedback = "відгуки"
            break;
        default :
            feedback = "відгуків"
    }
    return (
        <div className="page-rating">
            <Rate allowHalf disabled value={rating}/>
            <span className="feedback">{count} {feedback}</span>
        </div>
    )
};

PageRatingCenter.propTypes = {
    rating: PropTypes.symbol.isRequired
};

export default PageRatingCenter;