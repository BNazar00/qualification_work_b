import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {getRole} from "../../service/StorageService";

const UserRoute = (props) => {
    const role = getRole();
    const {setShowLogin} = useContext(AuthContext);
    
    if (role) {
        return <Route {... props}/>;
    }
    setShowLogin(true);
    return <Redirect to="/"/>;
}

export default UserRoute;