import {Form, Checkbox, Typography, message} from 'antd';
import React, {useEffect, useState} from 'react';
import ClubLogo from "../clubPage/header/ClubLogo";
import AddClubModal from '../addClub/AddClubModal';
import "./css/ClubsOfCenter.css";
import { getAllClubsByUserId, getClubsByUserId } from '../../service/ClubService';
import { getUserId } from '../../service/StorageService';
import { addCenter } from '../../service/CenterService';
import { useHistory } from 'react-router-dom';

const ClubsOfCenter = ({ step, setStep, setShowing, clubs, setClubs, result, setResult, setLocations ,fromCenter}) => {
    const history = useHistory();
    const [clubsOfCenterForm] = Form.useForm();
    const [clubsId,setClubsIds] = useState([]);
    const {Text} = Typography;

    const prevStep = () => {
        setResult(Object.assign(result, clubsOfCenterForm.getFieldValue()));
        setStep(step - 1);
    }

    const onChange = e => {
        setClubsIds(e)
    }

    const onFinish = (values) => {
        setResult(Object.assign(result, values));
        result.clubs = clubsId;
        addCenter(result).then(() => {
            setShowing(false);
            history.push("/user/" + getUserId() +"/page");
            message.success("Центр успішно створено");
        }).catch((error) => {
            if (error.response.status === 409) {
                message.warning("Центр з такою назвою вже існує");
            }
        });
    }

    useEffect(() => {
        if (result) {
            clubsOfCenterForm.setFieldsValue({ ...result });
        }
        getAllClubsByUserId(getUserId()).then(response => {
            setClubs(response);
        })
    }, []);

    return (
        <Form
            className="clubsOfCenter"
            layout="horizontal"
            onFinish={onFinish}
            form={clubsOfCenterForm}
        >
            <Text style={{fontSize :'19px', color:'GrayText'}}>Оберіть гурток</Text>
            <Form.Item
            className="form-item"
            name="clubs"
            rules={[{
                required: true,
                message: "Виберіть гуртки приналежні до центру"
            }]}>
            <div className="form-fields">

                    <Checkbox.Group onChange={onChange} >
                        {clubs.map(club => (
                            <div className="checkbox-item">
                                <Checkbox value={club.id}>
                                        <ClubLogo logo={club.urlLogo} category={club.categories[0]} />
                                        <span className="club-name">
                                            {club.name.length > 30 ?
                                                club.name.substr(0, 30) + "..." :
                                                club.name}
                                        </span>
                                </Checkbox>
                            </div>
                        ))}
                    </Checkbox.Group>
            </div>
            </Form.Item>
            <span className="add-club-modal"> <AddClubModal clubs={clubs} setClubs={setClubs} fromCenter={fromCenter} /> </span>
            <div className="btn">
                <button className="prev-btn" type="button" onClick={prevStep}>Назад</button>
                <button className="finish-btn" htmlType="submit">Завершити</button>
            </div>
        </Form>
    )
}

export default ClubsOfCenter;