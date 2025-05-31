import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {getRole} from "../../service/StorageService";

const AdminRoute = (props) => {
    const role = getRole();
    const {setShowLogin} = useContext(AuthContext);
    
    if (role === "ROLE_ADMIN") {
        return <Route {... props}/>;
    } else if (!role) {
        setShowLogin(true);
    }
    return <Redirect to="/"/>
}

export default AdminRoute;