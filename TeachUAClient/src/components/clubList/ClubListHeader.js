import {advancedSearchCityName, mapSearchParameters, searchParameters} from "../../context/SearchContext";
import Search from "../Search";
import React, {useState} from "react";
import {Button} from "antd";
import MapComponent from "../map/MapComponent";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";

const ClubListHeader = ({
                            setAdvancedSearch,
                            advancedSearch,
                            setShowHideMenu,
                            showHideMenu}) => {

    const [mapVisible, setMapVisible] = useState(false);

    return (
        <div className="lower-header-box global-padding">
            <div className="city-name-box">
                <div className="city-name-box-small-screen">
                    {mapSearchParameters.cityName !== 'online' ?

                            <h2 className="city-name">{searchParameters.cityName !== undefined ? "Гуртки у місті " + searchParameters.cityName : "Гуртки у всіх містах"}</h2>
                            :
                            <h2 className="city-name">Гуртки без локації</h2>}
                    <EnvironmentFilled className="icon"/>
                </div>
                {mapSearchParameters.cityName !== 'online' && <Button className="flooded-button show-map-button"
                        onClick={() => setMapVisible(true)}>Показати на мапі</Button>}
			</div>
			<div className="search-container">
	            <Search showHideMenu={showHideMenu} setShowHideMenu={setShowHideMenu} setAdvancedSearch={setAdvancedSearch} advancedSearch={advancedSearch}/>
			</div>
            <MapComponent visible={mapVisible} setVisible={setMapVisible} cityName={searchParameters.cityName}/>
        </div>
    );
};

export default ClubListHeader;