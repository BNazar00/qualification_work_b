import React, {useState, useEffect, Space} from "react";
import ClubsOfCenterList from "./ClubsOfCenterList"

const ClubsOfCenterContent = (centerId, clubsPerPage) => {
    
    const [clubs, setClubs] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });

    const [loading, setLoading] = useState(false);

    return (
        <div className="user-club-content">
            <ClubsOfCenterList centerId={centerId.centerId} // to pass props to child
                                clubsPerPage={centerId.clubsPerPage}  // to pass props to child
                                load={loading} 
                                setLoad={setLoading} 
                                clubs={clubs} 
                                setClubs={setClubs}/>
        </div>
    )
};

export default ClubsOfCenterContent;
