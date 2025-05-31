import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";

import {Button, Form, message, Popconfirm, Typography} from "antd";

import EditableTable from "../../EditableTable";
import {deleteTemplate, getAllTemplates} from "../../../service/TemplateService";
import {deleteFromTable} from "../../../util/TableUtil";

const {Title} = Typography;


const TemplatesTable = () => {
    const [form] = Form.useForm();
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        getAllTemplates().then(response => {
            setTemplates(response);
        });
        setLoading(false);
    };

    const remove = (record) => {
        deleteTemplate(record.id).then((response) => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            if (response) {
                message.success('Шаблон "' + record.name + '" успішно видалено!');
                setTemplates(deleteFromTable(templates, record.id));
            } else {
                message.error('Шаблон "' + record.name + '" використовується!');
            }
        });
    };
    const history = useHistory();


    const onEditClick = async (record) => {
        history.push("/admin/template/" + record.id);
    }

    const actions = (record) => [
        <Popconfirm
            title="Видалити шаблон?"
            cancelText="Ні"
            okText="Так"
            key={record.id}
            cancelButtonProps={{className: "popConfirm-cancel-button"}}
            okButtonProps={{className: "popConfirm-ok-button"}}
            onConfirm={() => remove(record)}>
            <span className="table-action">Видалити</span>
        </Popconfirm>
    ];

    const extractContent = (htmlText) => {
        let span = document.createElement('span');
        span.innerHTML = htmlText;
        return span.textContent;
    }

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            editable: false,
            render: (text, record) => <Link to={'/admin/template/' + record.id}>{record.id}</Link>
        },
        {
            title: 'Назва',
            dataIndex: 'name',
            width: '20%',
            editable: false,
            render: (text, record) => <Link to={'/admin/template/' + record.id}>{record.name}</Link>
        },
        {
            title: 'Опис курсу',
            dataIndex: 'courseDescription',
            width: '32%',
            editable: false,
            render: (text, record) => <Link
                to={'/admin/template/' + record.id}>{extractContent(record.courseDescription)}</Link>
        },
        {
            title: 'Опис проекту',
            dataIndex: 'projectDescription',
            width: '30%',
            editable: false,
            render: (text, record) => <Link
                to={'/admin/template/' + record.id}>{extractContent(record.projectDescription)}</Link>
        }
    ];

    return (
        <div className="push-down">
            <Button className="flooded-button add-btn">
                <Link to="/admin/add-template">
                    Додати шаблон
                </Link>
            </Button>
            <Title level={3}>Шаблони</Title>
            <EditableTable
                bordered
                className="city-table"
                columns={columns}
                data={templates}
                form={form}
                editAction={true}
                onEditClick={onEditClick}
                actions={actions}
            />
        </div>
    )
}

export default TemplatesTable;
