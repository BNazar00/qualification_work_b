import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {Button, Form, message, Popconfirm, Select, Typography, Input} from "antd";

import EditableTable from "../../EditableTable";
import {deleteTask, getTasks, getTasksByChallenge, updateTask} from "../../../service/TaskService";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";
import moment from "moment";
import {getAllChallenges} from "../../../service/ChallengeService";
import {Option} from "antd/es/mentions";

const {Title} = Typography;

const TasksTable = () => {

    const [form] = Form.useForm();
    const [selectedChallenges, setSelectedChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchedText, setSearchedText] = useState("");
    const [tasks, setTasks] = useState([{
        id: 0,
        name: '',
        picture: '',
        startDate: ''
    }]);
    const [challengeList, setChallengeList] = useState([
        {
            id: 0,
            name: '',
            title: '',
            sortNumber: 0
        }
    ]);

    const getTaskData = () => {
        getTasks().then(response => {
            console.log(response);
            setTasks(response);
        });
        setLoading(false);
    };
    const getChallengeData = () => {
        getAllChallenges().then(response => {
            setChallengeList(response);
        });
        setLoading(false);
    };

    const remove = (record) => {
        deleteTask(record.id).then((response) => {
            if (response.status) {
                message.warning(response.message)
                return;
            }
            message.success('Завдання ' + record.name + ' успішно видалено!');

            setTasks(deleteFromTable(tasks, record.id));
        });
    };
    const save = async (record) => {
        form.setFieldsValue({
            ...form.getFieldsValue()
        });
        console.log(record);
        editCellValue(form, tasks, record.id).then((editedData) => {
            updateTask(editedData.item, record.id).then(response => {
                if (response.status) {
                    message.warning(response.message)
                    return;
                }
                getTaskData();
            });
        });
    }
    const actions = (record) => [
        <Popconfirm title="Видалити челендж?"
                    cancelText="Ні"
                    okText="Так"
                    cancelButtonProps={{className: "popConfirm-cancel-button"}}
                    okButtonProps={{className: "popConfirm-ok-button"}}
                    onConfirm={() => remove(record)}>
            <span className="table-action">Видалити</span>
        </Popconfirm>
    ];
    const onChange = (challengeId) => {
        if (challengeId === undefined) {
            getTasks().then(response => setTasks(response))
        } else {
            setSelectedChallenges(challengeId);
            getTasksByChallenge(challengeId).then(response => setTasks(response))
        }
    }

    useEffect(() => {
        getTaskData();
        getChallengeData();
    }, []);

    const search = (data) => {
        return data.filter( (item) =>
            String(item.id)
            .toLowerCase()
            .includes(searchedText.toLowerCase()) ||
            
            String(item.name)
            .toLowerCase()
            .includes(searchedText.toLowerCase()) ||

            String(item.startDate)
            .toLowerCase()
            .includes(searchedText.toLowerCase())
        );
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            editable: false,
            render: (text, record) => <Link to={'/admin/challenge/task/' + record.id}>{record.id}</Link>,
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Назва',
            dataIndex: 'name',
            width: '35%',
            editable: true,
            render: (text, record) => <Link to={'/admin/challenge/task/' + record.id}>{record.name}</Link>
        },
        {
            title: 'Дата початку',
            dataIndex: 'startDate',
            width: '35%',
            editable: false,
            render: (text) => moment(text.toString()).format('DD-MM-YYYY')
        },
    ];

    return (
        <div className="push-down">
            <Button className="flooded-button add-btn">
                <Link to="/admin/addTask">
                    Додати завдання
                </Link>
            </Button>
            <Link
                to="/admin/challenges"
                className="back-btn">
                <Button className="flooded-button">
                    До списку челенджів
                </Button>
            </Link>
            <div className="add-club-row">
                <Select className="add-club-select"
                        placeholder="Оберіть челендж"
                        allowClear
                        onChange={onChange}>
                    {challengeList.map((option, index) => (
                        <Option value={option.id} key={option.id}>
                            {option.name}
                        </Option>
                    ))}
                </Select>
            <Input.Search 
                placeholder="Пошук по завданнях"
                onSearch={(value)=>{
                    setSearchedText(value);
                }}
                style={{
                    width: 500,
                    paddingLeft: 5,
                }}
            />
            </div>
            <Title level={3}>Завдання</Title>
            <EditableTable
                bordered
                className="city-table"
                columns={columns}
                data={search(tasks)}
                form={form}
                onSave={save}
                actions={actions}
            />
        </div>
    )
}

export default TasksTable;