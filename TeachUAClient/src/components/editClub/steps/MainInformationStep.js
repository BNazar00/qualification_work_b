import {Button, Checkbox, Form, Input, InputNumber, Select, Typography} from "antd";
import React, {useEffect, useState} from "react";

const {Option} = Select;
const {Text} = Typography;

const MainInformationStep = ({categories, step, setStep, setResult, result, centers}) => {
    const [mainForm] = Form.useForm();
    const [ageValidateStatus, setAgeValidateStatus] = useState("");

    useEffect(() => {
        if (result) {
            mainForm.setFieldsValue({...result});
        }
    }, []);

    const defaultCategories = result.categories.map((category) => category.id);

    const nextStep = () => {
        setStep(step + 1);
    }

    const validateAge = (ageFrom, ageTo) => {
        const regex = /^\d*$/;
        return ageFrom < ageTo && regex.test(ageTo) && regex.test(ageFrom)
            && ageTo >= 3 && ageTo <= 18 && ageFrom >= 2 && ageFrom <= 17;
    }

    const onKeyPress = (event) => {
        const specialCharRegex = /^\d+$/;
        const pressedKey = String.fromCharCode(
            !event.charCode ? event.which : event.charCode
        );
        if (!specialCharRegex.test(pressedKey)) {
            event.preventDefault();
            return false;
        }
    };

    const onChange = () => {
        const formFields = mainForm.getFieldValue();

        if (validateAge(formFields.ageFrom, formFields.ageTo)) {
            setAgeValidateStatus("success");
        } else {
            setAgeValidateStatus("error");
        }
    }

    const onFinish = (values) => {
        if (values.ageFrom && values.ageTo && validateAge(values.ageFrom, values.ageTo)) {
            result.categories = categories.filter(c => values.selectedCategories.includes(c.id));
            result.center = centers.find(c => c.id === values.centerId);
            setResult(Object.assign(result, values));
            mainForm.resetFields();
            setResult(result);
            nextStep();
        } else {
            setAgeValidateStatus("error");
        }
    };


    return (
        <Form
            name="edit_category"
            form={mainForm}
            requiredMark={true}
            onFinish={onFinish}
            noValidate>
            <Text style={{fontSize :'19px', color:'GrayText'}}>Назва</Text>
            <Form.Item name="name"
                       hasFeedback
                       className="add-club-row"
                       rules={[
                           {
                               required: true,
                               message: "Введіть назву гуртка",
                           },
                           {
                               required: false,
                               pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/,
                               message: "Некоректна назва гуртка",
                           }]}>
                <Input className="add-club-input"
                       placeholder="Назва гуртка"/>
            </Form.Item>

            <Text style={{fontSize :'19px', color:'GrayText'}}>Категорія</Text>
            <Form.Item name="selectedCategories"
                       className="edit-club-row"
                       rules={[
                           {
                               required: true,
                               message: "Це поле є обов'язковим"
                           }]}
                       initialValue={defaultCategories}>
                <Checkbox.Group className="add-club-categories">
                    {categories.map(category => 
                        <Checkbox value={category.id} key={category.id}>{category.name}</Checkbox>)}
                </Checkbox.Group>
            </Form.Item>

            <Text style={{fontSize :'19px', color:'GrayText'}}>Вік дитини</Text>
            <Form.Item
                className="add-club-row"
                validateStatus={ageValidateStatus}>
                <span className="add-club-age">
                    Від
                    <Form.Item name="ageFrom"
                               style={{margin: 0}}
                               rules={[
                                {
                                    required: true,
                                    message: "Вік є обов'язковим"
                                }]}>
                        <InputNumber onChange={onChange}
                                     onKeyPress={onKeyPress}
                                     className="input-age"
                                     placeholder="2"
                                     min={2}
                                     max={17}
                                     maxLength = {2}
                                     type="number"/>
                    </Form.Item>
                    до
                    <Form.Item name="ageTo"
                               style={{margin: 0}}
                               rules={[
                                {
                                    required: true,
                                    message: "Вік є обов'язковим"
                                }]}>
                        <InputNumber onChange={onChange}
                                     onKeyPress={onKeyPress}
                                     className="input-age"
                                     placeholder="18"
                                     min={3}
                                     max={18}
                                     maxLength = {2}
                                     type="number"/>
                    </Form.Item>
                    років
                </span>
            </Form.Item>
            <Text style={{fontSize :'19px', color:'GrayText'}}>Приналежність до центру</Text>
            <Form.Item name="centerId"
                className="add-club-row"
                initialValue={result.center ? result.center.id: ''}
            >
                <Select
                    className="add-club-select"
                    placeholder="Назва центру">
                    <Option value={''}>{"- центр не вказано"}</Option>
                    {centers.map(c => <Option value={c.id} key={c.id}>{c.name}</Option>)}
                </Select>
            </Form.Item>
            <div className="add-club-content-footer">
                <div></div>
                <Button className="flooded-button add-club-content-next" htmlType="submit">Наступний крок</Button>
            </div>
        </Form>
    )
};

export default MainInformationStep;