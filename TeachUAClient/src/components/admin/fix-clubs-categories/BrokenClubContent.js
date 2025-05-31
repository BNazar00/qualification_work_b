import React, {useState} from "react";
import BrokenClubList from "./BrokenClubList";

import './css/UserClub.less';

const BrokenClubContent = () => {
    const [clubs, setClubs] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });

    const [loading, setLoading] = useState(false);

    return (
        <div className="user-club-content">
            <BrokenClubList load={loading} setLoad={setLoading} clubs={clubs} setClubs={setClubs}/>
        </div>
    )
};

export default BrokenClubContent;
