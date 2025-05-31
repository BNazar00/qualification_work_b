import {updateBannerItemById, deleteBannerItemById, getAllBannerItems} from "../../../service/BannerItemService";
import {Form, Image, message, Popconfirm} from "antd";
import React, {useEffect, useState} from "react";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";
import EditableTable from "../../EditableTable";
import AddBannerItem from "./AddBannerItem";
import {BASE_URL} from "../../../service/config/ApiConfig";

const BannerItemsTable = () => {
    const [form] = Form.useForm();
    const [bannerItems, setBannerItems] = useState([]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            editable: false,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Заголовок',
            dataIndex: 'title',
            width: '23%',
            editable: true
        },
        {
            title: 'Опис',
            dataIndex: 'subtitle',
            width: '23%',
            editable: true,
            inputType: 'text'
        },
        {
            title: 'Посилання',
            dataIndex: 'link',
            width: '15%',
            editable: true,
        },
        {
            title: 'Зображення',
            dataIndex: 'picture',
            width: '10%',
            editable: true, //temporary false
            inputType: 'upload',
            uploadFolder: `banners`,
            render: picture => <Image
                width={100}
                height={60}
                src={`${BASE_URL}` + picture}
            />
        },
        {
            title: 'Порядковий номер',
            dataIndex: 'sequenceNumber',
            width: '10%',
            editable: true,
            sorter: (a, b) => a.sequenceNumber - b.sequenceNumber
        }
    ];

    const actions = (record) => [
        <Popconfirm title={"Видалити банер?"}
                    cancelText={"Ні"}
                    okText={"Так"}
                    cancelButtonProps={{
                        className: "popConfirm-cancel-button"
                    }}
                    okButtonProps={{
                        className: "popConfirm-ok-button"
                    }}
                    onConfirm={() => remove(record)}>
            <span className="table-action">Видалити</span>
        </Popconfirm>
    ];

    const getData = () => {
        getAllBannerItems().then(response => {
            setBannerItems(response)
        });
    };

    useEffect(() => {
        getData()
    }, []);

    const remove = (record) => {
        deleteBannerItemById(record.id)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                message.success(`Банер з id = ${record.id} успішно видалений`);

                setBannerItems(deleteFromTable(bannerItems, record.id));
            });
    };

    const save = async (record) => {
        const uploadFile = form.getFieldsValue('picture');

        console.info(uploadFile)

        form.setFieldsValue({
            ...form.getFieldsValue(),
            picture: (uploadFile.picture !== record.picture) ? uploadFile.picture.file.response : record.picture
        });

        editCellValue(form, bannerItems, record.id)
            .then((editedData) => {
                updateBannerItemById(editedData.item)
                    .then((response) => {
                        const st = response.status;
                        const badStatuses = ["500", "401", "400", "403"];

                        if (badStatuses.includes(st)) {
                            message.warning("Response status: " + st);
                            return;
                        }
                        message.success(`Банер з id = ${record.id} успішно збережено`)

                        setBannerItems(editedData.data);
                    });
            });
    };

    return (<EditableTable
        className="banner-table"
        bordered
        columns={columns}
        data={bannerItems}
        onSave={save}
        form={form}
        actions={actions}
        footer={<AddBannerItem bannerItems={bannerItems} setBannerItems={setBannerItems}/>}
    />);
};

export default BannerItemsTable;
