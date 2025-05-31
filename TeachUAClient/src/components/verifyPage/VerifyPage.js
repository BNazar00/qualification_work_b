import React, {useContext, useEffect} from "react";
import './css/VerifyPage.less';
import {Redirect, useLocation} from "react-router-dom";
import {verifyUser} from "../../service/VerifyService";
import {message} from "antd";
import { AuthContext } from "../../context/AuthContext";

const VerifyPage = () => {
    const location = useLocation();
    const {setShowLogin} = useContext(AuthContext);

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    useEffect(() => {
        const verifyCode = getUrlParameter("code");
        verifyUser(verifyCode).then((response) => {
            setShowLogin(true);
            message.success(response.data.message);
        }).catch((error) => message.error(error.response.data.message));
    })

    return <Redirect to="/"/>;
}
export default VerifyPage;