import React, { useState } from 'react';
import {Button, Form, Input, InputNumber, Layout, message, Modal, Tooltip} from 'antd';
import { mapSearchParameters, searchParameters} from "../../../context/SearchContext";
import {changeOrder, deleteItem, updateItemById} from "../../../service/AboutUsService";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
import {deleteFile, uploadImage} from "../../../service/UploadService";

const ChangeItemOrder = ({ visible, setVisible, size, id}) => {

    const closePopup = () => {
        setVisible(false);
    };


    const onFinish = (values) => {
        changeOrder(id, values.number).then(response => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            message.success(`Порядок успішно змінений`);
        });
        closePopup();
    }

    return (
        <Modal
            centered
            visible={visible}
            onOk={() => closePopup()}
            onCancel={() => closePopup()}
            footer={null}
        >
            <Layout className="aboutProject global-padding">
                <Form
                    onFinish={onFinish}
                    >
                    <div className="row">
                        <span className="chapter">
                            Введіть число від 1 до {size}
                        </span>
                    </div>
                    <div className="inputNum">
                    <Form.Item
                        name="number"
                        rules={[
                            {
                                required: true,
                                type:'number',
                                min: 1,
                                max: size,
                                message: "Число повинне бути в межах від 1 до " + size,
                            }
                        ]}
                    >
                        <InputNumber
                            className="inputNum"
                            suffix={
                                <Tooltip placement="bottomRight"
                                         title="Це поле може містити тільки цифри">
                                    <InfoCircleOutlined className="info-icon" />
                                </Tooltip>
                            }

                            placeholder="Введіть число" />
                    </Form.Item>
                    </div>
                    <div className="row">
                        <div className="add-item-button">
                            <Button htmlType="submit" className="flooded-button donate-button"
                                    >
                                Так, підтвердити
                            </Button>
                        </div>
                    </div>
                </Form>
            </Layout>
        </Modal>
    )
}

export default ChangeItemOrder;