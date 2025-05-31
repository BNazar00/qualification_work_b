import React, { useEffect, useState } from 'react';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from '../../service/config/AuthConfig';


const RegistrationSocial = ({ role }) => {
    const [style, setStyle] = useState("items");
    useEffect(() => {
        if (role) {
            setStyle("items-active")
        }
    }, [role])


    return (
        <div className="icons">
            <div className={style}>
                <a href={GOOGLE_AUTH_URL + "&role=" + role}> <img src={`${process.env.PUBLIC_URL}/static/images/user/google.png`} className="logo" alt="Logo" />
                </a>
                <a href={FACEBOOK_AUTH_URL + "&role=" + role}> <img src={`${process.env.PUBLIC_URL}/static/images/user/facebook.png`} className="logo" alt="Logo" />
                </a>
            </div>
        </div>
    )
}

export default RegistrationSocial
