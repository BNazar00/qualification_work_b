import React, { useEffect, useState } from 'react';
import CertificateList from "./CertificateList";
import DownloadModal from "./DownloadModal";
import { Content } from "antd/es/layout/layout";
import { getCertificatesOfAuthenticatedUser, downloadCertificate } from "../../../../service/CertificateService";
import "../messages/css/UserMessagesPage.less";
import "./css/UserCertificatesPage.less";
import { message } from 'antd';

const UserCertificatesPage = () => {

    const [certificates, setCertificates] = useState([]);
    const [isModalShown, setIsModalShown] = useState(false);

    useEffect(() => {
        getCertificatesOfAuthenticatedUser()
            .then(response => {
                setCertificates(response)
            });
    }, []);

    const startDownload = (certificate) => {
        setIsModalShown(true);
        downloadCertificate(certificate.id).then((response) => {
            if (response.status != 200) {
                message.error("Помилка завантаження");
            }
            setIsModalShown(false);
        });
        
    }

    return (
        <Content className="messagesContent">
            <div className="contentBox">
                <div className="contentTitle">Мої сертифікати</div>
                <DownloadModal isModalShown={isModalShown} />
                <CertificateList certificates={certificates} startDownload={startDownload} />
            </div>
        </Content>
    );
};

export default UserCertificatesPage;