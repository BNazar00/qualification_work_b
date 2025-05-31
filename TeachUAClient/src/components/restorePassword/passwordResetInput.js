import React from 'react';
import {Button, Form, Input} from "antd";
import "../userPage/css/User.less"
import "./css/RestorePassword.less"
const PasswordResetInput = () => {

    const queryParams = new URLSearchParams(window.location.search);
    return (

        <div className="user-reset-column">

            <Form.Item name="verificationCode"
                       initialValue={queryParams.get('code')}/>

            <Form.Item name="password"
                       className="user-edit-input"
                       hasFeedback
                       rules={[
                           {
                               required:false,
                               pattern: /^\S{8,20}$/,
                               message: 'Пароль не може бути коротшим, ніж 8 та довшим, ніж 20 символів'

                           },
                           {
                               pattern: /^(?=[a-zA-Z0-9~`!@#$%^&()_=+{}[\]|:;"<>?])(?=.*[a-zA-Z])(?=.*\d)(?=.*[~`!@#$%^&()_=+{}[\]|:;"<>?])[a-zA-Z0-9~`!@#$%^&()_=+{}[\]|:;"<>?]+$/,
                               message: "Пароль повинен містити великі/маленькі літери латинського алфавіту, цифри та спеціальні символи"
                           },


                      ] }>
                <Input.Password className="login-box"
                                placeholder="Введіть новий пароль"/>

            </Form.Item>
            <Form.Item name="new-password"
                       className="user-edit-input"
                       hasFeedback
                       rules={[
                           ({getFieldValue}) => ({
                               validator(_, value) {
                                   if (getFieldValue('password') === value) {
                                       return Promise.resolve();
                                   }

                                   return Promise.reject(new Error('Значення поля ‘Підтвердити новий пароль’ має бути еквівалентним значенню поля ‘Новий пароль’'));
                               },

                           })]}>
                <Input.Password className="login-box"
                                placeholder="Введіть новий пароль повторно"/>

            </Form.Item>

            <div><p></p></div>
            <Form.Item>

                    <Button className="submit-button"
                            htmlType="submit">
                        Змінити пароль
                    </Button>
            </Form.Item>
        </div>
    )
};

export default PasswordResetInput;