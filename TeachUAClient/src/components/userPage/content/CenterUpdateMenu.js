import {Menu, message} from "antd";
import React from "react";
import {deleteCenterById} from "../../../service/CenterService";
import CenterEditModal from "../../editCenter/CenterEditModal";

const centerUpdateMenu = (centerId, reloadAfterChange) => (
    <Menu className="update-menu">
        <Menu.Item className="menu-item">
            <CenterEditModal centerId={centerId} reloadAfterChange={reloadAfterChange}/>
        </Menu.Item>
        <Menu.Item>
            <a onClick={() => {
                deleteCenterById(centerId).then(() => {
                    reloadAfterChange();
                    message.success("Центр успішно видалено");
                }).catch(() => message.error("Помилка при видаленні центра"));
            }}>Видалити</a>
        </Menu.Item>
    </Menu>
);

export default centerUpdateMenu;
