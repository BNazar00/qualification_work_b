import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {Button, Form, message, Popconfirm, Select, Typography} from "antd";

import {getAllQuestions} from "../../../service/QuizService";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";
import EditableTable from "../../EditableTable";
import {Option} from "antd/es/mentions";
import {getTasks, getTasksByChallenge} from "../../../service/TaskService";

const {Title} = Typography;


const QuestionsTable = () => {
    const [form] = Form.useForm();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);


    const getData = () => {
        getAllQuestions().then(response => {
            setQuestions(response);
        });
        setLoading(false);
    };

    const actions = (record) => [
        <Popconfirm title="Видалити запитання?"
                    cancelText="Ні"
                    okText="Так"
                    cancelButtonProps={{className: "popConfirm-cancel-button"}}
                    okButtonProps={{className: "popConfirm-ok-button"}}
                    // onConfirm={() => remove(record)}
        >
            <span className="table-action">Видалити</span>
        </Popconfirm>
    ];

    useEffect(() => {
        getData();
    }, []);


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            editable: false,
            // render: (text, record) => <Link to={'/admin/quiz/questions' + record.id}>{record.id}</Link>
        },
        {
            title: 'Назва',
            dataIndex: 'title',
            width: '30%',
            editable: true,
            // render: (text, record) => <Link to={'/admin/quiz/questions' + record.id}>{record.id}</Link>

        },
        {
            title: 'Опис',
            dataIndex: 'description',
            width: '30%',
            editable: true,
            // render: (text, record) => <Link to={'/admin/quiz/questions' + record.id}>{record.id}</Link>
        },
        {
            title: 'Категорія',
            dataIndex: 'category',
            width: '20%',
            editable: true,
            // render: (text, record) => <Link to={'/admin/quiz/questions' + record.id}>{record.id}</Link>
        },
    ];

    return (
        <div className="push-down">
            <Button className="flooded-button add-btn">
                <Link to="/admin/questions-import">
                    Імпортувати запитання
                </Link>
            </Button>

            <Link
                to="/admin/questions/generate"
                className="back-btn"
            >
                <Button className="flooded-button add-btn">
                    Згенерувати запитання
                </Button>
            </Link>


            <Title level={3}>Запитання</Title>
            <EditableTable
                bordered
                className="questions-table"
                columns={columns}
                data={questions}
                form={form}
                // onSave={save}
                actions={actions}
            />
        </div>
    )
}

export default QuestionsTable;
