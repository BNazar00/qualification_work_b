import React, {useState} from "react";
import UserClubList from "./UserClubList";

const UserClubContent = () => {
    const [clubs, setClubs] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });

    const [loading, setLoading] = useState(false);

    return (
        <div className="user-club-content">
            <UserClubList load={loading} setLoad={setLoading} clubs={clubs} setClubs={setClubs}/>
        </div>
    )
};

export default UserClubContent;
