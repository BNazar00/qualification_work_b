import React, {useState} from "react";
import {Form, Popconfirm, Table, Typography} from "antd";
import "./admin/city/css/CityTable.css";
import EditableColumn from "./EditableColumn";

const EditableTable = ({
                           bordered,
                           className,
                           columns,
                           data,
                           onSave,
                           form,
                           actions,
                           footer,
                           header,
                           editAction,
                           onEditClick
                       }) => {
    const [editingKey, setEditingKey] = useState('');

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancelEditing = () => {
        setEditingKey('');
    };

    const actionColumns = {
        title: 'Управління',
        render: (_, record) => {
            const editable = record.id === editingKey;
            return editable ? (
                <div>
                    <Popconfirm title="Зберегти зміни?"
                                cancelText="Ні"
                                okText="Так"
                                cancelButtonProps={{className: "popConfirm-cancel-button"}}
                                okButtonProps={{className: "popConfirm-ok-button"}}
                                onConfirm={() => {
                                    onSave(record);
                                    cancelEditing();
                                }}>
                        <span className="table-action">Зберегти</span>
                    </Popconfirm>
                    <span className="table-action" onClick={cancelEditing}>Відмінити</span>
                </div>
            ) : (
                <div>
                    <Typography.Link disabled={editingKey !== ''}
                                     onClick={() => editAction ? onEditClick(record) : edit(record)}
                    >
                        <span className="table-action">Редагувати</span>
                    </Typography.Link>
                    {actions(record)}
                </div>
            );
        }
    };

    const editableColumns = columns.concat(actionColumns).map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.inputType ? col.inputType : 'text',
                selectData: col.selectData,
                uploadFolder: col.uploadFolder,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: record.id === editingKey,
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <div className="table-header">
                {header}
            </div>
            <Table
                components={{
                    body: {
                        cell: EditableColumn,
                    },
                }}
                bordered={bordered}
                dataSource={data}
                columns={editableColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancelEditing,
                }}
                size="middle"
                tableLayout="fixed"
                className={`table ${className ? className : ''}`}
                footer={() => footer}
            />
        </Form>
    );
};

export default EditableTable;