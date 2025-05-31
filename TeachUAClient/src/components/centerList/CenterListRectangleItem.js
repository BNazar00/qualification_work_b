import {Button, Card, Popover, Rate} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React, {useState} from "react";
import CenterLogo from "./CenterLogo";
import "./css/CenterListRectangleItem.css";


const CenterListRectangleItem = ({center, onCenterClick}) => {
    const [visible, setVisible] = useState(false);

    const getRating = () => {
        let rating = 0;
        let ratedClubs = 0;
        center.clubs.forEach(club => {
            if (parseInt(club.rating)) {
                rating += parseInt(club.rating);
                ratedClubs++;
            }
        });
        return ratedClubs === 0 ? 0 : rating / ratedClubs;
    }

    return (
        <div>
            <Card className="card center-list-rectangle-item" onClick={() => onCenterClick(center)} key={center.name}>
                <div className="item-rectangle-row">
                    <div className="center-title">
                        <CenterLogo urlLogo={center.urlLogo}/>
                        <div className="center-name">{center.name}</div>
                    </div>
                </div>

                <div className="item-rectangle-row">
                    <div className="item-rating-address">
                        <Rate className="rating" disabled value={getRating()}/>
                        {
                            center.locations.length > 0 &&
                            <div className="center-address" onClick={() => {
                                setVisible(true)
                            }}>
                                <EnvironmentFilled
                                    className="address-icon"/>
                                {
                                    center.locations.length === 1 ?
                                        <span className="oneAddress"> {center.locations[0].address}</span>
                                        :
                                        <Popover
                                            className="popover"
                                            title="Локації"
                                            placement="topRight"
                                            content={
                                                center.locations.map(location =>
                                                <div>
                                                    <EnvironmentFilled className="address-small-icon"/>
                                                    <span className="text"> {location.address}</span>
                                                </div>
                                                )
                                            }
                                        >
                                            <span className="text" style={{display: "flex", alignItems: "center"}}>
                                                <span className="oneAddress">
                                                    {center.locations[0].address}
                                                </span>
                                                , і ще {center.locations.length - 1}
                                            </span>
                                        </Popover>
                                }
                            </div>
                        }
                    </div>
                    <Button className="outlined-button details-button">
                        <Link to={`/center/${center.id}`}>Детальніше</Link>
                    </Button>
                </div>
            </Card>
        </div>
    )
};
CenterListRectangleItem.propTypes = {
    center: PropTypes.object.isRequired
};

export default CenterListRectangleItem;