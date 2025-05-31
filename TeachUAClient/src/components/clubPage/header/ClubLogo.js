import React from "react";
import PropTypes from "prop-types";
import CategoryLogo from "../../CategoryLogo";
import { BASE_URL } from "../../../service/config/ApiConfig";
import { Avatar } from "antd";

const ClubLogo = ({logo, category}) => {
    
    const DEFAULT_LOGO = "#";

    return (
            !logo || logo === DEFAULT_LOGO  ?
                <CategoryLogo category={category}/> :
                <div className="icon-box">
                    <Avatar src={BASE_URL + logo} size={42}></Avatar>
                </div>
    )
};

ClubLogo.propTypes = {
    logo: PropTypes.object.isRequired
};

export default ClubLogo;