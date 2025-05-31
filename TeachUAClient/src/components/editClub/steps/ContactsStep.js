import { Button, Form, Input, List, message, Popconfirm, Switch, Tooltip, Typography } from "antd";
import React, { useState, useEffect } from "react";
import MaskIcon from "../../MaskIcon";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import AddLocationModal from "../location/AddLocationModal";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";

const ContactsStep = ({ contacts: contactTypes, cities, step, setStep, setResult, result }) => {
    const [locations, setLocations] = useState([]);
    const [locationVisible, setLocationVisible] = useState(false);
    const [editedLocation, setEditedLocation] = useState(null);
    const [locationForm] = Form.useForm();
    const [contactsForm] = Form.useForm();
    const [checked, setChecked] = useState(result.isOnline);
    const { Text } = Typography;


    useEffect(() => {
        if (result) {
            contactsForm.setFieldsValue({ ...result });
            setLocations(result.locations);
        }
    }, []);

    const nextStep = () => {
        setStep(step + 1);
    }

    const prevStep = () => {
        setResult(Object.assign(result, contactsForm.getFieldValue()));
        setStep(step - 1);
    }

    const onFinish = (values) => {
        if (locations.length <= 0) {
            values.isOnline = true;
            message.info('Ви не додали жодної локації, гурток автоматично є онлайн');
        }

        result.contacts = contactTypes.map(contactType => 
            ({contactType: contactType, contactData: values[contactType.name]})
        ).filter(contact => contact.contactData !== undefined);
        Object.assign(result, values);
        values.locations = locations;

        setResult(Object.assign(result, values));
        nextStep();
        contactsForm.resetFields();
    };

    const onEdit = (item) => {
        if (item.longitude) {
            item.coordinates = `${item.latitude}, ${item.longitude}`;
        }
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

    const onChange = () => {
        if (checked) {
            setChecked(false);
        } else {
            setChecked(true);
        }
    }

    const isEmailField = (contactType) => {
        return contactType.name === "Пошта";
    }

    const isPhoneField = (contactType) => {
        return contactType.name === "Телефон";
    }

    return (
        <Form
            name="basic"
            requiredMark={false}
            form={contactsForm}
            onFinish={onFinish}
        >
            <Text style={{ fontSize: '19px', color: 'GrayText' }}>Локації</Text>
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
            <div className="add-club-inline" style={{ display: 'grid' }}>
                <Text style={{ fontSize: '19px', color: 'GrayText' }}>Доступний онлайн</Text>
                <Form.Item name="isOnline"
                    className="add-club-row"
                >
                    <Switch checkedChildren="Так" unCheckedChildren="Ні" onChange={onChange} checked={checked} />
                    <Tooltip title="Якщо не додано жодної локації буде автоматично онлайн" >
                        <InfoCircleOutlined className="info-icon" style={{ margin: '10px' }} />
                    </Tooltip>
                </Form.Item>

            </div>

            <Text style={{ fontSize: '19px', color: 'GrayText' }}>Контакти</Text>
            <Form.Item
                className="add-club-row add-club-contacts"
            >
                {contactTypes.map(contactType =>
                    <Form.Item name={contactType.name}
                        key={contactType.id}
                        className="add-club-contact"
                        initialValue={result.contacts.find(c => c.contactType.id === contactType.id)?.contactData}
                        rules={[
                            isEmailField(contactType) &&
                            {
                                required: false,
                                type: "email",
                                message: "Некоректний формат email"
                            },
                            isPhoneField(contactType) &&
                            {
                                required: true,
                                message: "Введіть номер телефону"
                            },
                            isPhoneField(contactType) &&
                            {
                                required: false,
                                pattern: /^[^-/"`~!@#$%^&*()_+={}\[\]|\\\s:;“’'<,>.?๐฿A-Za-zА-Яа-яІіЇїЄєҐґ]*$/,
                                message: "Телефон не може містити спеціальні символи, літери та пробіли"
                            },
                            isPhoneField(contactType) && {
                                required: false,
                                pattern: /^.{10}$/,
                                message: "Телефон не відповідає вказаному формату"
                            }
                        ]}
                        hasFeedback>
                        <Input className="add-club-input"
                            name={contactType.name}
                            prefix={isPhoneField(contactType) ? "+38" : undefined}
                            placeholder={isPhoneField(contactType) ? "__________" : "Заповніть поле"}
                            suffix={<MaskIcon maskColor="#D9D9D9" iconUrl={contactType.urlLogo} />} />
                    </Form.Item>)}
            </Form.Item>

            <div className="add-club-content-footer">
                <Button ghost={true} className="add-club-content-prev" type="button" onClick={prevStep}>Назад</Button>
                <Button className="flooded-button add-club-content-next" htmlType="submit">Наступний крок</Button>
            </div>

            <AddLocationModal
                form={locationForm}
                locations={locations}
                setLocations={setLocations}
                visible={locationVisible}
                setVisible={setLocationVisible}
                editedLocation={editedLocation}
                setEditedLocation={setEditedLocation}
                cities={cities} />
        </Form>
    )
};

export default ContactsStep;
