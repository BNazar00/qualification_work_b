import {deleteCityById, getAllCities, updateCityById} from "../../../service/CityService";
import {Form, message, Popconfirm} from "antd";
import React, {useEffect, useState} from "react";
import "./css/AddCity.css";
import AddCity from "./AddCity";
import EditableTable from "../../EditableTable";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";

const CityTable = () => {
        const [form] = Form.useForm();
        const [cities, setCities] = useState([]);

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
                title: 'Name',
                dataIndex: 'name',
                width: '15%',
                editable: true,
                defaultSortOrder: 'ascend',
                sorter: (a, b) => a.name.length - b.name.length,
            },
            {
                title: 'Довгота',
                dataIndex: 'longitude',
                render: (longitude) => Number.parseFloat(longitude).toFixed(4),
                width: '20%',
                editable: true
            },
            {
                title: 'Широта',
                dataIndex: 'latitude',
                render: (latitude) => Number.parseFloat(latitude).toFixed(4),
                width: '20%',
                editable: true,
            }
        ];

        const actions = (record) => [
            <Popconfirm title="Видалити місто?"
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
            getAllCities().then(response => {
                setCities(response)
            });
        };

        useEffect(() => {
            getData();
        }, []);

        const remove = (record) => {
            deleteCityById(record.id)
                .then((response) => {
                    if (response.status) {
                        message.warning(response.message);
                        return;
                    }

                    message.success(`Місто ${record.name} успішно видалене`);

                    setCities(deleteFromTable(cities, record.id));
                });
        };

        const save = async (record) => {
            editCellValue(form, cities, record.id).then((editedData) => {
                updateCityById(editedData.item).then(response => {
                    const st=response.status;
                    const badStatuses=[ "500", "401", "400", "403" ]

                    if (badStatuses.includes(st)) {
                        message.warning("Response status: "+ st);
                        return;
                    }

                    setCities(editedData.data);
                });
            });
        };

        return (
            <EditableTable
                className="city-table"
                bordered
                columns={columns}
                data={cities}
                onSave={save}
                form={form}
                actions={actions}
                footer={<AddCity cities={cities} setCities={setCities}/>}/>
        );
    }
;

export default CityTable;