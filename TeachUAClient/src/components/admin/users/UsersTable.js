import {deleteUserById, getAllUsers, updateUser, updateUserByAdmin} from "../../../service/UserService";
import {getAllRoles} from "../../../service/RoleService";
import {Form, message, Popconfirm, Dropdown} from "antd";
import React, {useEffect, useState} from "react";
import EditableTable from "../../EditableTable";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";

const UsersTable = () => {

    const [form] = Form.useForm();

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '4%',
            editable: false,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Ім\'я',
            dataIndex: 'firstName',
            width: '13%',
            editable: false,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.firstName.length - b.firstName.length,
        },
        {
            title: 'Прізвище',
            dataIndex: 'lastName',
            width: '13%',
            editable: false,
            sorter: (a, b) => a.lastName.length - b.lastName.length,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '17%',
            editable: false,
        },
        {
            title: 'Номер тел.',
            dataIndex: 'phone',
            width: '13%',
            editable: false,
        },
        {
            title: 'Роль',
            dataIndex: 'roleName',
            inputType: 'select',
            selectData: roles.map(role => role.roleName),
            width: '13%',
            editable: true,
        },
        {
            title: 'Активний/неактивний',
            dataIndex: 'status',
            inputType: 'select',
            selectData: ["true", "false"],
            width: '11%',
            editable: true,
        }
    ];

    const actions = (record) => [
        <Popconfirm title="Видалити користувача?"
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
        getAllUsers().then(response => setUsers(response));
        getAllRoles().then(response => setRoles(response));
    };

    useEffect(() => {
        console.log("==== useEffect getData function on mounting stage ====")
        getData()
    }, []);

    const remove = (record) => {
        deleteUserById(record.id)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }

                message.success(`Користувача ${record.name} успішно видалено`);

                this.setUsers(deleteFromTable(users, record.id));
            });
    };

    const save = async (record) => {
        console.log("before users update ")
        editCellValue(form, users, record.id).then((editedData) => {
            updateUser(editedData.item).then(response => {
                const st = response.status;
                if (!(st === "true" || st === "false")) {
                    console.log(response.status)
                    message.warning("Response message: " + st);
                    return;
                }

                setUsers(editedData.data);
                console.log("after users update ")
                console.log(users);
            });
        });
    };

    return (
        <EditableTable
            className="city-table"
            bordered
            columns={columns}
            data={users}
            onSave={save}
            form={form}
            actions={actions}
        />
    );
}


export default UsersTable;