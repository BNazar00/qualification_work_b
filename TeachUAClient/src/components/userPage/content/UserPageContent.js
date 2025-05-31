import React from "react";
import {Content} from "antd/es/layout/layout";
import './css/UserContent.less';
import UserInformationComponent from "./UserInformationComponent";
import {Button, Dropdown, Select} from "antd";
import menu from "./AddMenu";
import {PlusOutlined} from "@ant-design/icons";
import UserCenterContent from "./UserCenterContent";
import UserClubContent from "./UserClubContent";
import PropTypes from "prop-types";
import PageContent from "../../clubPage/content/PageContent";
import {Menu} from "antd";
import AddCenter from "../../addCenter/AddCenter";
import AddClubModal from "../../addClub/AddClubModal";
import {useState} from "react";

const UserPageContent = () => {
    const [showAddClub, setShowAddClub] = useState(false);
    const [showAddCenter, setShowAddCenter] = useState(false);
    const [isCenterChecked, setIsCenterChecked] = useState(false);

    const onClubChange = (value) => {
        if (value === "center") {
            setIsCenterChecked(true);
        } else {
            setIsCenterChecked(false);
        }
    };

    const menu = () => {
        return (
            <Menu className="menu">
                <Menu.Item className="menu-item">
                    <div onClick={() => setShowAddClub(true)}>Додати гурток</div>
                </Menu.Item>
                <Menu.Item>
                    <div onClick={() => setShowAddCenter(true)}>Додати центр</div>
                </Menu.Item>
            </Menu>
        )
    };

    return (
        <Content className="user-content">
            <div className="content-title">Мій профіль</div>
            <UserInformationComponent/>
            <div>
                <div className="club-title">Мої &nbsp;
                    <Select onChange={onClubChange}
                            className="club-center-select"
                            defaultValue="club">
                        <option selected="selected" value="club">
                            <span>гуртки</span>
                        </option>
                        <option value="center">
                            <span>центри</span>
                        </option>
                    </Select>
                    <div className="add-club-dropdown">
                        <AddClubModal isShowing={showAddClub} setShowing={setShowAddClub}/>
                        <AddCenter isShowing={showAddCenter} setShowing={setShowAddCenter}/>
                        <Dropdown сlassname overlay={menu} placement="bottomRight">
                            <Button className="add-button">
                                <PlusOutlined/>
                                Додати</Button>
                        </Dropdown>
                    </div>
                </div>
                {isCenterChecked === true ? (
                    <UserCenterContent/>
                    ) :
                    <UserClubContent/>
                }
            </div>
        </Content>
    )
};

export default UserPageContent;
