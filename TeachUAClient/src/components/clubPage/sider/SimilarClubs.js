import React, {useEffect} from "react";
import {searchParameters} from "../../../context/SearchContext";
import PrimitiveCard from "../../PrimitiveCard";
import './css/SimilarClubs.css';
import PropTypes from "prop-types";
import {getShortContent} from "../../editor/EditorConverter";

const SimilarClubs = ({cityName, similarClubs}) => {
    return (
        <div className="similar-clubs">
            <p className="label">Схожі гуртки у місті {cityName}</p>
            {similarClubs.map(club => <PrimitiveCard key={club.id}
                                                     header={<div className="name">{club.name}</div>}
                                                     description={getShortContent(club.description)}
                                                     link={`/club/${club.id}`}
                                                     buttonText="Детальніше"/>)}
        </div>)
};
SimilarClubs.propTypes = {
    similarClubs: PropTypes.array.isRequired
};

export default SimilarClubs;