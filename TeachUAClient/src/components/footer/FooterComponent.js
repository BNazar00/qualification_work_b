import React from 'react';
import {Footer} from "antd/es/layout/layout";
import FooterPartners from "./FooterPartners";
import './css/Footer.less'
import FooterSocials from "./FooterSocials";
import FooterDonate from "./FooterDonate";

const FooterComponent = () => {

    return (
        <Footer className="footer">
            <FooterSocials/>
            <FooterPartners/>
            <FooterDonate/>
        </Footer>
    );
};

export default FooterComponent;