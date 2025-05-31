import { Button } from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React from "react";
import './css/MarkItem.css'
import { useHistory , Link} from "react-router-dom";
import { mapSearchParameters, searchParameters } from "../../context/SearchContext";
import { getShortContent } from "../editor/EditorConverter";

const MarkItem = ({ mapClub }) => {

    let history = useHistory();

    const showClub = () => {
        searchParameters.cityName = mapClub.location.city.name;
        mapSearchParameters.cityName = mapClub.location.city.name;
        history.push(`/club/${mapClub.id}`);
    }

    return (
        <div className="markItem">
            <div className="title">
                {mapClub.name}
            </div>
            <p className="description">{getShortContent(mapClub.description)}</p>
            <div className="content">
                <div className="address">
                    <EnvironmentFilled className="address-icon" />
                    <span className="text">{mapClub.location.address}</span>
                </div>
            </div>
            <Button className="bt">
                    <Link to={`/club/${mapClub.id}`}>Детальніше</Link>
                </Button>
        </div>
    )
};

export default MarkItem;