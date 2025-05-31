import React, {useEffect, useState} from "react";
import {getAllUsers} from "../../../../service/UserService";
import {Button, Form, message, Modal, Select} from "antd";
import {changeClubOwner} from "../../../../service/ClubService";

const {Option} = Select;

const ChangeOwnerFooter = ({selectedRowKeys, setSelectedRowKeys, updateTable}) => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(-1);

    const showModal = () => {
        if (selectedRowKeys.length === 0) {
            Modal.error({
                title: 'Позначте гуртки для зміни власника!',
                content: ''
            })
        }
        if (userId === -1 || userId === null) {
            Modal.error({
                title: 'Виберіть email нового власника!',
                content: ''
            })
        }
    };

    const getData = () => {
        getAllUsers().then(response => setUsers(response));
    };

    useEffect(() => {
        getData();
    }, []);

    const onFinish = (values) => {

        const userId = values.userId;

        selectedRowKeys.map(selectedRowKey => {
            changeClubOwner(userId, selectedRowKey)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                }
                updateTable();
            });
        });
        setSelectedRowKeys([]);
    }

    return (
        <div>
            <Form name="basic"
                  requiredMark={false}
                  onFinish={onFinish}>
                <Form.Item
                    name="userId">
                    <Select
                        showSearch
                        style={{width: 200}}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={(event, value) => {
                            setUserId(value);
                        }}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {users.map(user => <Option key={user.id} value={user.id}>{user.email}</Option>)}
                    </Select>
                </Form.Item>
                <Button htmlType="submit" className="flooded-button"
                        onClick={showModal}>Змінити</Button>
            </Form>
        </div>
    );
};

export default ChangeOwnerFooter;