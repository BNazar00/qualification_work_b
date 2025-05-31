import React from "react";
import {Menu , message} from "antd";
import './css/UserClub.less';
import {deleteClubById} from "../../../service/ClubService";
import EditClubModal from "../../editClub/EditClubModal";

const clubUpdateMenu = (clubId, reloadAfterChange) => (
    <Menu className="update-menu">
        <Menu.Item className="menu-item" key="edit_club">
            <EditClubModal clubId={clubId} reloadAfterChange={reloadAfterChange}/>
        </Menu.Item>
        <Menu.Item key="delete_club">
            <a onClick={() => {
                deleteClubById(clubId).then(() => {
                    reloadAfterChange();
                    message.success("Гурток успішно видалено");
                }).catch(() => message.error("Помилка при видаленні гуртка"));
            }}>Видалити гурток</a>
        </Menu.Item>
    </Menu>
);

export default clubUpdateMenu;
