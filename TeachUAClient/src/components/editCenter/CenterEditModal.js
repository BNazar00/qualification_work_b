import React, { useState, useEffect } from 'react';
import { Layout, Modal } from 'antd';
import "./css/EditCenter.css"
import MainInformation from './MainInformation';
import Contacts from './Contacts';
import Description from './Description';
import { getAllClubsByCenterId } from "../../service/ClubService";
import { getUserId } from "../../service/StorageService";
import { getAllCities } from '../../service/CityService';
import { getAllContacts } from '../../service/ContactService';
import EditCenterSider from "./EditCenterSider";
import EditCenterSiderMobile from "./EditCenterSiderMobile";
import { Content } from "antd/es/layout/layout";
import { getCenterById } from "../../service/CenterService";


const CenterEditModal = ({ centerId, reloadAfterChange }) => {
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState(0);
    const [clubs, setClubs] = useState(null);
    const [cities, setCities] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [result, setResult] = useState({});
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        let centerClubsIds = [];
        getAllClubsByCenterId(centerId).then(response => {
            response.forEach(club => centerClubsIds.push(club.id))
            setClubs(response);
        })

        getCenterById(centerId).then(response => {
            let contactTelephoneData = "";
            let contactFacebookData = "";
            let contactSiteData = "";
            let contactSkypeData = "";
            let contactWhatsAppData = "";
            let contactПоштаData = "";
            response.contacts.forEach(contact => {
                if (contact.contactType.name === "Пошта") {
                    contactПоштаData = contact.contactData
                }
                if (contact.contactType.name === "Телефон") {
                    contactTelephoneData = contact.contactData
                }
                if (contact.contactType.name === "Facebook") {
                    contactFacebookData = contact.contactData
                }
                if (contact.contactType.name === "Site") {
                    contactSiteData = contact.contactData
                }
                if (contact.contactType.name === "Skype") {
                    contactSkypeData = contact.contactData
                }
                if (contact.contactType.name === "WhatsApp") {
                    contactWhatsAppData = contact.contactData
                }
            })


            let locationsWithDuplicates = [];
            let locationsWithoutDuplicates = [];
            response.locations.map(location => {
                locationsWithDuplicates.push({
                    id: location.id,
                    name: location.name,
                    cityName: location.locationCity.name,
                    districtName: location.district?.name,
                    stationName: location.station?.name,
                    address: location.address,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    phone: location.phone
                });
                // this code removes duplicates from locations
                let s = new Set(locationsWithDuplicates);
                let it = s.values();
                locationsWithoutDuplicates = Array.from(it);
            })

            setResult({
                id: response.id,
                userId: getUserId(),
                name: response.name,
                description: response.description,
                locations: locationsWithoutDuplicates,
                urlLogo: response.urlLogo,
                urlWeb: response.urlWeb,
                urlBackgroundPicture: response.urlBackgroundPicture,
                clubs: centerClubsIds,
                contactТелефон: contactTelephoneData,
                contactFacebook: contactFacebookData,
                contactSite: contactSiteData,
                contactSkype: contactSkypeData,
                contactWhatsApp: contactWhatsAppData,
                contactПошта: contactПоштаData
            })

        });

        getAllCities().then(response => setCities(response));
        getAllContacts().then(response => setContacts(response));
        window.addEventListener("resize", handleResize)
    }, [visible])


    const handleResize = () => {
        if (window.innerWidth < 577) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    const currentComponnet = (step) => {
        switch (step) {
            case 0:
                return <MainInformation
                    step={step}
                    setStep={setStep}
                    cities={cities}
                    result={result}
                    setResult={setResult}
                />;

            case 1:
                return <Contacts
                    step={step}
                    setStep={setStep}
                    contacts={contacts}
                    result={result}
                    setResult={setResult}
                />;

            case 2:
                return <Description
                    step={step}
                    setStep={setStep}
                    result={result}
                    setResult={setResult}
                    setVisible={setVisible}
                    reloadAfterChange={reloadAfterChange}
                />;
        }
    };

    return (
        <div>
            <a className="" type="text button" onClick={() => setVisible(true)}>
                Редагувати Центр
            </a>
            <Modal
                className="addCenter"
                centered
                width={880}
                open={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <Layout>
                    <EditCenterSider step={step} />
                    <Content className="add-center-container">
                        <div className="modal-title">
                            Редагувати центр
                        </div>
                        <EditCenterSiderMobile step={step} />
                        <div className="input-data">
                            {currentComponnet(step)}
                        </div>
                    </Content>
                </Layout>
            </Modal>
        </div>
    )
};

export default CenterEditModal;