import {getAllCities} from "../../../service/CityService";
import {Form, message, Popconfirm} from "antd";
import React, {useEffect, useState} from "react";
import "./css/DistrictTable.css";
import EditableTable from "../../EditableTable";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";
import {deleteDistrictById, getAllDistrict, updateDistrictById} from "../../../service/DisctrictService";
import AddDistrict from "./AddDistrict";

const DistrictTable = () => {
    const [form] = Form.useForm();
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);

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
            width: '15%',
            editable: true,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Місто',
            dataIndex: 'cityName',
            width: '15%',
            editable: true,
            inputType: 'select',
            selectData: cities.map(city => city.name),
            defaultSortOrder: 'ascend',
            filters: cities.map(city => ({text: city.name, value: city.name})),
            onFilter: (value, record) => record.cityName.indexOf(value) === 0,
            sorter: (a, b) => a.cityName.length - b.cityName.length,
        },
    ];

    const actions = (record) => [
        <Popconfirm title="Видалити район?"
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
        getAllCities().then(response => setCities(response));
        getAllDistrict().then(response => setDistricts(response));
    };

    useEffect(() => {
        getData();
    }, []);

    const remove = (record) => {
        deleteDistrictById(record.id)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }

                message.success(`Район ${record.name} успішно видалений`);

                setDistricts(deleteFromTable(districts, record.id));
            });
    };

    const save = async (record) => {
        editCellValue(form, districts, record.id).then((editedData) => {
            updateDistrictById(editedData.item).then(response => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }

                setDistricts(editedData.data);
            });
        });
    };

    return (
        <EditableTable
            bordered
            className="city-table"
            columns={columns}
            data={districts}
            onSave={save}
            form={form}
            actions={actions}
            footer={<AddDistrict cities={cities} districts={districts} setDistricts={setDistricts}/>}
        />
    );
};

export default DistrictTable;