import React from "react";
import PropTypes from "prop-types";

const CategoryLogo = ({category}) => {

    return (
            !category ?
                <div className="icon-box" style={{backgroundColor: "#FFFFFF"}}>
                    <img className="icon"
                         src={process.env.PUBLIC_URL + "/static/images/clubs/unknown3.png"} />
                </div>
                :
                <div className="icon-box" style={{backgroundColor: category.backgroundColor}}>
                    <img className="icon" src={process.env.PUBLIC_URL + category.urlLogo} />
                </div>

    )
};

CategoryLogo.propTypes = {
    category: PropTypes.object.isRequired
};

export default CategoryLogo;
