import React, {useState} from "react";
import './css/ImportQuestionsData.css';
import {Button, Form, Input, Layout, message} from "antd";
import {Link} from "react-router-dom";
import {useForm} from "antd/es/form/Form";
import {questionsImport} from "../../../service/QuizService";
import Text from "antd/lib/typography/Text";
import {Content} from "antd/es/layout/layout";
import {redirect} from "react-router";
import {BASE_URL} from "../../../service/config/ApiConfig";

const ImportQuestionsData = () => {

    const [formUri, setFormUri] = useState();
    const [importForm] = useForm();

    const handleFormUri = (value) => {
        setFormUri(value);
    };

    const onFinish = (formId) => {
        questionsImport(formId)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;

                }
                redirect(BASE_URL+"/admin/quiz/questions");
                message.success(`Питання було успішно додані`);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Layout className="" style={{paddingTop: 50}}>
            <Content className="certificate-page">
                <Link
                    to="/admin/quiz/questions"
                    className="back-btn-quiz">
                    <Button className="flooded-button">
                        До списку запитань
                    </Button>
                </Link>
                <div className="import-page">

                    <Text
                        className="text-hint-quiz">
                        Введіть посилання на Google Form для імпортуйте питання
                    </Text>

                    <Form
                        className="formId"
                        form={importForm}
                        requiredMark={false}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >

                        <Form.Item
                            name="formId"
                            rules={[{
                                required: true,
                                message: "Укажіть посилання"
                            }]}
                            onChange={handleFormUri}
                        >

                            <Input className="formId"
                                   placeholder="Посилання на Google Form">
                            </Input>

                        </Form.Item>


                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="flooded-button add-contact-type-button"
                            >
                                Імпортувати
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>


    )

}
export default ImportQuestionsData;