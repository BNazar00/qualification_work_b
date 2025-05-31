import {Button, DatePicker, Form, Input, InputNumber, Layout, List, message, Modal, Select, Upload} from "antd";
import React, {useEffect, useRef, useState} from "react";
import './css/ImportCertificateDataStyles.less';
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import Paragraph from "antd/lib/typography/Paragraph";
import {Content} from "antd/es/layout/layout";
import {BASE_URL, SERVICE_EMAIL} from "../../../service/config/ApiConfig";
import {tokenToHeader} from "../../../service/UploadService";
import {useForm} from "antd/es/form/Form";
import * as CertificateByTemplateService from "../../../service/CertificateByTemplateService";
import {
    loadDataCertificatesByTemplateToDB,
    loadTemplateName,
    validateCertificateExcelData
} from "../../../service/CertificateByTemplateService";
import {getAllTemplates} from "../../../service/TemplateService";
import {getNumberOfUnsentCertificates, sendCertificatesScheduler} from "../../../service/CertificateService";
import DraggableList from "../../../util/DraggableList";
import {ERROR_CODE, renderIcon, showInfo, SUCCESS_CODE} from "../../constants/CertificateConstants";
import {getGoogleFormResults} from "../../../service/GoogleFormsService";
import GoogleFormResultTable from "./GoogleFormResultTable";
import {DownloadOutlined, QuestionCircleOutlined, WarningOutlined} from "@ant-design/icons";

const ImportCertificateByTemplateData = () => {
    const [templates, setTemplates] = useState([]);
    const [unsentCertificates, setUnsentCertificates] = useState();
    const [validationResult, setValidationResult] = useState([]);
    const [inputtedValues, setInputtedValues] = useState({});
    const [isSendButtonActive, setIsSendButtonActive] = useState(false);
    const [isGoogleFormButtonActive, setIsGoogleFormButtonActive] = useState(false);
    const [googleFormButtonLoadingState, setGoogleFormButtonLoadingState] = useState(false);
    const [invalidCertificateValues, setInvalidCertificateValues] = useState([]);
    const [passingScore, setPassingScore] = useState(0);
    const [openHelpModal, setOpenHelpModal] = useState(false);
    const textRef = useRef(null);

    const dateFormat = 'DD.MM.YYYY';

    const [dataToPdfCreating, setDataToPdfCreating] = useState({
        fieldsList: [],
        fieldPropertiesList: [],
        templateName: "",
        values: "",
        columnHeadersList: [],
        excelContent: [],
        excelColumnsOrder: [],
        googleFormResults: []
    })

    const [excelColumnHeadersList, setExcelColumnHeadersList] = useState([]);

    const [googleFormInfo, setGoogleFormInfo] = useState({
        link: "",
        passingScore: 0
    })

    const [quizInfo, setQuizInfo] = useState({
        title: "",
        totalPoints: 0,
        results: []
    })

    const [datesForm] = useForm();
    const getTemplates = () => {
        getAllTemplates().then(response => {
            let list = [];
            response.forEach(value => {
                list.push({
                    label: value.name,
                    value: value.filePath
                })
            })
            setTemplates(list);
        });
    }

    useEffect(() => {
        getTemplates();
    }, []);

    const onTemplateChange = (value) => {
        loadTemplateName(value).then(response => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            setDataToPdfCreating({
                ...dataToPdfCreating,
                fieldsList: response.fieldsList,
                fieldPropertiesList: response.fieldPropertiesList,
                templateName: response.templateName
            })

            const form = document.getElementById('importCertificateByTemplateDataFieldsForm');
            form.reset();

            Object.keys(inputtedValues).forEach(key => delete inputtedValues[key]);
            for (const element of response.fieldsList) {
                inputtedValues[element] = "";
            }
        })
    }

    const uploadExcel = (value) => {
        if (value.file.response !== undefined) {
            console.log(value.file.response)
            setExcelColumnHeadersList([])

            let columnHeadersList = value.file.response.columnHeadersList
            if (dataToPdfCreating.fieldsList.length > columnHeadersList.length) {
                let count = dataToPdfCreating.fieldsList.length - columnHeadersList.length;
                for (let i = 0; i < count; i++) {
                    columnHeadersList.push("");
                }
            }
            setExcelColumnHeadersList(columnHeadersList)

            if (dataToPdfCreating.googleFormResults.length !== 0) {
                message.warning("Дані, завантажені з GoogleForms, будуть проігноровані!");
                setQuizInfo({
                    title: "",
                    totalPoints: 0,
                    results: []
                })
                setValidationResult([]);
            }

            setDataToPdfCreating({
                ...dataToPdfCreating,
                excelContent: value.file.response.excelContent,
                columnHeadersList: value.file.response.columnHeadersList,
                excelColumnsOrder: columnHeadersList,
                googleFormResults: []
            })

            setValidationResult([]);
            setIsSendButtonActive(false);
        }
    };

    const validationResultList = () => {
        return (<List
            size="small"
            className={"validation-result-list custom-scroll"}
            dataSource={validationResult}
            renderItem={item =>
                <List.Item className="validation-result-wrapper">
                    {renderIcon(item[1])}
                    <span>{item[0]}</span>
                </List.Item>}
        />)
    }

    const columnsList = () => {
        let items = [];
        for (let i = 0; i < dataToPdfCreating.fieldsList.length; i++) {
            const element = dataToPdfCreating.fieldsList[i];
            const property = dataToPdfCreating.fieldPropertiesList[i];
            switch (property) {
                case "int":
                    items.push(
                        <Form.Item
                            className="form-item form-item-int"
                            name={element}
                        >
                            <span className={"field-name"}>{element + ': '}</span>
                            <div className="inputNumber-wrapper">
                                <InputNumber
                                    id="input-int"
                                    name={element}
                                    key={element}
                                    min={1}
                                    max={999}
                                    onChange={e => {
                                        saveValue(element, e ? e.toString() : "");
                                        checkButtonState();
                                    }}
                                />
                            </div>
                        </Form.Item>
                    );
                    break;
                case "date":
                    items.push(
                        <Form.Item
                            className="form-item form-item-int"
                            name={element}
                        >
                            <span className={"field-name"}>{element + ': '}</span>
                            <div className="inputNumber-wrapper">
                                <DatePicker
                                    onChange={(date, dateString) => {
                                        saveValue(element, dateString);
                                        checkButtonState();
                                    }}
                                    format={dateFormat}

                                    name="startDate"
                                    id="input-date"
                                />
                            </div>
                        </Form.Item>
                    );
                    break;
                case "user_name":
                case "email":
                    items.push(
                        <Form.Item
                            className="form-item form-item-text"
                            name={element}
                        >
                            <span className={"field-name"}>{element + ': '}</span>
                            <Input
                                id="input-text"
                                name={element}
                                key={element}
                                disabled={dataToPdfCreating.googleFormResults.length !== 0}
                                onChange={e => {
                                    saveValue(element, e.target.value);
                                    checkButtonState();
                                }}
                            />
                        </Form.Item>
                    );
                    break;
                default:
                    items.push(
                        <Form.Item
                            className="form-item form-item-text"
                            name={element}
                        >
                            <span className={"field-name"}>{element + ': '}</span>
                            <Input
                                id="input-text"
                                name={element}
                                key={element}
                                onChange={e => {
                                    saveValue(element, e.target.value);
                                    checkButtonState();
                                }}
                            />
                        </Form.Item>
                    );
            }
        }

        return (
            <Form
                className="form"
                id="importCertificateByTemplateDataFieldsForm"
                name="basic"
                requiredMark={false}
                initialValues={{remember: true}}>
                {items}
            </Form>
        )
    }

    const saveValue = (fieldName, value) => {
        inputtedValues[fieldName] = value;
    };

    const checkButtonState = () => {
        for (const field of Object.values(inputtedValues)) {
            if (field.toString().trim().length === 0) {
                setIsSendButtonActive(false);
                return;
            }
        }

        setIsSendButtonActive(true);
    };

    const getData = () => {
        getNumberOfUnsentCertificates().then(response => {
            setUnsentCertificates(response);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    const loadCertificatesByTemplateToDB = () => {
        dataToPdfCreating.values = JSON.stringify(inputtedValues);
        console.log(dataToPdfCreating)

        loadDataCertificatesByTemplateToDB(dataToPdfCreating)
            .then(response => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                console.log(response);
                getData();
                setIsSendButtonActive(false);
                setValidationResult([]);
                setExcelColumnHeadersList([])
                setDataToPdfCreating({
                    ...dataToPdfCreating,
                    values: "",
                    columnHeadersList: [],
                    excelContent: [],
                    excelColumnsOrder: []
                })
                document.getElementById('importCertificateByTemplateDataFieldsForm').reset();
                document.getElementById('load-excel-form').reset();
                Object.keys(inputtedValues).forEach(key => delete inputtedValues[key]);
                for (const element of dataToPdfCreating.fieldsList) {
                    inputtedValues[element] = "";
                }

                message.success('Дані успішно додані');
            })
    }

    const sendCertificates = () => {
        sendCertificatesScheduler().then(response => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            console.log(response);
            message.success('Процес надсилання сертифікатів розпочато');
        })

    };

    const childrenToRender = excelColumnHeadersList.map((item, i) => {
        return (
            <div key={i + "_" + item} className={`draggable-list-element`}>
                <div className="draggable-list-element-content-wrapper"
                     style={item.length === 0 ? {opacity: .4} : {}}
                >
                    <div className={`draggable-list-text`}>
                        <p>{item}</p>
                    </div>
                </div>
            </div>
        );
    });

    const onDraggableListChange = (elements) => {
        let array = [];
        elements.forEach(element => {
            array.push(element.key.slice(element.key.indexOf("_") + 1));
        })
        setIsSendButtonActive(false);
        setDataToPdfCreating({...dataToPdfCreating, excelColumnsOrder: array});
    }

    const validateExcel = () => {
        dataToPdfCreating.values = JSON.stringify(inputtedValues);

        validateCertificateExcelData(dataToPdfCreating).then((response) => {
            if (response.status) {
                console.log(dataToPdfCreating)
                message.warning(response.message);
                return;
            }
            setValidationResult(response.messages);
            for (const message of response.messages) {
                if (message[1] === ERROR_CODE) {
                    setIsSendButtonActive(false);
                    return;
                }
            }
            setIsSendButtonActive(true);
        });
    }

    const saveGoogleFormCertificateData = () => {
        dataToPdfCreating.values = JSON.stringify(inputtedValues);
        CertificateByTemplateService.saveGoogleFormCertificateData(dataToPdfCreating).then((response) => {
            if (response.status) {
                console.log(dataToPdfCreating)
                message.warning(response.message);
                return;
            }

            setInvalidCertificateValues(response.invalidValues);
            setValidationResult(response.messages);
            showInfo([response.messages[0]])
            getData();
        });
    }

    const onGoogleFormLinkChange = (element) => {
        googleFormInfo.link = element.target.value;
    };

    const onGoogleFormPassingScoreChange = (value) => {
        googleFormInfo.passingScore = value;
    };

    const checkGoogleFormButtonState = () => {
        if (googleFormInfo.link !== "") {
            setIsGoogleFormButtonActive(true);
        } else {
            setIsGoogleFormButtonActive(false);
        }
    };

    const onGoogleFormDataInputButtonClick = () => {
        setGoogleFormButtonLoadingState(true);
        getGoogleFormResults(getGoogleFormId(googleFormInfo.link)).then((response) => {
            if (response.status === 400) {
                setGoogleFormButtonLoadingState(false);
                message.error("Неможливо зчитати посилання!");
                return;
            } else if (response.status) {
                setGoogleFormButtonLoadingState(false);
                message.warning(response.message);
                return;
            }
            setQuizInfo({
                title: response.title,
                totalPoints: response.totalPoints,
                results: response.quizResults
            })
            if (dataToPdfCreating.excelContent.length !== 0) {
                message.warning("Дані, завантажені з excel-файлу, будуть проігноровані!");
                setExcelColumnHeadersList([])
                setValidationResult([]);
            }

            setDataToPdfCreating({
                ...dataToPdfCreating,
                excelContent: [],
                columnHeadersList: [],
                excelColumnsOrder: [],
                googleFormResults: filterResults(response.quizResults, googleFormInfo.passingScore)
            })
            setPassingScore(googleFormInfo.passingScore);
            setIsGoogleFormButtonActive(false);
            setGoogleFormButtonLoadingState(false);
        });
    };

    const getGoogleFormId = (link) => {
        let elements = link.split("/");
        let id = "";
        for (const element of elements) {
            if (id.length < element.length) {
                id = element;
            }
        }
        return id;
    }

    const filterResults = (results, passingScore) => {
        let resultsArray = [];
        for (const result of results) {
            if (result.totalScore >= passingScore) {
                resultsArray.push(result);
            }
        }
        return resultsArray;
    };

    const downloadInvalidCertificatesExcel = () => {
        CertificateByTemplateService.downloadInvalidCertificatesExcel(invalidCertificateValues).then(response => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            const url = window.URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'certificates.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
    };

    const showHelpModal = () => {
        setOpenHelpModal(true);
    };

    const handleOk = () => {
        setOpenHelpModal(false);
    };

    const handleCancel = () => {
        setOpenHelpModal(false);
    };

    const handleCopyClick = () => {
        if (textRef.current) {
            navigator.clipboard.writeText(textRef.current.value)
                .then(() => {
                    message.success("Email скопійовано в буфер обміну!")
                })
                .catch((error) => {
                    console.error("Error copying text: ", error);
                    message.error("Вибачте, щось пішло не так...")
                });
        }
    };

    const getCopyData = () => {
        return SERVICE_EMAIL.replace(/[a-zA-Z]/g, function(c) {
            return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
    };

    return (<Layout className="certificate-by-template">
            <Content className="certificate-page">
                <div className="container">
                    <div>
                        <h2
                            className="text-hint stage-header">
                            Оберіть pdf-файл для імпорту інформації про шаблон:
                        </h2>
                        <Form
                            form={datesForm}
                            requiredMark={false}
                        >
                    <span style={{textAlign: "center", marginTop: '15px'}}>
                        <Form.Item>
                        <Select
                            name="template"
                            className="dropdown"
                            placeholder="Оберіть шаблон"
                            options={templates}
                            key={templates}
                            onChange={onTemplateChange}
                        />
                        </Form.Item>
                    </span>
                            <div
                                style={dataToPdfCreating.fieldsList.length !== 0 ? {} : {display: 'none'}}
                                className="">
                        <span>
                            {renderIcon(SUCCESS_CODE)}
                            Знайдено {dataToPdfCreating.fieldsList ? dataToPdfCreating.fieldsList.length : 0} полів
                        </span>
                            </div>
                        </Form>
                    </div>
                    <div>
                        <h2
                            className="text-hint">
                            Імпорт даних:
                        </h2>
                        <div className={"import-wrapper"}>
                            <div>
                                <Form
                                    form={datesForm}
                                    className="load-excel-form"
                                    id="load-excel-form"
                                    name="basic"
                                    requiredMark={false}
                                >
                                    <Form.Item
                                        name="excel-file"
                                        style={{margin: 0}}
                                        rules={[{
                                            required: false, message: "Завантажте Excel-файл"
                                        }]}>
                                        <Upload
                                            name="excel-file"
                                            accept={".xlsx"}
                                            action={BASE_URL + "/api/v1/certificate-by-template/excel"}
                                            maxCount={1}
                                            icon={<UploadOutlined/>}
                                            headers={{
                                                contentType: 'multipart/form-data',
                                                Authorization: tokenToHeader()
                                            }}
                                            onChange={uploadExcel}
                                        >
                                            <Button className="flooded-button" htmlType="submit"><UploadOutlined
                                                className="icon"/>
                                                Імпортувати дані з excel-файлу
                                            </Button>
                                        </Upload>
                                    </Form.Item>
                                </Form>
                            </div>
                            <div className={"google-form_wrapper"}>
                                <div className="google-form_title_wrapper">
                                    <p>Імпортувати дані з Google Forms </p>
                                    <QuestionCircleOutlined
                                        id={"question-ico"}
                                        onClick={showHelpModal}
                                    />
                                    <Modal
                                        className={"certificate-by-template_modal"}
                                        open={openHelpModal}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                        width={800}
                                        footer={null}
                                        bodyStyle={{padding: '0'}}
                                    >
                                        <div className={"certificate-by-template_help-image_wrapper custom-scroll"}>
                                            <img
                                                src={`${process.env.PUBLIC_URL}/static/images/certificate/helpModalPhoto.png`}
                                                style={{width: '100%'}} alt={"help"}/>
                                            <span
                                                className={"certificate-by-template_modal_tip tip-1"}
                                                onClick={handleCopyClick}>
                                                Відкривши потрібну форму в режимі редагування, потрібно виконати кроки, зображені на фото, та підключити сервісний акаунт, увівши електронну пошту в обведене поле (назву електронної скриньки можна скопіювати, просто клікнувши по цьому тексту)
                                            </span>
                                            <span className={"certificate-by-template_modal_tip tip-2"}>
                                                У випадку успішного підключення, акаунт буде відображатися у списку користувачів, що мають доступ.
                                            </span>
                                            <span className={"certificate-by-template_modal_tip tip-3"}>
                                                <WarningOutlined className={"warning-ico"}/><br/>
                                                Посилання на форму, яке буде надіслане, для опрацювання сервером, потрібно копіювати з режиму редагування цієї форми!                                            </span>
                                        </div>
                                        <textarea
                                            ref={textRef}
                                            defaultValue={getCopyData()}
                                            style={{display: "none"}}
                                        />

                                    </Modal>
                                </div>
                                <Form id={"import-google-form_form"}>
                                    <Form.Item name="google-form">
                                        <Input.Group compact>
                                            <Input
                                                style={{width: '45%'}}
                                                placeholder={"Посилання на Google Form"}
                                                onChange={e => {
                                                    onGoogleFormLinkChange(e);
                                                    checkGoogleFormButtonState();
                                                }}
                                            />
                                            <InputNumber
                                                style={{width: '30%'}}
                                                placeholder={"Прохідний бал"}
                                                title={"Прохідний бал(включно)"}
                                                min={0}
                                                onChange={e => {
                                                    onGoogleFormPassingScoreChange(e);
                                                    checkGoogleFormButtonState();
                                                }}
                                            />
                                            <Button
                                                type="primary"
                                                loading={googleFormButtonLoadingState}
                                                disabled={!isGoogleFormButtonActive}
                                                onClick={onGoogleFormDataInputButtonClick}
                                            >
                                                Ok
                                            </Button>
                                        </Input.Group>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                        <div style={dataToPdfCreating.excelContent.length !== 0 ? {} : {display: 'none'}}>
                            <span>
                                {renderIcon(SUCCESS_CODE)}
                                Знайдено інформацію для генерації {dataToPdfCreating.excelContent ? dataToPdfCreating.excelContent.length : 0} сертифікатів
                            </span>
                        </div>
                        <div style={quizInfo.results.length !== 0 ? {} : {display: 'none'}}>
                            <span>
                                Опитування: "{quizInfo.title}";<br/>
                                Загальна кількість учасників: {quizInfo.results.length};<br/>
                                Із них отримають сертифікат: {dataToPdfCreating.googleFormResults.length};
                            </span>
                            <GoogleFormResultTable
                                passingScore={passingScore}
                                quizInfo={quizInfo}
                            />
                        </div>
                    </div>
                    <div
                        className={"configuration"}
                        style={dataToPdfCreating.fieldsList.length > 0 ? {} : {display: 'none'}}
                    >
                        {columnsList()}
                        <div className={"draggable-list-wrapper"}>
                            <div className={"draggable-list"}>
                                <DraggableList
                                    dragClassName="list-drag-selected"
                                    onChange={onDraggableListChange}
                                >
                                    {childrenToRender}
                                </DraggableList>
                            </div>
                        </div>
                    </div>
                    <div
                        className={"certificate-data-validation-results-wrapper"}
                        style={validationResult.length !== 0 ? {} : {display: 'none'}}
                    >
                        <Paragraph>
                            <h2
                                className="text-hint">
                                Результати валідації:
                            </h2>
                        </Paragraph>
                        {validationResultList()}
                        <div className="download-float-button-wrapper"
                             style={(dataToPdfCreating.googleFormResults.length !== 0) ? {} : {display: 'none'}}>
                            <Button
                                onClick={downloadInvalidCertificatesExcel}>
                                <DownloadOutlined/>Завантажити .excel файл невалідних сертифікатів
                            </Button>
                        </div>
                    </div>
                    <span className="buttons">
                    <div className={"certificate-data-control-wrapper"}
                         style={(dataToPdfCreating.googleFormResults.length === 0) ? {} : {display: 'none'}}>
                        <Button
                            style={(dataToPdfCreating.fieldsList.length !== 0 && dataToPdfCreating.excelContent.length !== 0) ? {} : {display: 'none'}}
                            className="flooded-button send-data-button"
                            disabled={isSendButtonActive}
                            headers={{Authorization: tokenToHeader()}}
                            onClick={() => validateExcel()}
                        >
                            Валідувати дані
                        </Button>
                        <Button
                            style={dataToPdfCreating.fieldsList.length !== 0 ? {} : {display: 'none'}}
                            className="flooded-button send-data-button"
                            disabled={!isSendButtonActive}
                            headers={{Authorization: tokenToHeader()}}
                            onClick={() => loadCertificatesByTemplateToDB()}
                        >
                            Відправити всі дані у БД
                        </Button>
                    </div>
                        <div className={"certificate-data-control-wrapper"}
                             style={(dataToPdfCreating.googleFormResults.length !== 0) ? {} : {display: 'none'}}>
                        <Button
                            className="flooded-button send-data-button"
                            headers={{Authorization: tokenToHeader()}}
                            onClick={() => saveGoogleFormCertificateData()}
                        >
                            Валідувати та надіслати дані
                        </Button>
                    </div>
                    <Button
                        className="flooded-button send-data-button"
                        disabled={unsentCertificates === 0}
                        headers={{Authorization: tokenToHeader()}}
                        onClick={() => sendCertificates()}
                    >
                        Надіслати сертифікати
                    </Button>
                </span>
                </div>
            </Content>
        </Layout>
    );
}

export default ImportCertificateByTemplateData;
