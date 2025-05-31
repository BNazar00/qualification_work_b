import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React from "react";
import './css/ClubItem.css'
import ClubLogo from "../clubPage/header/ClubLogo";

const ClubItem = ({ mapClub, setZoom, setSelected, setCenter }) => {
    return (
        <div onClick={() => {
            setSelected(mapClub);
            setZoom(15);
            setCenter({
                lat: mapClub?.location.latitude,
                lng: mapClub?.location.longitude
            })
        }} className="club-item">
            <div className="title">
                <ClubLogo logo={mapClub.urlLogo} category={mapClub.categories[0]} />
                <div className="name">{mapClub.name}</div>
            </div>
            <div className="address">
                <EnvironmentFilled className="address-icon" />
                <span className="text"> {mapClub.location.address || ''}</span>
            </div>
        </div>
    )
};

export default ClubItem;