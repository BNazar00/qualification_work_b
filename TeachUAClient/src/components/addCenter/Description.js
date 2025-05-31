import {Form, Input, Upload, Button, Typography} from 'antd';
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import EditorComponent from "../editor/EditorComponent";
import {UPLOAD_IMAGE_URL} from "../../service/config/ApiConfig";
import {saveContent} from "../editor/EditorConverter";
import React, {useEffect, useRef} from 'react';
import "./css/Description.css";
import {transToEng} from '../../util/Translit';
import {tokenToHeader} from "../../service/UploadService";

const Description = ({step, setStep, result, setResult}) => {
    const [descriptionForm] = Form.useForm();
    const editorRef = useRef(null);
    const centerName = transToEng(result.name.replace(/[^a-zA-ZА-Яа-яЁё0-9]/gi, ""));
    const leftDesc = "{\"blocks\":[{\"key\":\"brl63\",\"text\":\"";
    const rightDesc = "\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}";
    const {Text} = Typography;


    const nextStep = () => {
        setStep(step + 1);
    }

    const prevStep = () => {
        setResult(Object.assign(result, descriptionForm.getFieldValue()));
        setStep(step - 1);
    }

    useEffect(() => {
        if (result) {
            descriptionForm.setFieldsValue({...result});
        }
    }, [])

    const onFinish = (values) => {
        descriptionForm.setFieldsValue(values);
        setResult(Object.assign(result, values));
        nextStep();
        descriptionForm.resetFields();
    }

    return (
        <Form
            name="basic"
            form={descriptionForm}
            requiredMark={false}
            onFinish={onFinish}
            className="description">
            <div className="form-fields">

                <Text style={{fontSize :'19px', color:'GrayText'}}>Логотип</Text>
                <Form.Item name="urlLogo"
                           className="add-club-row"
                           hasFeedback>
                    <Upload
                        name="image"
                        action={UPLOAD_IMAGE_URL}
                        accept="image/png,image/jpeg,image/jpg,image/svg,image/jfif,image/.pjp"
                        maxCount={1}
                        data={{folder: `center/${centerName}/logo`}}
                        headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                    >
                        <span className="add-club-upload"><UploadOutlined className="icon"/>Завантажити лого</span>
                    </Upload>
                </Form.Item>

                <Text style={{fontSize :'19px', color:'GrayText'}}>Фото</Text>
                <Form.Item name="urlBackground"
                           className="add-club-row"
                           hasFeedback>
                    <Upload
                        name="image"
                        action={UPLOAD_IMAGE_URL}
                        accept="image/png,image/jpeg,image/jpg,image/svg,image/jfif,image/.pjp"
                        maxCount={1}
                        data={{folder: `center/${centerName}/background`}}
                        headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                    >
                        <span className="add-club-upload"><UploadOutlined className="icon"/>Завантажити фото</span>
                    </Upload>
                </Form.Item>

                <Text style={{fontSize :'19px', color:'GrayText'}}>Опис</Text>
                <Form.Item name="description"
                           className="add-center-row"
                           hasFeedback
                           rules={[{
                               required: true,
                               pattern: /^[А-Яа-яЇїІіЄєҐґa-zA-Z0-9()!"#$%&'*+\n, ,-.:\r;<=>?|@№_`{}~^\/[\]\\]*$/,
                               message: "Некоректний опис центру"
                           },
                               {
                                   min: 40,
                                   max: 1500,
                                   message: "Опис центру може містити від 40 до 1500 символів."
                               },
                               {
                                   required: false,
                                   pattern: /^[^ЁёЪъЫыЭэ]+$/,
                                   message: 'Опис гуртка не може містити російські літери'
                               }
                           ]}
                >
                    <Input.TextArea className="editor-textarea" style={{height: 200}}
                                    placeholder="Додайте опис центру"/>
                </Form.Item>
            </div>
            <div className="btn">
                <Button className="prev-btn" type="button" onClick={prevStep}>Назад</Button>
                <Button className="next-btn" htmlType="submit">Наступний крок</Button>
            </div>
        </Form>

    )
}

export default Description;