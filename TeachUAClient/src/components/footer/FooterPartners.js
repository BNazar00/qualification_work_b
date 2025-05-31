import React from 'react';

const FooterPartners = () => {
    return (
        <div className="footer-partners">
            <div className="article">
                Наші партнери
            </div>
            <div className="sponsors">
                <a target="_blank" href="https://www.softserveinc.com/uk-ua">
                    <img src={`${process.env.PUBLIC_URL}/static/images/footer/sponsors/soft_serve_logo.png`}
                         className="logo_soft-serve" alt="soft_serve"/>
                </a>
                <a target="_blank" href="https://www.facebook.com/zakonpromovu5670">
                    <img src={`${process.env.PUBLIC_URL}/static/images/footer/sponsors/logo1.png`}
                         className="logo" alt="Mova_obyednue"/> </a>

                <a target="_blank" href="https://www.ed-era.com">
                    <img src={`${process.env.PUBLIC_URL}/static/images/footer/sponsors/EDERA.svg`}
                         className="logo" alt="EDERA"/>
                </a>

                <a target="_blank" href="https://emova.language-ua.online">
                    <img src={`${process.env.PUBLIC_URL}/static/images/footer/sponsors/logo3.png`}
                         className="logo" alt="e-mova"/>  </a>

                {/*<a href="">*/}
                {/*    <img src={`${process.env.PUBLIC_URL}/static/images/footer/sponsors/logo4.png`}*/}
                {/*         className="logo" alt="Logo"/> </a>*/}

                <a target="_blank" href="https://krainafm.com.ua">
                    <img src={`${process.env.PUBLIC_URL}/static/images/footer/sponsors/Kraina_FM.jpg`}
                         className="logo" alt="Kraina_FM"/>
                </a>

                <a target="_blank" href="https://ucf.in.ua">
                    <img src={`${process.env.PUBLIC_URL}/static/images/footer/sponsors/ucf.svg`}
                         className="logo" alt="ucf"/>
                </a>

                <a target="_blank" href="https://prostirsvobody.org">
                    <img src={`${process.env.PUBLIC_URL}/static/images/footer/sponsors/prostir.jpg`}
                         className="logo" alt="prostir_svobodi"/>
                </a>
            </div>
        </div>
    );
};

export default FooterPartners