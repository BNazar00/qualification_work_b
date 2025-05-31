import React from 'react';
import {Button, Form, Input, Layout, message, Modal, Upload} from 'antd';
import {updateItemById} from "../../../service/AboutUsService";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {tokenToHeader} from "../../../service/UploadService";

const EditPicture = ({visible, setVisible, item}) => {
    const [descriptionForm] = Form.useForm();

    const closePopup = () => {
        setVisible(false);
    };

    const onFinish = (values) => {
        if (values.picture && values.picture.file) {
            item.picture = values.picture.file.response;
        }
        item.text = values.text;
        updateItemById(item).then((response) => {
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
            picture: item.picture,
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
                        <Form.Item name="picture"
                                   className="add-club-row"
                                   label="Фото"
                                   hasFeedback>
                            <Upload
                                name="image"
                                action={UPLOAD_IMAGE_URL}
                                data={{folder: `about_us/images`}}
                                accept="image/png,image/jpeg,image/jpg,image/svg,image/jfif,image/.pjp"
                                maxCount={1}
                                headers={{ contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                            >
                                <span className="add-club-upload"><UploadOutlined className="icon" />Завантажити фото</span>
                            </Upload>
                        </Form.Item>
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

export default EditPicture;