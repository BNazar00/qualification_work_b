import React from 'react';
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import { Form, Radio } from "antd";

const RegistrationRoles = ({ setDisabledButton, setRole }) => {
    // const RegistrationRoles = ({setRole }) => {
        const onChange = e => {
            console.log(e.target.value);
            setDisabledButton(false);
            setRole(e.target.value);
            //setDisabledButton(false);
        }

        return (
            <Form.Item name="role" initialValue="ROLE_MANAGER">
                {/*<Form.Item name="role" initialValue="ROLE_MANAGER" >*/}
                    <Radio.Group className="button-container"
                                 onChange={onChange}
                                 optionType="button"
                                 buttonStyle="solid">
                        {/*onChange={onChange}*/}
                        {/*defaultValue="ROLE_MANAGER"*/}
                        {/*optionType="button"*/}
                        {/*buttonStyle="solid">*/}
                        {/*<Radio.Button value="ROLE_USER">*/}
                        {/*    <div className="button-box">*/}
                        {/*        <div className="ellipse"><UserOutlined className="user-icon" /></div>*/}
                        {/*        Відвідувач*/}
                        {/*    </div>*/}
                        {/*</Radio.Button>*/}
                        <Radio.Button value="ROLE_MANAGER">
                            <div className="button-box">
                                <div className="ellipse"><UserOutlined className="user-icon" /></div>
                                Керівник
                            </div>
                        </Radio.Button>
                    </Radio.Group>
                </Form.Item>
                )
                };
                export default RegistrationRoles;
