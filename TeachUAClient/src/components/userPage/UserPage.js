import React, {useEffect, useContext} from "react";
import {useRouteMatch} from "react-router-dom";
import SiderComponent from "./sider/UserSider";
import UserPageContent from "./content/UserPageContent";
import '../userPage/css/User.less'
import {getUserById} from "../../service/UserService";
import Layout from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {getUserId, deleteUserStorage} from "../../service/StorageService";
import UserMessagesPage from "./content/messages/UserMessagesPage";
import UserCertificatesPage from "./content/certificates/UserCertificatesPage";
import UserRoute from "../routes/UserRoute";
import {AuthContext} from "../../context/AuthContext";

const UserPage = () => {

    const {user, setUser} = useContext(AuthContext);
    const routeMatch = useRouteMatch();

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getUserById(getUserId()).then(response => {
            setUser(response);
            return;
        }).catch(() => {
            deleteUserStorage();
        });
    };

    return (
        <Layout className="user-page" >
            <Sider>
                <SiderComponent url={routeMatch.url} />
            </Sider>

            <UserRoute exact path={`${routeMatch.path}/page`} >
                <UserPageContent />
            </UserRoute>

            <UserRoute exact path={`${routeMatch.path}/messages`} >
                <UserMessagesPage />
            </UserRoute>

            <UserRoute exact path={`${routeMatch.path}/certificates`} >
                <UserCertificatesPage />
            </UserRoute>
        </Layout>
    )
}

export default UserPage;
