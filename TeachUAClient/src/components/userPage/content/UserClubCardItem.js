import {Button, Card, Dropdown, Rate} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React from "react";
import {Link} from "react-router-dom";
import ClubLogo from "../../clubPage/header/ClubLogo";
import {getShortContent} from "../../editor/EditorConverter";
import Tags from "../../Tags";
import './css/UserClub.less';
import './css/UserClubCardItem.less';
import {MoreOutlined} from "@ant-design/icons";
import clubUpdateMenu from "./ClubUpdateMenu";


const UserClubCardItem = ({club, reloadAfterChange}) => {
    return (
        <Card className="card">
            <div className="title">
                <ClubLogo category={club.categories[0]} logo={club.urlLogo}/>
                <div className="side-menu">
                    <div className="update-club-dropdown">
                        <Dropdown overlay={clubUpdateMenu(club.id, reloadAfterChange)} placement="bottomRight">
                            <MoreOutlined/>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="title-name">{club.name}</div>
            <div className="club-tags-box">
                <Tags categories={club.categories.filter((el, index) => index < 2)}/>
                <span className="and">{club.categories.length > 2 && `і ще ${club.categories.length - 2}...`}</span>
            </div>
            <p className="description">{getShortContent(club.description)}</p>
            <Rate className="rating" disabled value={club.rating}/>
            <div className="address">
                <EnvironmentFilled
                    className="address-icon"/>
                <span className="text"> {club.locations.length === 0 ? "Онлайн" : club.locations[0].address}</span>
            </div>
            <Button className="outlined-button details-button">
                <Link to={`/club/${club.id}`}>Детальніше</Link>
            </Button>
        </Card>
    )
};

export default UserClubCardItem;