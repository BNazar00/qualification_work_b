import React, {useEffect, useState} from "react";

import {searchTypes, createType, updateType, deleteType} from "../../../service/TestQuestionService";
import './css/TestCategoryTable.css';
import {Table, Typography, Input, Button, Popconfirm, message, Form} from "antd";

const {Title} = Typography;

const {Search} = Input;

export const TestTypeTable = () => {

    const tableProperties = {
        pagination: {
            current: 1,
            pageSize: 10
        },
        filters: {}
    }

    const [form] = Form.useForm();
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [properties, setProperties] = useState(tableProperties);
    const [editingKey, setEditingKey] = useState('');
    const [isAdding, setAdding] = useState(false);

    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({title: '', ...record});
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
        if (isAdding) {
            setAdding(false);
            setTypes(types.slice(1));
        }
        fetchData();
    };

    const save = async (id) => {
        const type = (await form.validateFields());
        if (isAdding) {
            createType(type)
                .then(response => {
                    message.success('Тип створено');
                    refreshTableAfterEdit(id, type);
                }).catch(function (error) {
                message.error(error.response.data.message);
            });
            return;
        }
        updateType(id, type)
            .then(response => {
                message.success('Тип збережено');
                refreshTableAfterEdit(id, type);
            }).catch(function (error) {
            message.error(error.response.data.message);
        });
    }

    const refreshTableAfterEdit = (id, type) => {
        setEditingKey('');
        setAdding(false);
        fetchData();
    }

    const handleAdd = () => {
        if (isAdding) {
            return;
        }
        const newType = {
            id: "",
            title: "Нивий Тип"
        };
        setAdding(true);
        setTypes([newType, ...types]);
        edit(newType);
    }

    const fetchData = () => {
        setLoading(true);
        const order = properties.order === 'ascend' ? 'asc' : 'desc';
        const sortField = properties.field ? properties.field : 'id';

        searchTypes(
            properties.pagination.current,
            properties.pagination.pageSize,
            sortField,
            order,
            searchQuery
        ).then(response => {
            handleResponse(response)
        });
    }

    const handleResponse = (response) => {
        setTypes(response.data.content);
        setLoading(false);
        setProperties({
            ...properties,
            pagination: {
                ...properties.pagination,
                total: response.data.totalElements
            }
        });
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setProperties({
            pagination,
            filters,
            ...sorter,
        })
    }

    const resetProperties = () => {
        setProperties(tableProperties);
    }

    const handleSearch = (query) => {
        resetProperties();
        setSearchQuery(query);
    }

    const deleteTypeById = (id) => {
        deleteType(id).then(response => {
            message.success('Тип видалено');
            fetchData();
        }).catch(function (error) {
            message.error(error.response.data.message);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(properties), searchQuery]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true
        },
        {
            title: 'Заголовок',
            dataIndex: 'title',
            key: 'title',
            sorter: true,
            editable: true
        },
        {
            title: 'Управління',
            key: 'action',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <>
                        <Typography.Link onClick={() => save(record.id)} style={{marginRight: 8}}>
                            <Button>
                                Зберегти
                            </Button>
                        </Typography.Link>
                        <Popconfirm title="Точно відхилити?" onConfirm={cancel}>
                            <Button>
                                Відхилити зміни
                            </Button>
                        </Popconfirm>
                    </>
                ) : (
                    <>
                        <Typography.Link
                            disabled={editingKey !== ''}
                            onClick={() => edit(record)}
                            className="back-btn"
                        >
                            <Button>
                                Редагувати
                            </Button>
                        </Typography.Link>
                        <Popconfirm
                            title="Видалити тип?"
                            onConfirm={() => deleteTypeById(record.id)}
                            cancelText="Ні"
                            okText="Так"
                            okButtonProps={<Button/>}
                        >
                            <Button danger={true}>Видалити</Button>
                        </Popconfirm>
                    </>
                )
            }
        }
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div className="categoriesContent">
            <Title level={3}>Типи</Title>
            <div className="search-and-add-categories">
                <Search
                    placeholder="Введіть заголовок типу"
                    onSearch={handleSearch}
                    allowClear
                    style={{
                        width: 250,
                    }}
                />
                <Typography.Link
                    onClick={handleAdd}
                    className="back-btn"
                >
                    <Button className="flooded-button add-btn">
                        Додати Тип
                    </Button>
                </Typography.Link>
            </div>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    rowKey={(record) => record.id}
                    dataSource={types}
                    columns={mergedColumns}
                    pagination={properties.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    tableLayout="fixed"
                />
            </Form>
        </div>
    );

}

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
