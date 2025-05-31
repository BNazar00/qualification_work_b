import {Form, Input, Checkbox, Button, Tooltip, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import AddLocationModal from "../addClub/location/AddLocationModal";
import "./css/MainInformation.css";
import {PlusOutlined} from "@ant-design/icons";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";


const MainInformation = ({step, setStep, clubs, cities, locations, setLocations, result, setResult}) => {
    const [locationVisible, setLocationVisible] = useState(false);
    const [editedLocation, setEditedLocation] = useState(null);
    const [locationForm] = Form.useForm();
    const [mainInformationFrom] = Form.useForm();
    const {Text} = Typography;


    const nextStep = () => {
        setStep(step + 1);
    }

    useEffect(() => {
        if (result) {
            mainInformationFrom.setFieldsValue({...result})
        }
    }, [])

    const onFinish = (values) => {
        console.log('Success: ', values);
        values.locations.map(location => {
            if (!location.coordinates) {
                location.coordinates = location.latitude + ", " + location.longitude;
            }
        })
        setResult(Object.assign(result, values));
        mainInformationFrom.resetFields();
        nextStep();
    };

    return (
        <Form
            name="basic"
            className="mainInfo"
            layout="horizontal"
            form={mainInformationFrom}
            onFinish={onFinish}>
            <div className="form-fields">
                <Text style={{fontSize: '19px', color: 'GrayText'}}>Назва центру</Text>
                <Form.Item
                    name="name"
                    className="form-item"
                    rules={[
                        {
                            required: true,
                            pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/,
                            message: "Некоректна назва центру",
                        },
                    ]}>
                    <Input
                        suffix={
                            <Tooltip placement="bottomRight"
                                     title="Це поле може містити тільки українські та англійські літери, довжиною 5-100 символів">
                                <InfoCircleOutlined className="info-icon"/>
                            </Tooltip>
                        }
                        placeholder="Введіть назву центру"/>
                </Form.Item>

                    <Text style={{fontSize: '19px', color: 'GrayText'}}>Локації</Text>
                    <div>
                    <Button className="add-location-btn" htmlType="submit" onClick={() => setLocationVisible(true)}><PlusOutlined/>Додати локацію</Button>
                    </div>
                <Form.Item
                    name="locations"
                    className="form-item locations"
                    rules={[{
                        required: true,
                        message: "Додайте і виберіть локацію"
                    }]}>
                        <Checkbox.Group className="location-list">
                        {locations.map(location =>
                            <div className="checkbox-item">
                                <Checkbox value={location}>
                                    {location.name}
                                </Checkbox>
                            </div>
                        )
                        }
                    </Checkbox.Group>
                </Form.Item>


            </div>
            <div className="btn">
                <Button className="next-btn" htmlType="submit">Наступний крок</Button>
            </div>
            <AddLocationModal
                form={locationForm}
                locations={locations}
                setLocations={setLocations}
                visible={locationVisible}
                setVisible={setLocationVisible}
                editedLocation={editedLocation}
                setEditedLocation={setEditedLocation}
                cities={cities}/>

        </Form>
    )
}

export default MainInformation;