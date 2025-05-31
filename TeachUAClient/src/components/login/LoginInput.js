import React from 'react';
import {Button, Form, Input} from "antd";
import {MailOutlined} from "@ant-design/icons";

const LoginInput = () => {
    return (
        <div>
            <div className="login-or"><span className="label-or">або</span></div>
            <div className="login-column">
                <Form.Item name="email"
                           className="login-input"
                           label="Емейл"
                           hasFeedback
                           rules={[{
                               required: true,
                               type: 'email'
                           }]}>
                    <Input className="login-box"
                           placeholder="Введіть ваш емейл"
                           suffix={<MailOutlined className="mail-icon"/>}/>
                </Form.Item>

                <Form.Item name="password"
                           className="login-input"
                           label="Пароль"
                           hasFeedback
                           rules={[{
                               required: true,
                           }]}>
                    <Input.Password className="login-box"
                                    placeholder="Введіть ваш пароль"/>
                </Form.Item>
            </div>
            <Form.Item>
                <div className="login-footer">
                    <Button className="login-button"
                            htmlType="submit">
                        Увійти
                    </Button>
                </div>
            </Form.Item>
        </div>
    )
};

export default LoginInput;