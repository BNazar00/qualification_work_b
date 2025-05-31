import React from 'react';
import {Button, Form, Input, Layout, message, Modal, Tooltip} from 'antd';
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
import {updateItemById} from "../../../service/AboutUsService";

const EditTitle = ({visible, setVisible, item, upd}) => {
    const [descriptionForm] = Form.useForm();

    const closePopup = () => {
        setVisible(false);
    };


    const onFinish = (values) => {
        item.text = values.title;
        updateItemById(item).then(response => {
            if (response.status > 200) {
                message.warning(response.message);
                return;
            }else {
                message.success(`Компонент "текст з зображенням" успішно відредаговано`);
            }
        });
        closePopup();
    }

    const isVisible = () => {
        descriptionForm.setFieldsValue({
            title: item.text
        });
        return visible;
    }

    return (

        <Modal
                centered
                visible={isVisible()}
                onOk={() => closePopup()}
                onCancel={() => closePopup()}
                footer={null}
            >
            <br></br>
            <Layout className="aboutProject">
                <Form
                    name="basic"
                    form={descriptionForm}
                    onFinish={onFinish}
                    requiredMark={false}
                >
                    <div>
                        <Form.Item
                            name="title"
                            label="Текст заголовка"
                            rules={[
                                {
                                    required: true,
                                    max: 300,
                                    message: "Поле довжиною 0-300 символів",
                                },
                            ]}
                        >
                            <Input
                                className="input"
                                suffix={
                                    <Tooltip placement="bottomRight"
                                             title="Це поле може містити тільки українські та англійські літери, довжиною 5-100 символів">
                                        <InfoCircleOutlined className="info-icon" />
                                    </Tooltip>
                                }

                                placeholder="Введіть текст заголовка" />
                        </Form.Item>
                    </div>
                    <div className="add-item-button">
                        <Button className="flooded-button donate-button" htmlType="submit">Підтвердити</Button>
                    </div>
                </Form>
            </Layout>
        </Modal>
    );
}

export default EditTitle;