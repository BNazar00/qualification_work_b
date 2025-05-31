import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { Button, Form, Input, InputNumber, message, Switch, Typography, Upload } from 'antd';
import { useForm } from "antd/es/form/Form";

import { getChallengeById, updateChallenge } from "../../../service/ChallengeService";
import { BASE_URL, UPLOAD_IMAGE_URL } from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import "react-quill/dist/quill.snow.css";
import Editor from '../../../util/Editor';
import TasksInChallenge from "./TasksInChallenge";
import { tokenToHeader } from "../../../service/UploadService";

const { Title } = Typography;

const EditChallenge = (props) => {

    const [challenge, setChallenge] = useState([{
        id: 0,
        name: "",
        title: "",
        description: "",
        picture: "",
        sortNumber: 0,
        isActive: "",
        tasks: []
    }]);

    const [currentPicture, setCurrentPicture] = useState([{
        uid: "",
        name: "",
        status: "",
        url: ""
    }])
    const [challengeNotFound, setChallengeNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [picture, setPicture] = useState();
    const [challengeEditForm, form] = useForm();
    const challengeId = useParams();
    const [name, setName] = useState();
    const [isChecked, setIsChecked] = useState(challenge.isActive);


    const handleNameChange = (value) => {
        setName(value);
    }

    const getData = () => {
        getChallengeById(challengeId.id).then(response => {
            setChallenge(response);
            setIsChecked(response.isActive);
            let baseImage = [{
                uid: "1",
                name: response.name,
                status: "upload",
                url: BASE_URL + response.picture
            }];
            setCurrentPicture(baseImage);
        }).catch(response => {
            if (response.status === 404) {
                setChallengeNotFound(true);
            }
        });
        setLoading(false);
    };

    const onFill = () => {
        challengeEditForm.setFieldsValue(challenge);
    };

    const saveForm = (values) => {
        updateChallenge(values, challengeId.id).then(response => {
            console.log(response);
            if (response.status) {
                message.warning(response.message);
                return;
            }
            message.success(`Челендж ${challenge.name} успішно оновлено`);
        });
        setChallenge(values);
    };

    const handleToggleSwitch = (state) => {
        console.log("handleChange", state);
        challenge.isActive = state;
        setIsChecked(state)
    };

    const handlePictureChange = (value) => {
        if (value.file.status == "removed") {
            challenge.picture = null;
        } else {
            setPicture("/upload/challenges/" + value.file.name);
            challenge.picture = picture;
        }
        setCurrentPicture(value.fileList);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="add-form">
            <Link
                to="/admin/challenges"
                className="back-btn"
            >
                <Button className="flooded-button">
                    До списку челенджів
                </Button>
            </Link>
            <Link
                to={"/challenges/" + challengeId.id}
                className="back-btn"
            >
                <Button className="flooded-button">
                    Переглянути челендж
                </Button>
            </Link>

            <Link
                to={"/admin/challenge/" + challengeId.id + "/clone"}
                className="back-btn"
            >
                <Button className="flooded-button">
                    Змінити дату старту
                </Button>
            </Link>

            <Title>Редагування челенджа</Title>
            <Form
                initialValues={onFill()}
                onFinish={saveForm}
                form={challengeEditForm}
                autoComplete="off"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
            >
                <Form.Item
                    name="sortNumber"
                    label="Порядковий номер"
                    value={challenge.sortNumber}
                    rules={[
                        {
                            required: true,
                            min: 5,
                            max: 30,
                            message: "Поле \"Порядковий номер\" може містити мінімум 5 максимум 30 символів",
                        },
                        {
                            required: false,
                            pattern: /^[-0-9]*$/,
                            message: "Поле \"Порядковий номер\" може містити тільки цифри",
                        }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="isActive"
                    label="Статус"
                    initialValue={isChecked}
                >
                    <Switch defaultChecked={isChecked} checked={isChecked} onChange={handleToggleSwitch} />
                </Form.Item>
                <Form.Item
                    label="Назва"
                    name="name"
                    value={challenge.name}
                    rules={[
                        {
                            required: true,
                            message: "Поле \"Назва\" не може бути пустим",
                        },
                        {
                            min: 5,
                            max: 30,
                            message: "Поле \"Назва\" може містити мінімум 5 максимум 30 символів"
                        },
                        {
                            required: false,
                            pattern: /^[^ЁёЪъЫыЭэ]+$/,
                            message: "Поле \"Назва\" може містити тільки українські та англійські літери, цифри та спеціальні символи",
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Заголовок"
                    name="title"
                    value={challenge.title}
                    rules={[
                        {
                            required: true,
                            message: "Поле \"Заголовок\" не може бути пустим",
                        },
                        {
                            min: 5,
                            max: 100,
                            message: "Поле \"Заголовок\" може містити мінімум 5 максимум 100 символів"
                        },
                        {
                            required: false,
                            pattern: /^[^ЁёЪъЫыЭэ]+$/,
                            message: "Поле \"Заголовок\" може містити тільки українські та англійські літери, цифри та спеціальні символи",
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Опис"
                    name="description"
                    rules={[
                        {
                            validator: (_, value) => {
                                if (!value.replace(/<[^>]+>/g, '').trim().length > 0) {
                                    return Promise.reject(new Error("Поле \"Опис\" не може бути порожнім"));
                                }
                                else if (value.replace(/<[^>]+>/g, '').length < 40 || value.replace(/<[^>]+>/g, '').length > 25000) {
                                    return Promise.reject(new Error("Поле \"Опис\" може містити мінімум 40 максимум 25000 символів"));
                                }
                                return Promise.resolve();
                            }
                        },
                        {
                            required: false,
                            pattern: /^[^ЁёЪъЫыЭэ]+$/,
                            message: "Поле \"Опис\" може містити тільки українські та англійські літери, цифри та спеціальні символи",
                        }
                    ]}

                >
                    <Editor />
                </Form.Item>
                <Form.Item
                    name="picture"
                    label="Фото"
                    value={picture}
                    rules={[
                        {
                            required: true,
                            message: "Фото не може бути пустим",
                        }]}
                >
                    <Upload
                        name="image"
                        listType="picture-card"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        fileList={currentPicture}
                        accept="image/*"
                        data={{ folder: `challenges` }}
                        headers={{ contentType: 'multipart/form-data', Authorization: tokenToHeader() }}
                        onChange={(uploaded) => handlePictureChange(uploaded)}
                    >
                        <span className="upload-label"><UploadOutlined className="icon" />Завантажити</span>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="flooded-button add-contact-type-button"
                    >
                        Зберегти
                    </Button>
                </Form.Item>
            </Form>
            <div>
                <Title level={3}>Усі завдання</Title>
                <TasksInChallenge />
            </div>
        </div>
    )

}
export default EditChallenge;