import {Button, Form, Input, message, Select} from "antd";
import React, {useEffect, useState} from "react";
import "./css/AddStation.css";
import {addToTable} from "../../../util/TableUtil";
import {addStation} from "../../../service/StationService";
import {getDistrictsByCityName} from "../../../service/DisctrictService";

const {Option} = Select;

const AddStation = ({cities, stations, setStations,district,setDistrict}) => {
    const [cityName, setCityName] = useState(null);

    useEffect(()=>{
        getDistrictsByCityName(cityName).then((response)=>{
            setDistrict(response);
        })
    },[cityName])

    const onFinish = (values) => {
        addStation(values).then((response) => {
            if (response.status) {
                message.warning(response.message);
                return;
            }

            message.success(`Станція ${response.name} успішно додана`);

            setStations(addToTable(stations, response));
        });
    };

    const onCityChange = (value) =>{
        setCityName(value);
    }



    return (
        <Form className="add-station"
              name="basic"
              requiredMark={false}
              onFinish={onFinish}>
            <Form.Item name="name"
                       rules={[{
                           required: true,
                           message: "Введіть назву станції"
                       }]}>
                <Input className="add-station-input"
                       placeholder="Назва станції">
                </Input>
            </Form.Item>
            <Form.Item name="cityName"
                       rules={[{
                           required: true,
                           message: "Виберіть місто"
                       }]}>
                <Select className="add-station-input"
                        placeholder="Місто"
                        allowSearch
                        onChange={onCityChange}>
                    {cities.map((city) => <Option value={city.name}>{city.name}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item name="districtName"
                       rules={[{
                           required: true,
                           message: "Виберіть район"
                       }]}>
                <Select className="add-station-input"
                        placeholder="Район"
                        allowSearch>
                    {district.map((district) => <Option value={district.name}>{district.name}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="flooded-button add-station-button">Додати станцію</Button>
            </Form.Item>
        </Form>
    );
};

export default AddStation;