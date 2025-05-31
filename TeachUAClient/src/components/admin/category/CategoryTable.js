import React, {useEffect, useState} from "react";
import {Form, Popconfirm, message, Image} from "antd";
import {deleteCategoryById, getAllCategories, updateCategoryById} from "../../../service/CategoryService";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";
import EditableTable from "../../EditableTable";
import AddCategory from "./AddCategory";

function Item(text, tagBackgroundColor, tagTextColor) {
    this.text = text;
    this.tagBackgroundColor = tagBackgroundColor;
    this.tagTextColor = tagTextColor;
}

Item.prototype.toString = function func1() {
    return this.text;
}

function LogoItem(urlLogo, backgroundColor) {
    this.urlLogo = urlLogo;
    this.backgroundColor = backgroundColor;
}

LogoItem.prototype.toString = function f1() {
    return this.urlLogo;
}

const CategoryTable = () => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);

    const [addCategory, setAddCategory] = useState([]);

    const getData = () => {
        getAllCategories().then(response => {
            const arr = [];
            response.map(category => {
                const item = category;
                item.name = new Item(category.name, category.tagBackgroundColor, category.tagTextColor);
                item.urlLogo = new LogoItem(category.urlLogo, category.backgroundColor);
                arr.push(item);
            })
            setCategories(arr);
        });
    }

    useEffect(() => {
        getData()
    }, [addCategory]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '3%',
            editable: false,
        },
        {
            title: 'sortBy',
            dataIndex: 'sortby',
            width: '6%',
            editable: true,
        },
        {
            title: 'Назва',
            dataIndex: 'name',
            width: '15%',
            editable: true,
            render: name => <div className="ant-tag tag"
                style={{backgroundColor: name.tagBackgroundColor,
                    color: name.tagTextColor,
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    borderRadius: "10px"}}
            >
            {name.text}
            </div>
        },
        {
            title: 'Опис',
            dataIndex: 'description',
            width: '25%',
            editable: true
        },
        {
            title: 'Логотип',
            dataIndex: 'urlLogo',
            width: '7%',
            inputType: 'upload',
            uploadFolder: 'categories',
            editable: true,
            render: urlLogo => <Image
                style={{backgroundColor: urlLogo.backgroundColor}}
                width={50}
                height={50}
                src={`${process.env.PUBLIC_URL}` + urlLogo.urlLogo} />
        },
        {
            title: 'Background Color',
            dataIndex: 'backgroundColor',
            width: '10%',
            inputType: 'color',
            editable: true
        },
        {
            title: 'Tag Background Color',
            dataIndex: 'tagBackgroundColor',
            inputType: 'color',
            width: '10%',
            editable: true
        },
        {
            title: 'Tag Text Color',
            dataIndex: 'tagTextColor',
            inputType: 'color',
            width: '10%',
            editable: true
        }
    ];

    const actions = (record) => [
        <Popconfirm title="Видалити категорію?"
                    cancelText="Ні"
                    okText="Так"
                    cancelButtonProps={{className: "popConfirm-cancel-button"}}
                    okButtonProps={{className: "popConfirm-ok-button"}}
                    onConfirm={() => remove(record)}>
            <span className="table-action">Видалити</span>
        </Popconfirm>
    ];

    const remove = (record) => {
        deleteCategoryById(record.id)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message)
                    return;
                }
                message.success('Категорія ' + record.name + ' успішно видалена!');

                setCategories(deleteFromTable(categories, record.id));
            });
    };

    const save = async (record) => {
        const uploadFile = form.getFieldValue('urlLogo');

        form.setFieldsValue({
            ...form.getFieldsValue(),
            urlLogo: uploadFile !== record.urlLogo ? uploadFile.file.response : uploadFile
        });

        editCellValue(form, categories, record.id).then((editedData) => {
            updateCategoryById(editedData.item).then(response => {
                if (response.status) {
                    message.warning(response.message)
                    return;
                }
                getData();
            });
        });
    };

    return (
        <EditableTable
            bordered
            className="city-table"
            columns={columns}
            data={categories}
            onSave={save}
            form={form}
            actions={actions}
            footer={<AddCategory categories={categories} setCategories={setCategories} setAddCategory={setAddCategory}/>}
        />
    )
}

export default CategoryTable;