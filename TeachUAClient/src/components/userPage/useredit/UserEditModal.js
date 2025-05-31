import React, {useState} from "react";
import {Button, Form, message, Modal} from "antd";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import './css/UserEditModal.less';
import UserEditRoles from "./UserEditRoles";
import UserEditInput from "./UserEditInput";
import {updateUser, verify, updatePassword} from "../../../service/UserService";

const UserEditModal = ({user, setUser}) => {

    const [open, setOpen] = useState(false);

    const onFinish = (values) => {
        if(values.urlLogo != null && typeof values.urlLogo !== "undefined" && typeof values.urlLogo !== "string") {
            values.urlLogo = values.urlLogo.file.response;
        }
        const stat = [{status: true}];
        const newValues = stat.reduce((result, item) => Object.assign({}, result, item), values);

        verify(values).then(() => {
            updateUser(newValues)
                .then((updatedUser) => {
                    setUser(updatedUser);
                    message.success("Профіль змінено успішно");
                })
                .catch(() => message.error("Профіль не було оновлено"));

            if(newValues.password) {
                updatePassword(newValues).then(() => {
                    message.success("Пароль змінено успішно");
                    setOpen(false);
                }).catch(() => message.error("Пароль не було змінено"));
            } else {
                setOpen(false);
            }
        }).catch(() => message.error("Введено невірний пароль"));
    };


    return (
        <>
            <Button type="text button" onClick={() => setOpen(true)}>
                Редагувати профіль
                <ArrowRightOutlined/>
            </Button>
            <Modal
                className="user-edit"
                centered
                width={880}
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <div className="edit-header">
                    Редагувати профіль
                </div>

                <Form
                    name="edit"
                    requiredMark={false}
                    onFinish={onFinish}
                >
                    <UserEditRoles user={user}/>
                    <UserEditInput user={user}/>
                </Form>
            </Modal>
        </>
    );
};

export default UserEditModal;
