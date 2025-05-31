import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {Button, Form, message, Popconfirm, Typography, Table, Pagination} from "antd";

import { getAllMetrics } from "../../../service/MetricsService";
import { deleteFromTable, editCellValue } from "../../../util/TableUtil";
import EditableTable from "../../EditableTable";
import { renderIntoDocument } from "react-dom/test-utils";

const {Title} = Typography;


const MetricsTable = () => {
    const [form] = Form.useForm();
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        getAllMetrics().then(response => {
            setMetrics(response);
        });
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: 'Назва',
            dataIndex: 'name',
            editable: false,
            width: '70%',
            filters:[
                {text:'Requests count',value:'http_server_requests_seconds_count'},
                {text:'Requests max time',value:'http_server_requests_seconds_max'},
                {text:'Requests sum of time',value:'http_server_requests_seconds_sum'},
                {text:'POST',value:'POST'},
                {text:'GET',value:'GET'},
                {text:'PUT',value:'PUT'},
                {text:'CPU usage',value:'system_cpu_usage'},
                {text:'TomCat metrics',value:'tomcat'},
                {text:'Spring Data seconds count',value:'spring_data_repository_invocations_seconds_count'},
                {text:'Spring Data seconds max',value:'spring_data_repository_invocations_seconds_max'},
                {text:'Spring Data seconds sum',value:'spring_data_repository_invocations_seconds_sum'},
            ],
            onFilter:(value, record)=>{
                return record.name.includes(value);
            },
            sorter: (a, b) => a.value - b.value,


        },
        {
            title: 'Значення',
            dataIndex: 'value',
            editable: false,
            defaultSortOrder: 'descend',
            width: '30%',
            sorter: (a, b) => parseFloat(a.value) - parseFloat(b.value),
        },
    ];

    return (
        <div className="push-down">
            <Title level={3}>Метрики</Title>
            <Table bordered
                columns={columns}
                dataSource={metrics} 
                pagination={{defaultPageSize:25}}
                />
        </div>
    )
}

export default MetricsTable;
