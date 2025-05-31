import React from "react";
import {Button, Form, Input, message} from "antd";
import {addToTable} from "../../../util/TableUtil";
import {addQuestion} from "../../../service/QuestionService";

const {TextArea} = Input;

const AddQuestion = ({questions, setQuestions}) => {
    const onFinish = (values) => {
        addQuestion(values)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }

                message.success(`${response.title} успішно додане`);

                setQuestions(addToTable(questions, response));
            });
    };

    return (
        <div className="add-question">
        <Form
              name="basic"
              requiredMark={false}
              onFinish={onFinish}>
            <Form.Item name="title"
                       rules={[{
                           required: true,
                           message: "Введіть питання"
                       }]}>
                <Input className="add-question-input"
                       placeholder="Питання">
                </Input>
            </Form.Item>
            <Form.Item name="text"
                       rules={[{
                           required: true,
                           message: "Введіть відповідь"
                       }]}>
                <TextArea rows={4}
                          placeholder="Відповідь"/>
            </Form.Item>
            <Button htmlType="submit" className="flooded-button add-question-button">Додати</Button>
        </Form>
        </div>
    );
};

export default AddQuestion;