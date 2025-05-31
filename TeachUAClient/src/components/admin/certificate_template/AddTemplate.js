import React, {useEffect, useState} from 'react';
import './css/TemplateStyles.less';
import {Button, Form, Input, Layout, message, Select, Typography, Upload} from 'antd';
import {useForm} from "antd/es/form/Form";
import {BASE_URL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {Link} from "react-router-dom";
import {tokenToHeader} from "../../../service/UploadService";
import Editor from "../../../util/Editor";
import * as TemplateService from "../../../service/TemplateService";
import {createTemplate} from "../../../service/TemplateService";
import {fieldsProperties, SUCCESS_CODE, renderIcon, showInfo} from "../../constants/CertificateConstants"
import {getCertificateTypes} from "../../../service/CertificateTypeService";

const {Title} = Typography;

const AddTemplate = () => {
    const [templateForm] = useForm();
    const [pdfUploadFormControl, setPdfUploadFormControl] = useState(0);
    const [chosenProperties, setChosenProperties] = useState({});
    const [fieldsList, setFieldsList] = useState([]);
    const [certificateTypes, setCertificateTypes] = useState([]);

    const [templateMetadata, setTemplateMetadata] = useState({
        templateName: "",
        templateLastModifiedDate: ""
    })

    const [dataToDB, setDataToDB] = useState({
        name: "",
        courseDescription: "",
        projectDescription: "",
        certificateType: 3,
        filePath: "",
        properties: {}
    });

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getCertificateTypes().then(response => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            let certificateTypesArray = [];
            for (const certificateType of response) {
                certificateTypesArray.push({
                    label: `${certificateType.codeNumber}. ${certificateType.name}`,
                    value: certificateType.codeNumber
                })
            }
            setCertificateTypes(certificateTypesArray);
            document.getElementsByClassName("ant-select-selection-item")[0].textContent = certificateTypesArray[0].label;
            dataToDB.certificateType = certificateTypesArray[0].value;
        });
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const extractContent = (htmlText) => {
        let span = document.createElement('span');
        span.innerHTML = htmlText;
        return span.textContent;
    }

    const isTemplateValid = (values) => {
        if (!!values.name && !!values.courseDescription && !!values.projectDescription) {
            if (values.name.trim().length === 0 || extractContent(values.courseDescription).trim().length === 0 ||
                extractContent(values.projectDescription).trim().length === 0) {
                message.error("Усі поля повинні бути заповнені!");
                return false;
            }
            if (values.name.length > 250) {
                message.error("Занадто велика назва!")
                return false;
            } else if (values.courseDescription.length > 1020) {
                message.error("Занадто великий опис курсу!")
                return false;
            } else if (values.projectDescription.length > 1020) {
                message.error("Занадто великий опис проекту!")
                return false;
            }
            if (dataToDB.filePath === "") {
                message.error("Завантажте pdf-шаблон!")
                return false;
            }
        } else {
            message.error("Усі поля повинні бути заповнені!")
            if (dataToDB.filePath === "") {
                message.error("Завантажте pdf-шаблон!")
            }
            return false
        }
        return true;
    };

    const loadToDatabase = (values) => {
        if (!isTemplateValid(values)) {
            return;
        }
        dataToDB.name = values.name;
        dataToDB.courseDescription = values.courseDescription;
        dataToDB.projectDescription = values.projectDescription;

        createTemplate(dataToDB)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                if (!!response.messages) {
                    if (showInfo(response.messages)) {
                        return;
                    }
                }

                message.success("Шаблон '" + response.template.name + "' успішно доданий!");

                document.getElementById('add-template_form').reset();
                setFieldsList([]);
                setPdfUploadFormControl(0);
                document.getElementsByClassName("ant-select-selection-item")[0].textContent = certificateTypes[0].label;
                dataToDB.certificateType = certificateTypes[0].value;
            });
    }

    const onFieldPropertyChange = () => {
        setDataToDB({
            ...dataToDB,
            properties: chosenProperties
        })
    }

    const onCertificateTypeChange = (element) => {
        setDataToDB({
            ...dataToDB,
            certificateType: element
        })
    }

    const uploadPdf = (value) => {
        if (value.file.response === undefined) {
            return;
        }
        setPdfUploadFormControl(value.fileList.length);

        templateMetadata.templateName = value.file.response.templateName;
        templateMetadata.templateLastModifiedDate = value.file.lastModified;

        TemplateService.loadTemplateMetadata(templateMetadata).then(response => {
                setFieldsList(value.file.response.fieldsList)
                let includesFields = [];
                Object.keys(chosenProperties).forEach(key => {
                    if (!value.file.response.fieldsList.includes(key)) {
                        delete chosenProperties[key];
                    } else {
                        includesFields.push(key);
                    }
                });

                for (const element of value.file.response.fieldsList) {
                    if (!includesFields.includes(element)) {
                        chosenProperties[element] = "";
                    }
                }

                setDataToDB({
                    ...dataToDB,
                    filePath: response.filePath,
                    properties: chosenProperties
                })

                if (response.messages != null) {
                    for (const warning of response.messages) {
                        message.warning(warning)
                    }
                }
            }
        );
    }

    const fieldPropertiesList = () => {
        return fieldsList.map(element =>
            <Form.Item
                name={element}
                label={element}
                key={"item_" + element}
                initialValue="—"
            >
                <Select
                    name={element}
                    className="dropdown"
                    options={fieldsProperties}
                    key={element}
                    onChange={value => {
                        chosenProperties[element] = value;
                        setChosenProperties(chosenProperties);
                        setDataToDB({...dataToDB, properties: chosenProperties});
                        onFieldPropertyChange();
                    }}
                />
            </Form.Item>
        )
    }

    return (
        <Layout className="template add-template" style={{paddingTop: 40, background: '#f8e5d7'}}>
            <div className="add-form" style={{paddingTop: 0}}>
                <Link
                    to="/admin/templates"
                    className="back-btn"
                >
                    <Button className="flooded-button">
                        До списку шаблонів
                    </Button>
                </Link>
                <Title>Додайте шаблон</Title>
                <Form
                    form={templateForm}
                    id="add-template_form"
                    onFinish={loadToDatabase}
                    onFinishFailed={onFinishFailed}
                    initialValues={{remember: true}}
                    autoComplete="off"
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                >
                    <Form.Item
                        name="name"
                        label="Назва шаблону"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="courseDescription"
                        label="Опис курсу"
                    >
                        <Editor/>
                    </Form.Item>
                    <Form.Item
                        name="projectDescription"
                        label="Опис проекту"
                    >
                        <Editor/>
                    </Form.Item>
                    <Form.Item
                        name="certificateTypes"
                        label="Тип сертифікату"
                        initialValue="учасник"
                    >
                        <Select
                            name="certificateType"
                            className="dropdown"
                            options={certificateTypes}
                            key={certificateTypes}
                            onChange={onCertificateTypeChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="pdfFile"
                        label="Pdf-шаблон"
                    >
                        <Upload
                            name="pdf-file"
                            className={"pdf-upload-wrapper"}
                            accept={".pdf"}
                            action={BASE_URL + "/api/v1/certificate/template/pdf"}
                            maxCount={1}
                            icon={<UploadOutlined/>}
                            headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                            onChange={uploadPdf}
                        >
                            <Button className="flooded-button"><UploadOutlined className="icon"/>
                                Завантажити
                            </Button>
                        </Upload>
                        <div
                            style={fieldsList.length !== 0 ? {} : {display: 'none'}}
                            className="import-report">
                        <span>
                            {renderIcon(SUCCESS_CODE)}
                            Знайдено {fieldsList ? fieldsList.length : 0} полів
                        </span>
                        </div>
                    </Form.Item>
                    <Form
                        id="templateCreatingFormId"
                        labelCol={{span: 4}}
                        wrapperCol={{span: 14}}
                        style={pdfUploadFormControl > 0 ? {} : {display: 'none'}}
                    >
                        <div>{fieldPropertiesList()}</div>
                    </Form>
                    <Form.Item
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="flooded-button add-contact-type-button"
                        >
                            Зберегти
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </Layout>
    );
}

export default AddTemplate;
