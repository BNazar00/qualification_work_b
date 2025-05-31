import React, {useState} from 'react';
import {Button, Form, Input, message} from 'antd';
import {useMediaQuery} from 'react-responsive';
import {MailOutlined, PhoneOutlined} from "@ant-design/icons";
import './сss/Registration.less';


// const RegistrationInput = ({disabledButton}) => {
const RegistrationInput = () => {

    const [isDisabled, setDisabled] = useState(true)
    const [isValid, setValid] = useState(false)
    const [registerForm, setRegisterForm] = useState({
        lastName: "",
        firstName: "",
        phone: "",
        email: "",
        password: "",
        confirm: ""
    })
    const isMobile = useMediaQuery({query: `(max-width: 824px)`});

    const onChange = e => {
        console.log(e.target.id);
        if (e.target.id === "lastName")
            registerForm.lastName = e.target.value
        if (e.target.id === "firstName")
            registerForm.firstName = e.target.value
        if (e.target.id === "phone")
            registerForm.phone = e.target.value
        if (e.target.id === "email")
            registerForm.email = e.target.value

        if (e.target.id === "password") {
            registerForm.password = e.target.value;
        }
        if (e.target.id === "confirm")
            registerForm.confirm = e.target.value

        if (registerForm.password === registerForm.confirm) {
            setValid(true)
        } else {
            setValid(false)
        }

        if (registerForm.lastName.length > 1
            && registerForm.firstName.length > 1
            && registerForm.phone.length === 10
            && registerForm.email.length > 5
            && registerForm.password.length > 7
            && registerForm.confirm.length > 7) {
            setDisabled(false)
        } else setDisabled(true)
    }

    return (
        <div className="registration-input-box" onChange={onChange}>
            <div className="registration-or"><span className="label-or">або</span></div>
            <div className="registration-column">

                <Form.Item name="lastName"
                           className="registration-input"
                           label="Прізвище"
                           hasFeedback
                           rules={[{
                               required: true,
                               message: 'Введіть прізвище',
                           },
                               {
                                   required: false,
                                   pattern: /^[^0-9]*$/,
                                   message: 'Прізвище не може містити цифри',
                               },
                               {
                                   required: false,
                                   pattern: /^[^ЁёЪъЫыЭэ]/,
                                   message: 'Прізвище не може містити російські літери'
                               },
                               {
                                   required: false,
                                   pattern: /^(?=[^-'ʼ\s]).*[^-'ʼ\s]$/,
                                   message: 'Прізвище повинно починатися і закінчуватися літерою',
                               },
                               {
                                   required: false,
                                   pattern: /^[^`~!@₴£№#$%^&*()_+={}\[\]|/\\:;“"<,>.?๐฿]*$/,
                                   message: 'Прізвище не може містити спеціальні символи',
                               },
                               {
                                   max: 25,
                                   message: 'Прізвище не може містити більше, ніж 25 символів',
                               }]}>
                    <Input className="registration-box"
                           placeholder="Введіть ваше прізвище"/>
                </Form.Item>
                <Form.Item name="firstName"
                           className="registration-input"
                           label="Ім`я"
                           hasFeedback
                           rules={[{
                               required: true,
                               message: "Введіть ім`я",
                           },
                               {
                                   required: false,
                                   pattern: /^[^0-9]*$/,
                                   message: "Ім`я не може містити цифри",
                               },
                               {
                                   required: false,
                                   pattern: /^(?=[^-'ʼ\s]).*[^-'ʼ\s]$/,
                                   message: "Ім`я повинно починатися і закінчуватися літерою",
                               },
                               {
                                   required: false,
                                   pattern: /^[^ЁёЪъЫыЭэ]/,
                                   message: "Ім`я не може містити російські літери"
                               },
                               {
                                   required: false,
                                   pattern: /^[^`~!@₴£№#$%^&*()_+={}\[\]|/\\:;“"<,>.?๐฿]*$/,
                                   message: "Ім`я не може містити спеціальні символи",
                               },
                               {
                                   max: 25,
                                   message: "Ім`я не може містити більше, ніж 25 символів",
                               }]}>
                    <Input className="registration-box"
                           placeholder="Введіть ваше ім`я"/>
                </Form.Item>
                <Form.Item name="phone"
                           className="registration-input"
                           label="Телефон"
                           hasFeedback
                           rules={[{
                               required: true,
                               message: 'Введіть номер телефону'
                           },
                               {
                                   required: false,
                                   pattern: /^[^A-Za-zА-Яа-яІіЇїЄєҐґ]*$/,
                                   message: 'Телефон не може містити літери',
                               },
                               {
                                   required: true,
                                   pattern: /^[^\s]*$/,
                                   message: 'Телефон не може містити пробіли',
                               },
                               {
                                   pattern: /^.{10}$/,
                                   message: "Телефон не відповідає вказаному формату ",
                               },
                               {
                                   pattern: /^(0)/,
                                   message: "Телефон не відповідає українському формату (+380)",
                               },
                               {
                                   required: false,
                                   pattern: /^[^-`~!@#$%^&*()_+={}\[\]|\\:;“’'<,>.?๐฿]*$/,
                                   message: 'Телефон не може містити спеціальні символи',
                               }]}>
                    <Input className="registration-box"
                           placeholder="__________"
                           prefix='+38'
                           suffix={<PhoneOutlined className="phone-icon"/>}/>
                </Form.Item>
                <Form.Item name="email"
                           className="registration-input"
                           label="Email"
                           hasFeedback
                           rules={[{
                               required: true,
                               message: 'Введіть email'
                           },
                               {
                                   type: 'email',
                                   message: 'Некоректний формат email',
                               }]}>
                    <Input className="registration-box"
                           placeholder="Введіть ваш емейл"
                           suffix={<MailOutlined className="mail-icon"/>}/>
                </Form.Item>
                <Form.Item name="password"
                           className="registration-input"
                           label="Пароль"
                           hasFeedback
                           rules={[{
                               required: true,
                               message: 'Введіть пароль'
                           }, {
                               min: 8,
                               max: 20,
                               message: 'Пароль не може бути коротшим, ніж 8 та довшим, ніж 20 символів'
                           }, {
                               pattern: /[a-z]/,
                               message: "Пароль повинен містити хоча б одну маленьку літеру"
                           }, {
                               pattern: /[A-Z]/,
                               message: "Пароль повинен містити хоча б одну велику літеру"
                           }, {
                               pattern: /[0-9]/,
                               message: "Пароль повинен містити хоча б одну цифру"
                           }, {
                               pattern: /[~`!@#$%^&()_=+{}\\\[\\\]\\\/|:;,"<>?]/,
                               message: "Пароль повинен містити хоча б один спец. символ"
                           }, {
                               pattern: /^[^А-Яа-яЇїІіЄєҐґЁёЪъЫыЭэ]+$/,
                               message: 'Пароль не може містити українські та російські літери'
                           }
                           ]}>
                    <Input.Password className="registration-box"
                                    placeholder="Введіть ваш пароль"/>
                </Form.Item>
                <Form.Item name="confirm"
                           className="registration-input"
                           label={!isMobile ? <label className="confirm-password">
                                   <div>
                                       <p className="dead">Підтвердження</p>
                                       <p className="dead">паролю</p>
                                   </div>
                               </label>
                               :
                               "Підтвердження паролю"
                           }
                           hasFeedback
                           rules={[
                               {
                                   required: true,
                                   message: 'Підтвердіть пароль',
                               },
                               ({getFieldValue}) => ({
                                   validator(value) {
                                       if (!value || getFieldValue('password') === value) {
                                           return Promise.resolve();
                                       }
                                       if (!isValid) {
                                           return Promise.reject(new Error('Значення поля ‘Підтвердити пароль’ має бути еквівалентним значенню поля ‘Пароль’'));
                                       }
                                       return Promise.resolve();
                                       return Promise.reject(new Error('Значення поля ‘Підтвердити пароль’ має бути еквівалентним значенню поля ‘Пароль’'));
                                   },
                               }),
                           ]}
                >
                    <Input.Password className="registration-box"
                                    placeholder="Підтвердіть ваш пароль"/>
                </Form.Item>
            </div>
            <div className="agreement-text">
                Натискаючи кнопку "Зареєструватися", я даю згоду на обробку персональних даних
            </div>
            <Form.Item>
                <div className="registration-footer">
                    <Button className="registration-button"
                            htmlType="submit"
                            disabled={isDisabled}
                    >Зареєструватися
                    </Button>
                </div>
            </Form.Item>
        </div>
    )
};
export default RegistrationInput;
