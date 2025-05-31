import React, {useState} from "react";
import UserCenterList from "./UserCenterList";

const UserCenterContent = () => {
    const [centers, setCenters] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });

    const [loading, setLoading] = useState(false);

    return (
        <div className="center-profile">
            <UserCenterList load={loading} setLoad={setLoading} centers={centers} setCenters={setCenters}/>
        </div>
    )
};

export default UserCenterContent;
