import { Button, Card, Popover, Rate } from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";
import DesktopOutlined from "@ant-design/icons/lib/icons/DesktopOutlined";
import CenterLogo from "./CenterLogo";
import "./css/CenterList.less"


const CenterListItem = ({ center, onCenterClick }) => {

    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Card className="card" key={center.name} >
                <div className="center-title" onClick={() => onCenterClick(center)}>
                    <CenterLogo urlLogo={center.urlLogo} />
                    <div className="center-name">{center.name}</div>
                </div>
                <div className="center-tags-box" onClick={() => onCenterClick(center)}>
                </div>
                {
                    <p className="center-description-in-block">
                        {center.description}
                    </p>
                }
                {/*<Rate className="center-rating" disabled value={center.rating} onClick={() => onCenterClick(center)} />*/}
                {
                    center.locations.length > 0 &&
                    <div className="address" onClick={() => { setVisible(true) }} >
                        <EnvironmentFilled
                            className="address-icon" />
                        {
                            center.locations.length === 1 ? <span className="oneAddress"> {center.locations[0].address}</span>
                                :
                                <Popover
                                    className="popover"
                                    title="Локації"
                                    placement="topRight"
                                    content={center.locations.map(location =>
                                        <div>
                                            <EnvironmentFilled className="address-small-icon" />
                                            <span className="text"> {location.address}</span>
                                        </div>
                                    )}>
                                    <span className="text"><span className="oneAddress"
                                    >{center.locations[0].address}</span>, і ще {center.locations.length-1}</span>
                                    <EyeOutlined className="expand-icon" />
                                </Popover>
                        }
                    </div>
                }
                <Button className="outlined-button details-button">
                    <Link to={`/center/${center.id}`}>Детальніше</Link>
                </Button>
            </Card>
            {/*<ClubItemMap club={club} visible={visible} setVisible={setVisible} />*/}
        </div >
    )
};
CenterListItem.propTypes = {
    center: PropTypes.object.isRequired,
};


export default CenterListItem;