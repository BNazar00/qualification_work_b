import { Button, Card, Popover, Rate } from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Tags from "../Tags";
import ClubLogo from "../clubPage/header/ClubLogo";
import { getShortContent } from "../editor/EditorConverter";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";
import DesktopOutlined from "@ant-design/icons/lib/icons/DesktopOutlined";
import ClubItemMap from "./ClubItemMap";
import "./css/ClubList.less"
import {logDOM} from "@testing-library/react";

import { PageContext } from "../../context/PageContext";

const ClubListItem = ({ club, onClubClick }) => {

    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Card className="card" key={club.name}>
                <div className="title" onClick={() => onClubClick(club)}>
                    <ClubLogo logo={club.urlLogo} category={club.categories[0]} />
                    <div className="name">{club.name}</div>
                </div>
                <div className="club-tags-box" onClick={() => onClubClick(club)}>
                    <Tags className="club-tags"
                        categories={club.categories.filter((_, idx) => idx < 2)} />
                    <span className="and">{club.categories.length > 2 && `і ще ${club.categories.length - 2}...`}</span>
                </div>
                { club.center ?
                    <div className="with-center" onClick={() => onClubClick(club)}>
                        <div className="center">
                            <img className="center-logo" src={club.center.urlLogo} alt="Center logo" />
                            <div className="center-description">
                                <span className="center-label">Центр розвитку</span>
                                <span className="center-name">{club.center.name}</span>
                            </div>
                        </div>
                        <div className="description">{getShortContent(club.description)}</div>
                    </div> :
                    <p className="description">{getShortContent(club.description)}</p>}
                {club.isOnline && <div className="club-online">
                    <DesktopOutlined className="club-online-icon" />
                    {/*<DribbbleOutlined className="club-online-icon"/>*/}
                    <span className="club-online-label">Гурток онлайн</span>
                </div>}
                <Rate className="rating" disabled value={club.rating} onClick={() => onClubClick(club)} />
                {
                    club.locations.length > 0 &&
                    <div className="address" onClick={() => { setVisible(true) }}>
                        <EnvironmentFilled
                            className="address-icon" />
                        {
                            club.locations.length === 1 ? <span className="oneAddress"> {club.locations[0].address}</span>
                                :
                                <Popover
                                    className="popover"
                                    title="Локації"
                                    placement="topRight"
                                    content={club.locations.map(location =>
                                        <div>
                                            <EnvironmentFilled className="address-small-icon" />
                                            <span className="text"> {location.address}</span>
                                        </div>
                                    )}>
                                    <span className="text"><span className="oneAddress"
                                    >{club.locations[0].address}</span>, і ще {club.locations.length - 1}</span>
                                    <EyeOutlined className="expand-icon" />
                                </Popover>
                        }
                    </div>
                }
                <Button className="outlined-button details-button">
                    <Link to={`/club/${club.id}`}>Детальніше</Link>
                </Button>
            </Card>
            <ClubItemMap club={club} visible={visible} setVisible={setVisible} />
        </div >
    )
};
ClubListItem.propTypes = {
    club: PropTypes.object.isRequired
};


export default ClubListItem;