import {Button, Form, Input, message, Select} from "antd";
import React from "react";
import "./css/AddDistrict.css";
import {addToTable} from "../../../util/TableUtil";
import {addDistrict} from "../../../service/DisctrictService";

const {Option} = Select;

const AddDistrict = ({cities, districts, setDistricts}) => {
    const onFinish = (values) => {
        addDistrict(values).then((response) => {
            if(response.status) {
                message.warning(response.message);
                return;
            }

            message.success(`Район ${response.name} успішно додане`);

            setDistricts(addToTable(districts, response));
        });
    };

    return (
        <Form className="add-district"
              name="basic"
              requiredMark={false}
              onFinish={onFinish}>
            <Form.Item name="name"
                       rules={[{
                           required: true,
                           message: "Введіть назву району"
                       }]}>
                <Input className="add-district-input"
                       placeholder="Назва району">
                </Input>
            </Form.Item>
            <Form.Item name="cityName"
                       rules={[{
                           required: true,
                           message: "Виберіть місто району"
                       }]}>
                <Select className="add-district-input"
                        placeholder="Місто району"
                        allowSearch>
                    {cities.map((city) => <Option value={city.name}>{city.name}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="flooded-button add-district-button">Додати район</Button>
            </Form.Item>
        </Form>
    );
};

export default AddDistrict;