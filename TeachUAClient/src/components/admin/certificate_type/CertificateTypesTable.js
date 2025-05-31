import React, {useEffect, useState} from "react";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";
import {Button, Form, message, Popconfirm, Typography} from "antd";
import EditableTable from "../../EditableTable";
import {
    deleteCertificateType,
    getCertificateTypes,
    updateCertificateType
} from "../../../service/CertificateTypeService";
import {Link} from "react-router-dom";
import {showInfo} from "../../constants/CertificateConstants";

const {Title} = Typography;

const CertificateTypesTable = () => {

    const [form] = Form.useForm();
    const [certificateTypes, setCertificateTypes] = useState([]);

    const getData = () => {
        getCertificateTypes().then(response => {
            setCertificateTypes(response);
        });
    };

    useEffect(() => {
        getData();
    }, []);

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

    const onSave = async (record) => {
        form.setFieldsValue({
            ...form.getFieldsValue()
        });
        if (isNaN(form.getFieldValue("codeNumber"))) {
            message.error("Кодовий номер повинен бути цілим числом!");
            return;
        }
        editCellValue(form, certificateTypes, record.id)
            .then((editedData) => {
                updateCertificateType(record.id, editedData.item)
                    .then(response => {
                        if (response.status) {
                            message.warning(response.message);
                            return;
                        }
                        if (!!response.messages) {
                            if (showInfo(response.messages)) {
                                return;
                            }
                        }
                        message.success(`Тип "${response.certificateType.name}" оновлено`);
                        getData();
                    });
            });
    };

    const remove = async (record) => {
        deleteCertificateType(record.id)
            .then((response) => {
                if (response.status === 409) {
                    message.error("Тип використовується!");
                    return;
                } else if (response.status !== 200) {
                    message.warning(response.message);
                    return;
                }
                setCertificateTypes(deleteFromTable(certificateTypes, record.id));
                message.success(`Тип "${record.name}" успішно видалено`);
            });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '10%',
            editable: false,
            render: (id) => id,
        },
        {
            title: 'Кодовий номер',
            dataIndex: 'codeNumber',
            width: '35%',
            editable: true,
            render: (codeNumber) => codeNumber
        },
        {
            title: 'Назва',
            dataIndex: 'name',
            width: '40%',
            editable: true,
            render: (name) => name
        }
    ];

    return (

        <div className="push-down">
            <Button className="flooded-button add-btn">
                <Link to="/admin/add-certificate-type">
                    Додати тип
                </Link>
            </Button>
            <Title level={3}>Типи сертифікатів</Title>
            <EditableTable bordered
                           columns={columns}
                           data={certificateTypes}
                           form={form}
                           onSave={onSave}
                           actions={actions}
            >
            </EditableTable>
        </div>)

}

export default CertificateTypesTable;