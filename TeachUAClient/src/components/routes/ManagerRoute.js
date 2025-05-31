import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {getRole} from "../../service/StorageService";

const ManagerRoute = (props) => {
    const role = getRole();
    const {setShowLogin} = useContext(AuthContext);
    
    if (role === "ROLE_ADMIN" || role === "ROLE_MANAGER") {
        return <Route {... props}/>;
    } else if (!role) {
        setShowLogin(true);
    }
    return <Redirect to="/"/>
}

export default ManagerRoute;