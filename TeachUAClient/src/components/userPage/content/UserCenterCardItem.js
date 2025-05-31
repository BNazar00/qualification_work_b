import {Card, Dropdown} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React from "react";
import './css/UserCenterCardItem.less';
import {MoreOutlined} from "@ant-design/icons";
import centerUpdateMenu from "./CenterUpdateMenu";
import CenterLogo from "../../centerList/CenterLogo";


const UserCenterCardItem = ({center, reloadAfterChange}) => {
    return (
        <Card className="center-card">
            <div className="center-information">
                <div className="center-left">
                    <div className="center-info">
                        <CenterLogo urlLogo={center.urlLogo} />
                        <div>
                            <div className="center-title">
                                Центр Розвитку
                            </div>
                            <div className="center-name">
                                {center.name}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="center-right">
                    <div className="center-edit-button">
                        <Dropdown overlay={centerUpdateMenu(center.id, reloadAfterChange)} placement="bottomRight">
                            <MoreOutlined/>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="center-address">
                <EnvironmentFilled className="address-icon"/>
                <span className="text"> {center.locations.length === 0 ? "Онлайн" : center.locations[0].address}</span>
            </div>
        </Card>
    )
};

export default UserCenterCardItem;

