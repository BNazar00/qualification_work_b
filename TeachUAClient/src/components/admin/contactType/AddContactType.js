import React, {useState} from "react";
import {Button, Form, Input, message, Upload} from "antd";
import {addToTable} from "../../../util/TableUtil";
import {addContactType} from "../../../service/ContactTypeService";
import "./css/AddContactType.css";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {tokenToHeader} from "../../../service/UploadService";

const AddContactType = ({contactTypes, setContactTypes}) => {
    const onFinish = (values) => {
        addContactType(values)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }

                message.success(`${response.name} успішно доданий`);

                setContactTypes(addToTable(contactTypes, response));
            });
    };

    return (
        <div className="add-contact-type">
            <Form className="add-district"
                  name="basic"
                  requiredMark={false}
                  onFinish={onFinish}>
                <Form.Item name="name"
                           rules={[{
                               required: true,
                               message: "Введіть назву контакта"
                           }]}>
                    <Input className="add-contact-type-input"
                           placeholder="Назва контакта">
                    </Input>
                </Form.Item>
                <Form.Item name="urlLogo"
                           rules={[{
                               required: true,
                               message: "Завантажте лого"
                           }]}>
                    <Upload
                        name="image"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        accept="image/*"
                        data={{folder: `contact-types`}}
                        headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                    >
                        <span className="add-club-upload"><UploadOutlined className="icon"/>Завантажити лого</span>
                    </Upload>
                </Form.Item>
                <Button htmlType="submit" className="flooded-button add-contact-type-button">Добавити</Button>
            </Form>
        </div>
    );
};

export default AddContactType;