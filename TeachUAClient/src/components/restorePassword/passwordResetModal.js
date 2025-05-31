import React, { useContext, useState } from "react";
import Layout from "antd/lib/layout/layout";
import './../verifyPage/css/VerifyPage.less';
import "../userPage/css/User.less"
import { Form, message, Modal } from "antd";
import { changePassword } from "../../service/UserService";
import PasswordResetInput from "./passwordResetInput";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ResetPasswordModal = () => {
    const [visible, setVisible] = useState(true);
    const {setShowLogin} = useContext(AuthContext);
    const history = useHistory();

    const onFinish = (values) => {
        changePassword(values).then(() => {
            message.success("Пароль змінено успішно");
            history.push("/");
            setVisible(false);
            setShowLogin(true);
        }).catch((error) => message.error(error.response.data.message));
    };

    return (
        <div>
            <Layout className="aboutProject global-padding">
                <Modal
                    className="user-edit"
                    centered
                    width={540}
                    onOk={() => setVisible(false)}
                    visible={visible}
                    onCancel={() => setVisible(true)}
                    footer={null}
                    closeIcon={visible}
                >
                    <div className="edit-header">
                        Відновлення паролю
                    </div>
                    <Form
                        name="edit"
                        requiredMark={true}
                        onFinish={onFinish}
                    >
                        <PasswordResetInput/>
                    </Form>
                </Modal>
            </Layout>
        </div>
    )
}
export default ResetPasswordModal;