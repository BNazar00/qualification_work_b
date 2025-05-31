import React from 'react';
import {Header} from "antd/es/layout/layout";
import HeaderRight from "./HeaderRight";
import NavMenu from "./NavMenu";
import {Link, useHistory} from "react-router-dom";
import {searchParameters} from "../../context/SearchContext";
import {useLocation} from "react-router-dom";
import { deleteUserStorage, getAccessToken, getRefreshToken } from '../../service/StorageService';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';
import { message } from 'antd';

const HeaderComponent = () => {
    const location = useLocation();
    const history = useHistory();
    const {setUser, setShowLogin} = useContext(AuthContext);

    const onExitClick = () => {
        deleteUserStorage();
        setUser({});
        history.push("/");
    };

    useEffect(() => {
        const token = getRefreshToken();
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            if (payload.exp * 1000 < Date.now()) {
                onExitClick();
                message.info("Увійдіть заново в обліковий запис");
                setShowLogin(true);
            }
        } 
    }, [location]);

    searchParameters.isAdvancedSearch =
        (searchParameters.isAdvancedSearch && location.pathname === '/clubs') && true;

    return (
        <Header className="header">
            <div className="left-side-menu">
                <Link to="/">
                    <div className="logo"/>
                </Link>
            </div>

            <NavMenu/>
            <HeaderRight/>
        </Header>
    );
};

export default HeaderComponent;