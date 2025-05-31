import {Form, message, Popconfirm} from "antd";
import React, {useEffect, useState} from "react";
import EditableTable from "../../EditableTable";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";
import {deleteQuestionById, getAllQuestions, updateQuestionById} from "../../../service/QuestionService";
import AddQuestion from "./AddQuestion";

const QuestionTable = () => {
        const [form] = Form.useForm();
        const [questions, setQuestions] = useState([]);

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                width: '5%',
                editable: false,
                defaultSortOrder: 'ascend',
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Питання',
                dataIndex: 'title',
                width: '25%',
                inputType: 'textarea',
                editable: true,
            },
            {
                title: 'Відповідь',
                dataIndex: 'text',
                width: '50%',
                inputType: 'textarea',
                editable: true,
            }
        ];

        const actions = (record) => [
            <Popconfirm title="Видалити питання?"
                        cancelText="Ні"
                        okText="Так"
                        cancelButtonProps={{
                            className: "popConfirm-cancel-button"
                        }}
                        okButtonProps={{
                            className: "popConfirm-ok-button"
                        }}
                        onConfirm={() => remove(record)}>
                <span className="table-action">Видалити</span>
            </Popconfirm>,
        ];

        const getData = () => {
            getAllQuestions().then(response => {
                setQuestions(response)
            });
        };

        useEffect(() => {
            getData();
        }, []);

        const remove = (record) => {
            deleteQuestionById(record.id)
                .then((response) => {
                    if (response.status) {
                        message.warning(response.message);
                        return;
                    }

                    message.success(`Питання ${record.title} успішно видалене`);

                    setQuestions(deleteFromTable(questions, record.id));
                });
        };

        const save = async (record) => {
            editCellValue(form, questions, record.id).then((editedData) => {
                updateQuestionById(editedData.item).then(response => {
                    if (response.status) {
                        message.warning(response.message);
                        return;
                    }

                    setQuestions(editedData.data);
                });
            });
        };

        return (
            <EditableTable
                className="city-table"
                bordered
                columns={columns}
                data={questions}
                onSave={save}
                form={form}
                actions={actions}
                footer={<AddQuestion questions={questions} setQuestions={setQuestions}/>}
            />
        );
    }
;

export default QuestionTable;