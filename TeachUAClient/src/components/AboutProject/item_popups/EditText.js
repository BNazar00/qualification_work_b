import React from 'react';
import {Button, Form, Input, Layout, message, Modal} from 'antd';
import {updateItemById} from "../../../service/AboutUsService";
import "../css/aboutProject.css";

const EditText = ({visible, setVisible, item, upd}) => {
    const [descriptionForm] = Form.useForm();

    const closePopup = () => {
        setVisible(false);
    };


    const onFinish = (values) => {
        item.text = values.text;
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
            text: item.text
        });
        return visible;
    }

    return (

        <Modal
                centered
                visible={isVisible()}
                 onOk={() => closePopup()}
                onCancel={() => closePopup()}
                width={1200}
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
                            name="text"
                            label="Текст"
                            rules={[
                                {
                                    required: true,
                                    max: 6000,
                                    message: "Поле довжиною 0-6000 символів",
                                },
                            ]}
                        >
                            <Input.TextArea
                                style={{height: 400}}
                                placeholder="Введіть текст" />
                        </Form.Item>
                    </div>
                    <div className="help-button">
                        <Button className="flooded-button donate-button" htmlType="submit">Підтвердити</Button>
                    </div>
                </Form>
            </Layout>
        </Modal>
    );
}

export default EditText;