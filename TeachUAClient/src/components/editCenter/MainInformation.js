import {Form, Input, Button, Tooltip, Typography, List, Popconfirm, message} from 'antd';
import React, {useEffect, useState} from 'react';
import AddLocationModal from "../addClub/location/AddLocationModal";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import "./css/MainInformation.css";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";


const MainInformation = ({step, setStep, cities, result, setResult}) => {
    const [locationVisible, setLocationVisible] = useState(false);
    const [editedLocation, setEditedLocation] = useState(null);
    const [locationForm] = Form.useForm();
    const [locations, setLocations] = useState([]);
    const [mainInformationFrom] = Form.useForm();
    const {Text} = Typography;


    const nextStep = () => {
        setStep(step + 1);
    }

    useEffect(() => {
        if (result) {
            mainInformationFrom.setFieldsValue({...result})
            setLocations(result.locations);
        }
    }, [])

    const onFinish = (values) => {
        if (locations.length <= 0) {
            message.info('Ви не додали жодної локації!');
            return;
        }
        locations.map(location => {
            if (!location.coordinates) {
                location.coordinates = location.latitude + ", " + location.longitude;
            }
        })
        values.locations = locations;
        setResult(Object.assign(result, values));
        mainInformationFrom.resetFields();
        nextStep();
    };

    const onEdit = (item) => {
        locationForm.setFieldsValue({
            ...item,
        });
        setEditedLocation(item);
        setLocationVisible(true);
    };

    const onRemove = (item) => {
        const newData = [...locations];
        const index = newData.findIndex((it) => item.key === it.key);
        newData.splice(index, 1);
        setLocations(newData);
    };

    return (
        <Form
            name="basic"
            className="mainInfo"
            layout="horizontal"
            form={mainInformationFrom}
            onFinish={onFinish}
            >
            <div className="form-fields">
                <Text style={{fontSize: '19px', color: 'GrayText'}}>Назва центру</Text>
                <Form.Item
                    name="name"
                    className="form-item"
                    rules={[
                        {
                            required: true,
                            pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_—`{}~]){5,100}$/,
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
                <Form.Item name="locations"
                className="add-club-row"
                initialValue={locations}>
                <List
                    className="add-club-location-list"
                    itemLayout="horizontal"
                    dataSource={locations}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <div>
                                    <EditOutlined key="edit" onClick={() => onEdit(item)} />
                                    <Popconfirm key="delete"
                                        title="Видалити локацію?"
                                        cancelText="Ні"
                                        okText="Так"
                                        cancelButtonProps={{ className: "popConfirm-cancel-button" }}
                                        okButtonProps={{ className: "popConfirm-ok-button" }}
                                        onConfirm={() => onRemove(item)}>
                                        <DeleteOutlined />
                                    </Popconfirm>
                                </div>]}
                        >
                            <List.Item.Meta
                                title={item?.name}
                                description={`Адреса: ${item?.address}`}
                            />
                        </List.Item>
                    )} />
                <span className="add-club-location" onClick={() => setLocationVisible(true)}>
                    Додати локацію
                </span>
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