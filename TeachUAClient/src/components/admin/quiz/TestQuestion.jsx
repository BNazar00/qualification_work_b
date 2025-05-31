import React, {useEffect, useState} from "react";
import { Typography, Form, Input, InputNumber, Button, message, Select, Col, Row } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useParams } from "react-router-dom";
import './css/TestQuestion.css';

import { getQuestionById, getQuestionTypes, getQuestionCategories, createQuestion, updateQuestion } from "../../../service/TestQuestionService";

const { Title } = Typography;

const InputGroup = Input.Group;

export const TestQuestion = () => {

    const emptyQuestion = {
        title: '',
        description: '',
        answerTitles: [],
        answers: []
    }

    const questionIsTrueOptions = [
        {label: 'Правильна', value: true},
        {label: 'Не правильна', value: false}
    ]

    const [form] = Form.useForm();
    const params = useParams();
    const [isEditing, setEditing] = useState(false);
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [question, setQuestion] = useState(emptyQuestion);

    const init = () => {
        setEditing(params.id !== undefined);    // if question is edited or a new one is created
    }

    const fetchData = () => {
        if (isEditing) {
            fetchQuestion();
        }
        getQuestionTypes().then(response => {
            setTypes(mapSelect(response.data));
            form.resetFields();
        });
        getQuestionCategories().then(response => {
            setCategories(mapSelect(response.data));
            form.resetFields();
        })
    }

    const fetchQuestion = () => {
        getQuestionById(params.id).then(response => {
            setQuestion(response.data);
            form.resetFields();
        });
    }

    const mapSelect = (options) => {
        return options.map(option => Object.fromEntries([
            ['label', option.title],
            ['value', option.title]
        ]));
    }

    const onFinish = (question) => {
        console.log(question);
        if (isEditing) {
            updateQuestion(params.id, question).then(response => {
                message.success('Питання збережено')
            }).catch(function (error) {
                message.error(error.response.data.message);
            })
            return;
        }
        createQuestion(question).then(response => {
            message.success('Питання збережено');
        }).catch(function (error) {
            message.error(error.response.data.message);
        })
    }

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        fetchData();
    }, [isEditing]);

    return (
        <div className="question-form">
            <Link
                to="/admin/quiz/questions/edit"
                className="back-btn"
            >
                <Button  className="flooded-button">
                    До списку питаннь
                </Button>
            </Link>
            <Title>Редагування питання</Title>
            <Form
                form={ form }
                layout='horizontal'
                onFinish={ onFinish }
                initialValues={ question }
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
            >

                <Form.Item
                    name="title"
                    label="Заголовок"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Опис"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                // Must have the same name as question DTO field
                    name="questionTypeTitle"
                    label="Тип"
                >
                    <Select options={ types } />
                </Form.Item>

                <Form.Item
                    name="questionCategoryTitle"
                    label="Категорія"
                >
                    <Select options={ categories } />
                </Form.Item>

                <Col offset={4}>
                    <Title level={3}>Відповіді</Title>

                    <Form.List name="answers">
                        {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                            <InputGroup size="large" key={key}>

                                <Row gutter={8}>
                                    <Col span={10}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'text']}
                                        >
                                            <Input placeholder="Текст відповіді" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={10}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'correct']}
                                        
                                        >
                                            <Select 
                                                    options={ questionIsTrueOptions }
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'value']}
                                        
                                        >
                                            <InputNumber/>
                                        </Form.Item>
                                    </Col>

                                    <Col>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Col>
                                </Row>

                                

                                
                                
                            </InputGroup>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Додати відповідь
                                </Button>
                            </Form.Item>
                        </>
                        )}
                    </Form.List>

                </Col>

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
        </div>
    )
}