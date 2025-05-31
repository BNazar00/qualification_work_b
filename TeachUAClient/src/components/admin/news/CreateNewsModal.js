import React from 'react';
import "./css/CreateNewsModal.less";
import {Button, ConfigProvider, DatePicker, Form, Input, message, Modal, Switch, Upload} from "antd";
import {createNews} from "../../../service/NewsService";
import Editor from "../../../util/Editor";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import {tokenToHeader} from "../../../service/UploadService";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import moment from "moment";
import locale from 'antd/lib/locale/uk_UA';
import 'moment/locale/uk';
import {useHistory} from "react-router-dom";

const CreateNewsModal = ({visible, setVisible, getData}) => {

    const [form] = Form.useForm();
    const dateFormat = "DD.MM.YYYY";
    const history = useHistory();


    const onFinish = (values) => {
        const data = {
            ...values,
            date: values.date.toJSON(),
            urlTitleLogo: values.urlTitleLogo.file.response
        };
        console.log(data);
        createNews(data)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                form.resetFields();
                getData();
                message.success(`Новину ${response.title} успішно додано`);
                history.push("/news/" + response.id)

            })
            .catch(reason => message.warning(reason.response.data.message));
        setVisible(false);
    };

    return (
        <div>
            <Modal
                className="createNewsModal"
                centered
                width={900}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <div className="title">
                    Додати Новину
                </div>

                <Form
                    className="form"
                    name="news-from"
                    form={form}
                    onFinish={onFinish}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 25}}
                >
                    <ConfigProvider locale={locale}>
                        <Form.Item
                            label="Дата новини"
                            name="date"
                            initialValue={moment()}
                            rules={[
                                {
                                    required: true,
                                    message: "Додайте дату новини"
                                },
                                () => ({
                                    validator(_, value) {
                                        if (!value || value > moment().startOf('day').valueOf()) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error('Дата повинна бути сьогоднішньою або майбутньою'));
                                    },
                                }),
                            ]}
                        >
                            <DatePicker
                                format={dateFormat}
                                disabledDate={(selected) => selected < moment().startOf('day')}
                            />
                        </Form.Item>
                    </ConfigProvider>

                    <Form.Item
                        label="Активна"
                        name="isActive"
                        valuePropName="checked"
                        initialValue={true}
                        >
                            <Switch />
                    </Form.Item>

                    <Form.Item
                        // className={classes.formItem}
                        label="Заголовок"
                        name="title"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Додайте заголовок"
                            },
                            {
                                min: 10,
                                max: 1500,
                                message: "Заголовок новини повинен містити від 10 до 1500 символів."
                            },
                            {
                                pattern: /^[^ЁёЪъЫыЭэ]+$/,
                                message: "Заголовок новини не може містити російські літери"
                            }
                        ]}
                    >
                        <Input.TextArea autoSize={{minRows: 2, maxRows: 5}}/>
                    </Form.Item>

                    <Form.Item label="Текст новини"
                               name="description"
                               hasFeedback
                               rules={[
                                   {
                                       required: true,
                                       message: "Додайте текст новини"
                                   },
                                   {
                                       pattern: /^.{47,3007}$/,
                                       message: "Текст новини повинен містити від 40 до 15000 символів."
                                   },
                                   {
                                       pattern: /^[^ЁёЪъЫыЭэ]+$/,
                                       message: "Текст новини не може містити російські літери"
                                   }
                               ]}
                    >
                        <Editor/>
                    </Form.Item>

                    <Form.Item name="urlTitleLogo"
                               label="Фото банер"
                               rules={[{
                                   required: true,
                                   message: "Додайте фото банер"
                               }]}
                    >
                        <Upload name="image"
                                listType="picture-card"
                                action={UPLOAD_IMAGE_URL}
                                maxCount={1}
                                accept="image/*"
                                data={{folder: `news`}}
                                headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                        >
                            <span className="add-news-upload">
                                <UploadOutlined className="icon"/>Завантажити
                            </span>
                        </Upload>
                    </Form.Item>
                    {/*<div className="buttons">*/}
                    {/*    <div className="news-button">*/}
                            <Form.Item>
                                <Button className="formButton"
                                        type="primary"
                                        htmlType="submit"
                                >
                                    Зберегти
                                </Button>
                            </Form.Item>
                        {/*</div>*/}
                        {/*<div className="news-button">*/}
                        {/*    <Form.Item>*/}
                        {/*        <Button className="formButton"*/}
                        {/*            // type="primary"*/}
                        {/*            // htmlType="submit"*/}
                        {/*        >*/}
                        {/*            Переглянути*/}
                        {/*        </Button>*/}
                        {/*    </Form.Item>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </Form>
            </Modal>
        </div>
    );
};

export default CreateNewsModal;