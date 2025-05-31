import React, {useEffect, useState} from 'react';
import {Form, Input, message, Typography, Upload, DatePicker, Button, Select} from "antd";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {useForm} from "antd/es/form/Form";
import {createTask} from "../../../service/TaskService";
import Editor from "../../../util/Editor";
import {getAllChallenges} from "../../../service/ChallengeService";
import {Link, useHistory } from "react-router-dom";
import ChallengesInTasks from "./ChallengesInTasks";
import {tokenToHeader} from "../../../service/UploadService";
const { Option } = Select;

const { Title } = Typography;
const { TextArea } = Input;

const AddTask = () => {
    const [taskForm] = useForm();
    const [name, setName] = useState();
    const [headerText, setHeaderText] = useState();
    const [picture, setPicture] = useState();
    const [startDate, setStartDate] = useState();
    const history = useHistory();
    const [task, setTask] = useState({
        id: 0,
        name: '',
        headerText: '',
        description: '',
        picture: '',
        startDate: '',
        challengeId: 0,
    });
    const [challengeList, setChallengeList] = useState([
        {
            'id' : 0,
            'name' : '',
            'title' : '',
            'sortNumber' : 0
        }
    ]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState();
    const [taskId, setTaskId] = useState();
    const dateFormat = 'YYYY-MM-DD';

    const getData = () => {
        getAllChallenges().then(response => {
            setChallengeList(response);
        });
        setLoading(false);
    };

    const handleChange = (id) => {
        setId(id);
    }

    const getChallenges = () => {
        taskForm.setFieldsValue({})
    }

    useEffect(() => {
        getData();
    }, []);

    const onDateChange = (date, dateString) => {
        setStartDate(dateString);
    }

    const onFinish = (values) => {
        const formValues = {...values, startDate: startDate}
        createTask(formValues, values.challengeId)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                setTaskId(response.id)
                message.success("Завдання" + response.name + "' успішно додане!");
                history.push("/challenges/task/" + response.id)
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="add-form">
            <Link
                to="/admin/tasks"
                className="back-btn"
            >
                <Button  className="flooded-button">
                    До списку завдань
                </Button>
            </Link>
            <Link
                to={"/challenges/task/" + taskId}
                className="back-btn"
            >
                <Button disabled={!taskId} className="flooded-button">
                    Переглянути завдання
                </Button>
            </Link>
            <Title>Додайте завдання</Title>
            <Form
                form={taskForm}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ remember: true }}
                autoComplete="off"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}>
                <Form.Item
                    label="Дата початку"
                    name="startDate"
                    rules={[
                        {
                            required: true,
                            message: "Дата не може бути пустою",
                        }]}
                >
                        <DatePicker
                            onChange={onDateChange}
                            format={dateFormat}
                            value={startDate}
                        />
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
                        accept="image/*"
                        maxCount={1}
                        data={{folder:`tasks`}}
                        headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}>
                        <span className="upload-label"><UploadOutlined className="icon"/>Завантажити</span>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Назва"
                    name="name"
                    value={name}
                    rules={[
                        {
                            required: true,
                            message: "Поле \"Назва\" не може бути пустим",
                        },
                        {
                            min: 5,
                            max: 50,
                            message: "Поле \"Назва\" може містити мінімум 5 максимум 50 символів"
                        },
                        {
                            required: false,
                            pattern: /^[^ЁёЪъЫыЭэ]+$/,
                            message: "Поле \"Назва\" може містити тільки українські та англійські літери, цифри та спеціальні символи",
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Заголовок"
                    name="headerText"
                    rules={[
                        {
                            validator: (_, value) => {
                                if (!value.replace(/<[^>]+>/g, '').trim().length > 0) {
                                    return Promise.reject(new Error("Поле \"Заголовок\" не може бути порожнім"));
                                }
                                else if (value.replace(/<[^>]+>/g, '').length < 40 || value.replace(/<[^>]+>/g, '').length > 3000) {
                                    return Promise.reject(new Error("Поле \"Заголовок\" може містити мінімум 40 максимум 3000 символів"));
                                }
                                return Promise.resolve();
                            },
                        },
                        {
                            required: false,
                            pattern: /^[^ЁёЪъЫыЭэ]+$/,
                            message: "Поле \"Заголовок\" може містити тільки українські та англійські літери, цифри та спеціальні символи",
                        }
                    ]}
                >
                    <Editor />
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
                                else if (value.replace(/<[^>]+>/g, '').length < 40 || value.replace(/<[^>]+>/g, '').length > 3000) {
                                    return Promise.reject(new Error("Поле \"Опис\" може містити мінімум 40 максимум 3000 символів"));
                                }
                                return Promise.resolve();
                            },
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
                    label="Челендж"
                    name="challengeId"
                    rules={[
                        {
                            required: true,
                            message: "Челлендж не може бути пустим",
                        }]}
                >
                    <Select
                        placeholder="Оберіть челендж"
                        allowClear
                        name="id"
                        value={id}
                        onChange={handleChange}
                        onSelect={getChallenges}
                    >
                        {challengeList.map((option, index) => (
                            <Option
                                value={option.id}
                                key={option.id}
                            >
                                {option.name}
                            </Option>
                        ))}
                    </Select>
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
                <Title level={3}>Доступні челенджі</Title>
                <ChallengesInTasks />
            </div>
        </div>
    )
}

export default AddTask;