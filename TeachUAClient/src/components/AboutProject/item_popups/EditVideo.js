import React from 'react';
import {Button, Form, Input, Layout, message, Modal, Tooltip} from 'antd';
import {updateItemById} from "../../../service/AboutUsService";

const EditVideo = ({visible, setVisible, item, upd}) => {
    const [descriptionForm] = Form.useForm();

    const closePopup = () => {
        setVisible(false);
    };


    const onFinish = (values) => {
        item.video = values.video;
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
            video: item.video
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
                            name="video"
                            label="Посилання на відео"
                            rules={[
                                {
                                    required: true,
                                    message: "Це поле не може бути пустим",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Введіть посилання на відео" />
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

export default EditVideo;