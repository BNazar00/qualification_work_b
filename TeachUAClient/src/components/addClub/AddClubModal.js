import React, {useEffect, useState} from 'react';
import {Layout, Modal} from 'antd';
import './css/AddClubModal.css';
import "./css/AddClubContent.css";
import {Content} from "antd/es/layout/layout";
import AddClubSider from "./AddClubSider";
import AddClubSiderMobile from "./AddClubSiderMobile";
import MainInformationStep from "./steps/MainInformationStep";
import ContactsStep from "./steps/ContactsStep";
import DescriptionStep from "./steps/DescriptionStep";
import {getAllCategories} from "../../service/CategoryService";
import {getAllCities} from "../../service/CityService";
import {getAllContacts} from "../../service/ContactService";
import {getUserId} from '../../service/StorageService';
import {getAllCenters} from "../../service/CenterService";

const AddClubModal = ({isShowing, setShowing, clubs, setClubs, fromCenter}) => {
    const [step, setStep] = useState(0);
    const [result, setResult] = useState({});
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [centers, setCenters] = useState([]);

    useEffect(() => {
        getAllCenters().then(response => setCenters(response))
        getAllCategories().then(response => setCategories(response));
        getAllCities().then(response => setCities(response));
        getAllContacts().then(response => setContacts(response));
        setResult({
            userId: getUserId()
        })
    }, []);

    const stepComponent = (step) => {
        switch (step) {
            case 0:
                return <MainInformationStep
                    categories={categories}
                    setResult={setResult}
                    result={result}
                    step={step}
                    setStep={setStep}
                    centers={centers}
                    fromCenter={fromCenter}
                />;
            case 1:
                return <ContactsStep
                    contacts={contacts}
                    cities={cities}
                    setResult={setResult}
                    result={result}
                    step={step}
                    setStep={setStep}
                    locations={locations}
                    setLocations={setLocations}/>;
            case 2:
                return <DescriptionStep
                    fromCenter={fromCenter}
                    setResult={setResult}
                    result={result}
                    step={step}
                    setShowing={setShowing}
                    setStep={setStep}
                    setLocations={setLocations}
                    clubs={clubs}
                    setClubs={setClubs}/>;
        }
    };

    return (
        <Modal
            className="modal-add-club"
            centered
            width={880}
            visible={isShowing}
            onOk={() => setShowing(false)}
            onCancel={() => setShowing(false)}
            footer={null}>
            <Layout>
                <AddClubSider step={step}/>
                <Content className="add-club-container">
                    <div className="add-club-header">
                        Додати гурток
                    </div>
                    <AddClubSiderMobile step={step}/>
                    <div className="add-club-content">
                        {stepComponent(step)}
                    </div>
                </Content>
            </Layout>
        </Modal>
    );
};

export default AddClubModal;
