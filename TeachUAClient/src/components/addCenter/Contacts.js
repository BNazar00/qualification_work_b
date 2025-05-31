import {Button, Form, Input, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import MaskIcon from '../MaskIcon';
import "./css/Contacts.css";

const Contacts = ({ step, setStep, contacts, result, setResult,setContacts }) => {
    const [contactsForm] = Form.useForm();
    const [contacts_data, setContactsData] = useState({});
    const {Text} = Typography;


    useEffect(() => {
        if (result) {
            contactsForm.setFieldsValue({ ...result });
        }
    }, [])


    const nextStep = () => {
        setStep(step + 1);
    }

    const prevStep = () => {
        setResult(Object.assign(result, contactsForm.getFieldValue()));
        setStep(step - 1);
    }
    const isEmailField = (contact) => {
        return contact.name === "Пошта";
    }

    const isPhoneField = (contact) => {
        return contact.name === "Телефон";
    }
    const changeContacts = (event, contact) => {
        setContactsData({
            ...contacts_data,
            [contact.id]: event.target.value
        });
    };

    const onFinish = (values) => {
        values.contacts = JSON.stringify(contacts_data).replaceAll(":","::");
        setResult(Object.assign(result,values))
        nextStep();
    }


    return (
        <Form
            name="contacts"
            className="contacts"
            onFinish={onFinish}
            form={contactsForm}
        >
            <div className="form-fields">

                <Text style={{fontSize :'19px', color:'GrayText'}}>Контакти</Text>
                <Form.Item
                    // label="Контакти"
                    className="add-club-row add-club-contacts">
                    {contacts.map(contact =>
                        <Form.Item name={`contact${contact.name}`}
                                   className="add-club-contact"
                                   initialValue={result[`contact${contact.name}`]}
                                   rules={[
                                       isEmailField(contact) &&
                                       {
                                           required: false,
                                           type: "email",
                                           message: "Некоректний формат email"
                                       },
                                       isPhoneField(contact) &&
                                       {
                                           required: true,
                                           message: "Введіть номер телефону"
                                       },
                                       isPhoneField(contact) && {
                                           required: false,
                                           pattern: /^[^-`~!@#$%^&*()/_+={}\[\]|\\:;“"’'<,>.?๐฿]*$/,
                                           message: "Телефон не може містити спеціальні символи"
                                       },
                                       isPhoneField(contact) && {
                                           required: false,
                                           pattern: /^[^\s]*$/,
                                           message: "Телефон не може містити пробільні символи"
                                       },
                                       isPhoneField(contact) && {
                                           required: false,
                                           pattern: /^.{10}$/,
                                           message: "Телефон не відповідає вказаному формату"
                                       },
                                       isPhoneField(contact) && {
                                           required: false,
                                           pattern: /^[^A-Za-zА-Яа-яІіЇїЄєҐґ]*$/,
                                           message: "Телефон не може містити літери"
                                       }
                                   ]}
                                   hasFeedback>
                            <Input className="add-club-input"
                                   name={contact.name}
                                   prefix={isPhoneField(contact) ?"+38" :undefined}
                                   placeholder={isPhoneField(contact) ?"__________" :"Заповніть поле"}
                                   onChange={(e) => changeContacts(e, contact)}
                                   suffix={<MaskIcon maskColor="#D9D9D9" iconUrl={contact.urlLogo} />} />
                        </Form.Item>)}
                </Form.Item>
            </div>
            <div className="btn">
                <Button ghost={true} className="prev-btn" type="button" onClick={prevStep}>Назад</Button>
                <Button className="next-btn" htmlType="submit">Наступний крок</Button>
            </div>
        </Form >
    )
}

export default Contacts;