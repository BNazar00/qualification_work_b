import {Checkbox, Form, Input, InputNumber, Select, Typography} from "antd";
import {Button} from "antd";
import React, {useEffect, useState} from "react";

const {Option} = Select;
const {Text} = Typography;

const MainInformationStep = ({categories, step, setStep, setResult, result, centers ,fromCenter}) => {
    const [mainForm] = Form.useForm();
    const [ageValidateStatus, setAgeValidateStatus] = useState("")

    useEffect(() => {
        if (result) {
            mainForm.setFieldsValue({...result})
        }
    }, []);

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
            setResult(Object.assign(result, values));
            mainForm.resetFields();
            setResult(result);
            nextStep();
        } else {
            setAgeValidateStatus("error")
        }
    };


    return (
        <Form
            name="basic"
            form={mainForm}
            requiredMark={true}
            onFinish={onFinish}
            noValidate>
            <Text style={{fontSize :'19px', color:'GrayText'}}>Назва</Text>
            <Form.Item name="name"
                       className="add-club-row"
                       hasFeedback
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
            <Form.Item name="categories"
                       className="add-club-row"
                       hasFeedback
                       rules={[
                           {
                               required: true,
                               message: "Це поле є обов'язковим"
                           }]}>
                <Checkbox.Group className="add-club-categories">
                    {categories.map(category => <Checkbox
                        value={category.name}>{category.name}</Checkbox>)}
                </Checkbox.Group>
            </Form.Item>

            <Text style={{fontSize :'19px', color:'GrayText'}}>Вік дитини</Text>
            <Form.Item
                className="add-club-row"
                hasFeedback
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
            { fromCenter ? <div> </div> :
                <>
                <Text style={{fontSize :'19px', color:'GrayText'}}>Приналежність до центру</Text>
                <Form.Item name="centerId"
                       className="add-club-row"
                >
                <Select
                    className="add-club-select"
                    placeholder="Назва центру"
                    hasFeedback>
                    {centers.map(c => <Option value={c.id}>{c.name}</Option>)}
                </Select>
            </Form.Item>
            </>
            }
            <div className="add-club-content-footer">
                <Button htmlType="submit"
                        className="add-club-content-prev">{step > 0 && "Назад"}</Button>
                <Button className="flooded-button add-club-content-next" htmlType="submit">Наступний крок</Button>
            </div>
        </Form>
    )
};

export default MainInformationStep;