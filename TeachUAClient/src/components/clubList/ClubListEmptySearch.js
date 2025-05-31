import React from "react";
import "./css/ClubListEmptySearch.css";
import {Button} from "antd";

const ClubListEmptySearch = () => {
    return (
        <div className="empty-advanced-search">
            <div className="clubs-not-found">За критеріями пошуку гуртків не знайдено</div>
            <div className="invite-clubs">Заохочуйте гуртки до викладання українською мовою та доєднання до платформи.</div>
            <Button className="flooded-button invite-clubs-button">Заохотити гуртки</Button>
        </div>
    );
};

export default ClubListEmptySearch;