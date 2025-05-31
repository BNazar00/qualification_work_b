import { mapSearchParameters, searchParameters} from "../../context/SearchContext";
import Search from "../Search";
import React from "react";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";

const NewsHeader = () => {


    return (
        <div className="lower-header-box global-padding">
            <div className="city-name-box">
                <div className="city-name-box-small-screen">
                    {mapSearchParameters.cityName !== 'online' ?
                            <h2 className="city-name">{"Новини"
                                                       //searchParameters.cityName !== undefined ? "Гуртки у місті " + searchParameters.cityName : "Гуртки у всіх містах"
                                                      }</h2>
                            :
                            <h2 className="city-name">Гуртки без локації</h2>}
                    <EnvironmentFilled className="icon"/>
                </div>
            </div>
            <Search redirect/>
        </div>
    );
};

export default NewsHeader;