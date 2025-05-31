import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { deleteUserStorage, saveRole, saveTokens, saveUserId } from '../../service/StorageService';
import { message } from "antd";

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    render() {
        message.config({
            maxCount: 1
        });

        const accessToken = this.getUrlParameter('accessToken');
        const refreshToken = this.getUrlParameter('refreshToken');
        const userId = this.getUrlParameter('id');
        const role = this.getUrlParameter('role');
        const error = this.getUrlParameter('error');
        const successMesage = (msg) => {
            message.success(msg);
        }
        const errorMesage = (err) => {
            message.error(err);
        }
        saveTokens(accessToken, refreshToken);
        saveUserId(userId);
        saveRole(role);
        if (userId) {
            return (<div>
                <Redirect to={{
                    pathname: `/user/${userId}/page`,
                    state: { from: this.props.location }
                }}>
                    {successMesage("Успішний вхід в систему")}
                </Redirect>
            </div>)
        } else {
            deleteUserStorage();
            return (<div>
                <Redirect to={{
                    pathname: "/",
                    state: {
                        from: this.props.location,
                        error: error
                    }
                }} />
                {errorMesage(error)}
            </div>)
        }
    }
}

export default OAuth2RedirectHandler;