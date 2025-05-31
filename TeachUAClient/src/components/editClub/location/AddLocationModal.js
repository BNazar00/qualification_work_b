import { Button, Form, Input, Modal, Select, Tooltip, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getDistrictsByCityName } from "../../../service/DisctrictService";
import { addToTable } from "../../../util/TableUtil";
import { Content } from "antd/es/layout/layout";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
import { getStationsByCity, getStationsByDistrictNameAndCityName } from "../../../service/StationService";

const { Option } = Select;
const { Text } = Typography;

const AddLocationModal = ({ form, locations, setLocations, cities, visible, setVisible, editedLocation, setEditedLocation }) => {
    const [cityOnInput, setCityOnInput] = useState(null);
    const [inputAddressProps, setInputAddressProps] = useState({});
    const [districts, setDistricts] = useState([]);
    const [cityName, setCityName] = useState(null);
    const [isDisabled, setDisabled] = useState(false);
    const [station, setStation] = useState([]);
    const [coordinates, setCoordinates] = useState();
    const [isMobile, setIsMobile] = useState(false);
    const [locationForm, setLocationForm] = useState({
        locationName: "",
        cityName: "",
        district: "",
        latAndLng: "",
        phoneNumber: "",
        inputAddress: ""
    });

    useEffect(() => {
        getStationsByCity(cityName).then(response => setStation(response));
        getDistrictsByCityName(cityName).then(response => setDistricts(response));
        window.addEventListener("resize", handleResize);
    }, [cityName]);

    const handleResize = () => {
        if (window.innerWidth < 577) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }

    const onClose = () => {
        if (editedLocation) {
            setEditedLocation(null);
        }
        setVisible(false);
        form.resetFields();
    };

    const onFinish = (values) => {
        values.key = Math.random();
        if (editedLocation) {
            const index = locations.findIndex((item) => editedLocation.key === item.key);
            locations[index] = values;
            setLocations(locations);
        } else {
            setLocations(addToTable(locations, values));
        }
        onClose();
    };


    const changeCity = () => {
        const fields = form.getFieldValue();
        form.resetFields();
        form.setFieldsValue({
            name: fields.name,
            cityName: fields.cityName,
            phone: fields.phone,
            address: fields.address,
            coordinates: fields.coordinates
        });
        form.validateFields();
    }

    const changeStation = (value) => {
        const fields = form.getFieldValue();
        locationForm.cityName = cityName;
        locationForm.districtName = value;
        getStationsByDistrictNameAndCityName(locationForm).then(response => setStation(response));
    }

    return (
        <Modal
            className="modal-add-club"
            centered
            open={visible}
            width={650}
            onOk={onClose}
            onCancel={onClose}
            footer={null}
        >
            <Content className="add-club-container">
                <div className="add-club-header">
                    Додати локацію
                </div>
                <div className="add-club-content add-club-locations">
                    <Form
                        requiredMark={false}
                        className="add-club-content"
                        form={form}
                        onFinish={onFinish}
                    >
                        <Text style={{ fontSize: '19px', color: 'GrayText' }}>Назва</Text>
                        <Form.Item name="name"
                            className="add-club-row"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/,
                                    message: "Некоректна назва локації",
                                }]}
                        >
                            <Input className="add-club-input"
                                suffix={
                                    <Tooltip placement="bottomRight"
                                        title="Це поле може містити українські та англійські символи довжиною від 5-100. також цифри і спец.символи (!#$%&'()*+,-./:;<=>?@[]^_`{}~)">
                                        <InfoCircleOutlined className="info-icon" />
                                    </Tooltip>
                                }
                                placeholder="Назва локації" />
                        </Form.Item>
                        <div className="add-club-inline">
                            <div>
                                <Text style={{ fontSize: '19px', color: 'GrayText' }}>Місто</Text>
                                <Form.Item name="cityName"
                                    className="add-club-row"
                                    initialValue={editedLocation && editedLocation.cityName}
                                    hasFeedback
                                    rules={[{
                                        required: true,
                                        message: "Це поле є обов'язковим"
                                    }]}>
                                    <Select
                                        className="add-club-select"
                                        placeholder="Виберіть місто"
                                        onChange={(value) => {
                                            if (cityName) {
                                                cityOnInput === value ?
                                                    setInputAddressProps({ validateStatus: 'success' }) :
                                                    setInputAddressProps({ validateStatus: 'error' });
                                            }
                                            changeCity();
                                            setCityName(value);
                                        }}
                                        optionFilterProp="children">
                                        {cities.map(city => <Option key={city.id}
                                            value={city.name}>{city.name}</Option>)}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div>
                                <Text style={{ fontSize: '19px', color: 'GrayText' }}>Район міста</Text>
                                <Form.Item name="districtName"
                                    className="add-club-row"
                                    hasFeedback
                                >
                                    <Select
                                        className="add-club-select"
                                        placeholder="Виберіть район"
                                        onChange={changeStation}
                                        optionFilterProp="children">
                                        {districts.map(district => <Option key={district.id}
                                            value={district.name}>{district.name}</Option>)}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div>
                                <Text style={{ fontSize: '19px', color: 'GrayText' }}>Метро/Місцевість</Text>
                                <Form.Item name="stationName"
                                    className="add-club-row"
                                    hasFeedback
                                >
                                    <Select
                                        className="add-club-select"
                                        placeholder="Виберіть місцевість"
                                        optionFilterProp="children">
                                        {station.map(station => <Option key={station.id}
                                            value={station.name}>{station.name}</Option>)}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <Text style={{ fontSize: '19px', color: 'GrayText' }}>Адреса</Text>
                        <Form.Item name="address"
                            className="add-club-row"
                            hasFeedback
                            rules={[{
                                required: true,
                                message: "Це поле є обов'язковим"
                            }, {
                                required: true,
                                pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/,
                                message: "Некоректна адреса",
                            }]}>
                            <Input className="add-club-input"
                                placeholder="Адреса"
                            />
                        </Form.Item>
                        <div>
                            <Text style={{ fontSize: '19px', color: 'GrayText' }}>Географічні координати</Text>
                            <Form.Item name="coordinates"
                                className="add-club-row"
                                hasFeedback
                                rules={[{
                                    required: true,
                                    message: "Некоректні координати",
                                    pattern: /([0-9]+\.[0-9]+), ([0-9]+\.[0-9]+)/
                                }, {
                                    message: "Координати не можуть містити букви",
                                    pattern: /^[^A-Za-zА-Яа-яІіЇїЄєҐґ]*$/
                                }
                                ]}>
                                <Input className="add-club-input add-club-select"
                                    value={coordinates}
                                    onInput={e => setCoordinates(e.target.value)}
                                    placeholder="Широта та довгота" />
                            </Form.Item>
                        </div>
                        <Text style={{ fontSize: '19px', color: 'GrayText' }}>Номер телефону</Text>
                        <Form.Item name="phone"
                            className="add-club-row"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: "Це поле є обов'язковим"
                                },
                                {
                                    required: false,
                                    pattern: /^\d{10}$/,
                                    message: "Телефон не відповідає вказаному формату"
                                }
                            ]}>
                            <Input className="add-club-input"
                                prefix='+38'
                                suffix={
                                    <Tooltip placement="topRight"
                                        title="Телефон не може містити літери, спеціальні символи та пробіли">
                                        <InfoCircleOutlined className="info-icon" />
                                    </Tooltip>
                                }
                                placeholder="___________" />
                        </Form.Item>

                        <div className="add-club-content-footer add-club-add-location-button">
                            {
                                !isDisabled ?
                                    <Button htmlType="submit"
                                        className="flooded-button add-club-content-next">Додати</Button> :
                                    <Button disabled={isDisabled} htmlType="submit"
                                        className="flooded-button add-club-content-next-disabled">Додати</Button>
                            }
                        </div>
                    </Form>
                </div>
            </Content>
        </Modal>
    );
}

export default AddLocationModal;
