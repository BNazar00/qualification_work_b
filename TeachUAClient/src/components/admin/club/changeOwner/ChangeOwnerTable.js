import {Form, Table} from "antd";
import React, {useEffect, useState} from "react";
import {getAllClubs} from "../../../../service/ClubService";
import ChangeOwnerFooter from "./ChangeOwnerFooter";

const ChangeOwnerTable = () => {
    const [form] = Form.useForm();
    const [clubs, setClubs] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys);
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '10%',
            editable: false,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Назва',
            dataIndex: 'name',
            width: '40%',
            editable: false,
            defaultSortOrder: 'ascend',

        },
        {
            title: 'Власник',
            dataIndex: ['user', 'email'],
            width: '20%',
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Місто',
            dataIndex: ['locations'],
            width: '20%',
            defaultSortOrder: 'ascend',
            render: (locations) => (
                locations.map(location =>
                    <span>
                        {location.city.name + ' '}
                    </span>
                )
            ),
        }
    ];

    const updateTable = () => {
        getAllClubs().then(response => setClubs(response));
    }

    const getData = () => {
        getAllClubs().then(response => setClubs(response));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Table
            rowSelection={rowSelection}
            bordered
            className="city-table"
            columns={columns}
            dataSource={clubs}
            form={form}
            rowKey={record => record.id}
            footer={() => <ChangeOwnerFooter
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
                updateTable={updateTable}
            />}
        />
    );
};

export default ChangeOwnerTable;