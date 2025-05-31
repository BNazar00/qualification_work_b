import React, { useContext } from 'react';
import { Form, message, Modal } from "antd";
import LoginSocial from "./LoginSocial";
import LoginInput from "./LoginInput";
import RestorePasswordModal from "../restorePassword/restorePasswordModal";
import { getUserById, signIn } from "../../service/UserService";
import { saveUserId, saveTokens, saveRole, getUserId } from '../../service/StorageService';
import './../restorePassword/css/RestorePassword.less';
import './css/Login.less';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [form] = Form.useForm();
    const {showLogin, setShowLogin, setUser} = useContext(AuthContext);

    const onFinish = (values) => {
        signIn(values).then((response) => {
            message.success("Ви успішно залогувалися!");
            saveUserId(response.id);
            saveRole(response.roleName);
            saveTokens(response.accessToken, response.refreshToken);
            setShowLogin(false);
            getUserById(getUserId()).then(response => {
                setUser(response);
            });
            form.resetFields();
        }).catch((error) => {
            const response = error.response.data;
            if (response.status >= 500) {
                message.error("Ваш email не підтверджено. Будь ласка підтвердіть email");
            } else if(response.status < 500){
                message.destroy();
                message.error("Введено невірний пароль або email");
            }
        });
    };

    return (
            <Modal
                className="modal-login"
                centered
                width={520}
                visible={showLogin}
                onOk={() => setShowLogin(false)}
                onCancel={() => setShowLogin(false)}
                footer={null}
            >
                <div className="login-header">
                    Вхід
                </div>
                <div className="login-content">
                    <Form
                        form={form}
                        name="basic"
                        requiredMark={false}
                        onFinish={onFinish}
                    >
                        <LoginSocial />
                        <LoginInput />

                    </Form>
                </div>
                <div className="restore-password">
                    <RestorePasswordModal/>
                </div>
            </Modal>
        
    );
};

export default Login;