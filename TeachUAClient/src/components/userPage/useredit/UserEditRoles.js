import React from 'react';
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import {Form, Radio} from "antd";

const UserEditRoles = ({user}) => {
    function disable(value) {
        if (value === "ROLE_USER" || value ==="ROLE_ADMIN") {
            return true;
        } else if (value === "ROLE_MANAGER")
            return false;
    }

    return (
        <Form.Item name="roleName" initialValue={user.roleName}>
            <Radio.Group className="button-container"
                         optionType="button"
                         buttonStyle="solid"
            >
                <Radio.Button value="ROLE_USER"
                              disabled={disable(user.roleName)}>
                    <div className="button-box">
                        <div className="ellipse"><UserOutlined className="user-icon"/></div>
                        <div className="role-name"> Відвідувач</div>
                    </div>
                </Radio.Button>
                <Radio.Button value="ROLE_MANAGER"
                              disabled={disable(user.roleName)}>
                    <div className="button-box">
                        <div className="ellipse"><UserOutlined className="user-icon"/></div>
                        <div className="role-name"> Керівник</div>
                    </div>
                </Radio.Button>
            </Radio.Group>
        </Form.Item>
    )
}
export default UserEditRoles;
