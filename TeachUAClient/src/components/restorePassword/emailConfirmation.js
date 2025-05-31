import React from 'react';
import {Button, Form, Input} from "antd";
import {MailOutlined} from "@ant-design/icons";

const EmailInput = () => {
    return (
        <div>
            <div className="login-or"><span className="label-or"></span></div>
            <div className="login-column">
                <Form.Item name="email"
                           className="login-input"
                           hasFeedback
                           rules={[{
                               required: true,
                               type: 'email'
                           }]}>
                    <Input className="login-box"
                           placeholder="Введіть ваш емейл"
                           suffix={<MailOutlined className="mail-icon"/>}/>
                </Form.Item>

            </div>
            <Form.Item>
                <div className="login-footer">
                    <Button className="login-button"
                            htmlType="submit">
                        Відновити
                    </Button>
                </div>
            </Form.Item>
        </div>
    )
};

export default EmailInput;