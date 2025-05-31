import React from "react";
import { Layout, Result } from "antd";
import { useEffect, useState } from "react";
import { useParams, BrowserRouter, useHistory } from "react-router-dom";
import { getValidationResponse } from "../../../service/CertificateService";
import "../css/CertificateValidation.css";

const ValidateCertificatePage = () => {

    const params = useParams();
    const history = useHistory();
    const[certificate, setCertificate] = useState({
        serialNumber: 0,
        certificateTypeName: "",
        userName: "",
        courseDescription: "",
        projectDescription: "",    
        picturePath: ""
    });

    useEffect(() => {
        if (params.serialNumber === 'null'){
            history.push("/")
        }
        getValidationResponse(params.serialNumber).then((response) => {
            if (response.status > 400){
                setCertificate(undefined);
            }else{
                window.scrollTo(0, 0);
                setCertificate(response);
            }
        });
    }, []);

    
    return (  
        <Layout className="certificate-validate-page">
            {certificate ? 
                    <BrowserRouter>
                        <div className="banner-image">
                                <img src={process.env.PUBLIC_URL + certificate.picturePath} alt={""}/>
                        </div>
                        <div className="validation-content">    
                            <div className="title-text">
                                Цей сертифікат є дійсним
                            </div>
                            <div className="main-text">
                                <div className="sub-title">
                                    {certificate.certificateTypeName}
                                </div>
                                <div className="user-name">
                                    {certificate.userName}
                                </div>
                                <div className="sub-title">
                                    Номер сертифіката
                                </div>
                                <div className="serial-number">
                                    {certificate.serialNumber}
                                </div>
                                <div className="sub-title">
                                    Навчальний курс
                                </div>
                                <p>
                                    <p dangerouslySetInnerHTML={{__html:certificate.courseDescription}}></p>
                                    <p dangerouslySetInnerHTML={{__html:certificate.projectDescription}}></p>
                                </p>
                            </div>
                            
                            
                        </div>    
                    </BrowserRouter>
                    :
                    <Result
                        className="certificate-not-found"
                        status="404"
                        title="404"
                        subTitle="Сертифіката у реєстрі не знайдено"
                    />}
        </Layout>
    );
}
 
export default ValidateCertificatePage;