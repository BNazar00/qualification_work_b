import React, { useState, useEffect } from 'react';
import { Layout, Modal } from 'antd';
import { getAllCategories } from "../../service/CategoryService";
import { getAllCities } from "../../service/CityService";
import { getAllContacts } from "../../service/ContactService";
import { getClubById } from "../../service/ClubService";
import { getAllCenters } from "../../service/CenterService";
import { Content } from 'antd/es/layout/layout';
import AddClubSider from '../addClub/AddClubSider';
import AddClubSiderMobile from '../addClub/AddClubSiderMobile';
import ContactsStep from './steps/ContactsStep';
import DescriptionStep from './steps/DescriptionStep';
import MainInformationStep from './steps/MainInformationStep';


const EditClubModal = ({ clubId, reloadAfterChange }) => {
    const [step, setStep] = useState(0);
    const [isShowing, setShowing] = useState(false);

    const [result, setResult] = useState({});
    const [categories, setCategories] = useState([]);
    const [centers, setCenters] = useState([]);
    const [cities, setCities] = useState([]);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getAllCategories().then(response => setCategories(response));
        getAllCenters().then(response => setCenters(response));
        getAllCities().then(response => setCities(response));
        getAllContacts().then(response => setContacts(response));
        getClubById(clubId).then(response => setResult(response));
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
                    centers={centers} />;
            case 1:
                return <ContactsStep
                    contacts={contacts}
                    cities={cities}
                    setResult={setResult}
                    result={result}
                    step={step}
                    setStep={setStep} />;
            case 2:
                return <DescriptionStep
                    setResult={setResult}
                    result={result}
                    step={step}
                    setShowing={setShowing}
                    setStep={setStep}
                    reloadAfterChange={reloadAfterChange} />;
        }
    };


    return (
        <div>
            <div onClick={() => setShowing(true)}>
                Редагувати гурток
            </div>
            <Modal
                className="modal-add-club"
                centered
                width={880}
                open={isShowing}
                onOk={() => setShowing(false)}
                onCancel={() => setShowing(false)}
                footer={null}>
                <Layout>
                    <AddClubSider step={step} />
                    <Content className="add-club-container">
                        <div className="add-club-header">
                            Редагувати гурток
                        </div>
                        <AddClubSiderMobile step={step} />
                        <div className="add-club-content">
                            {stepComponent(step)}
                        </div>
                    </Content>
                </Layout>
            </Modal>
        </div>
    );
};

export default EditClubModal;
