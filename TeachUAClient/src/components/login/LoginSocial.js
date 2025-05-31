import React from 'react';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '../../service/config/AuthConfig';


const LoginSocial = () => {
    return (
        <div className="icons">
            <div className="items">
                <a href={GOOGLE_AUTH_URL}> <img src={`${process.env.PUBLIC_URL}/static/images/user/google.png`} className="logo" alt="Logo" />
                </a>
                <a href={FACEBOOK_AUTH_URL}> <img src={`${process.env.PUBLIC_URL}/static/images/user/facebook.png`} className="logo" alt="Logo" />
                </a>
            </div>
        </div>
    )
}

export default LoginSocial;
