import {Button, DatePicker, Form, InputNumber, Layout, List, message, Select, Upload} from "antd";
import React, {useEffect, useState} from "react";
import './css/ImportData.css';
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import {Content} from "antd/es/layout/layout";
import {BASE_URL} from "../../../service/config/ApiConfig";
import {
    getNumberOfUnsentCertificates,
    loadDataToDatabase,
    sendCertificatesScheduler
} from "../../../service/CertificateService";
import {tokenToHeader} from "../../../service/UploadService";
import moment from "moment";
import {useForm} from "antd/es/form/Form";
import {ERROR_CODE, renderIcon, SUCCESS_CODE, WARNING_CODE} from "../../constants/CertificateConstants";

const ImportCertificateData = () => {

    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataToLoad, setDataToLoad] = useState({});
    const [mistakes, setMistakes] = useState([]);
    const [databaseResponse, setDatabaseResponse] = useState([]);
    const [unsentCertificates, setUnsentCertificates] = useState();

    const [datesForm] = useForm();

    const dateFormat = 'YYYY-MM-DD';
    const [formFilled, setFormFilled] = useState(false);

    const studyTypes = [
        {label: "очна", value: "очна"},
        {label: "онлайн", value: "онлайн"},
        {label: "змішана", value: "змішана"}
    ];

    const [dataToDB, setDataToDB] = useState({
        type: null,
        startDate: '',
        endDate: '',
        hours: 40,
        courseNumber: null,
        studyType: "онлайн",
        excelList: {}
    });

    const onTypeChange = (value) => {
        setDataToDB({...dataToDB, type: value.target.value})
        dataToDB.type = value.target.value;
        isFilled();
    }

    const onStartDateChange = (value) => {
        dataToDB.startDate = moment(value).format(dateFormat)
        isFilled()
    }

    const onEndDateChange = (value) => {
        dataToDB.endDate = moment(value).format(dateFormat)
        isFilled()
    }

    const onHoursChange = (value) => {
        setDataToDB({...dataToDB, hours: value})
        isFilled()
    }

    const onCourseNumberChange = (value) => {
        dataToDB.courseNumber = value
        isFilled()
    }

    const onStudyFormChange = (value) => {
        setDataToDB({...dataToDB, studyType: value});
        isFilled();
    }

    const isFilled = () => {
        setFormFilled(false);
        if (dataToDB.type === '3') {
            if (dataToDB.type !== null &&
                dataToDB.startDate !== '' && dataToDB.startDate !== 'Invalid date' &&
                dataToDB.endDate !== '' && dataToDB.endDate !== 'Invalid date' &&
                dataToDB.hours != null &&
                dataToDB.courseNumber != null) {
                setFormFilled(true)
            }
        } else if (dataToDB.type === '1' || dataToDB.type === '2' || dataToDB.type === "4" || dataToDB.type === "5") {
            if (dataToDB.type !== null &&
                dataToDB.hours != null &&
                dataToDB.courseNumber != null &&
                dataToDB.studyType !== null) {
                setFormFilled(true)
            }
        }
    }

    const getData = () => {
        getNumberOfUnsentCertificates().then(response => {
            setUnsentCertificates(response);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    const uploadExcel = (value) => {
        if (value.file.response !== undefined) {
            console.log(value.file.response)
            setDataLoaded(value.file.response.parsingMistakes.length === 0)
            setMistakes(value.file.response.parsingMistakes)
            setDataToLoad(value.file.response.certificatesInfo)
            setDataToDB({...dataToDB, excelList: value.file.response.certificatesInfo})
        }
        console.log(dataToDB);
    }

    const mistakesList = () => {
        return (<List
            size="small"
            dataSource={mistakes}
            renderItem={item => <List.Item className="import-db-list-item">
                {renderIcon(ERROR_CODE)}
                {`
                            Рядок ${item.rowIndex}. 
                            ${item.errorDetails}: 
                            ${item.cellValue.length !== 0 ? `зі значенням "${item.cellValue} "` : " немає даних"}  
                        `}
            </List.Item>}
        />)
    }

    const databaseResponseList = () => {
        return (<List
            size="small"
            dataSource={databaseResponse}
            renderItem={item => <List.Item className="import-db-list-item">
                {renderIcon(WARNING_CODE)}
                {`
                            ${item.message}  
                        `}
            </List.Item>}
        />)
    }

    const radioGroup = () => {
        return (<div className="radio-group">
            <div>
                <input type="radio"
                       value="1"
                       id="trainer"
                       name="type"
                       className="radio-button"
                       onChange={onTypeChange}/>
                <label htmlFor="trainer">тренера</label>
            </div>
            <div>
                <input type="radio"
                       value="2"
                       id="moderator"
                       name="type"
                       className="radio-button"
                       onChange={onTypeChange}/>
                <label htmlFor="moderator">модератора</label>
            </div>
            <div>
                <input type="radio"
                       value="3"
                       id="participant"
                       name="type"
                       className="radio-button"
                       onChange={onTypeChange}/>
                <label htmlFor="participant">учасника</label>
            </div>
            <div>
                <input type="radio"
                       value="4"
                       id="basic_participant"
                       name="type"
                       className="radio-button"
                       onChange={onTypeChange}/>
                <label htmlFor="basic_participant">учасника базового рівня</label>
            </div>
            <div>
                <input type="radio"
                       value="5"
                       id="business_participant"
                       name="type"
                       className="radio-button"
                       onChange={onTypeChange}/>
                <label htmlFor="business_participant">учасника бізнес-курсу</label>
            </div>
        </div>)
    };

    const loadToDatabase = () => {
        if (dataLoaded) {
            console.log(dataToDB);
            loadDataToDatabase(dataToDB).then(response => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                console.log(response);
                setDatabaseResponse(response);
                if (response.length === 0) {
                    message.success('Дані успішно додані');
                    getData();
                }
            })
        }
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
    }

    return (<Layout className="" style={{paddingTop: 40, background: 'white'}}>
        <Content className="certificate-page">
            <div className="import-excel">
                <Form
                    form={datesForm}
                    className="load-excel-form"
                    name="basic"
                    requiredMark={false}>

                    <Text
                        className="text-hint">
                        Завантажте excel-файл для імпорту інформації про сертифікати:
                    </Text>

                    <div
                        style={dataLoaded ? {} : {display: 'none'}}
                        className="import-report">
                        <span>
                            {renderIcon(SUCCESS_CODE)}
                            Знайдено інформацію для генерації {dataLoaded ? dataToLoad.length : 0} сертифікатів
                        </span>
                    </div>

                    <span className="buttons">
                        <Form.Item
                            name="excel-file"
                            rules={[{
                                required: true, message: "Завантажте Excel-файл"
                            }]}>
                            <Upload
                                name="excel-file"
                                accept={".xlsx"}
                                action={BASE_URL + "/api/v1/certificate/excel"}
                                maxCount={1}
                                icon={<UploadOutlined/>}
                                headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                                onChange={uploadExcel}
                            >
                                <Button className="flooded-button" htmlType="submit"><UploadOutlined className="icon"/>Завантажити excel-файл</Button>
                            </Upload>
                        </Form.Item>
                        </span>

                    <div style={mistakes.length !== 0 ? {} : {display: 'none'}}>
                        <Paragraph>
                            <Text
                                className="text-hint">
                                При зчитуванні excel-файлу не вдалось розпізнати наступні дані:
                            </Text>
                        </Paragraph>
                        {mistakesList()}
                    </div>

                </Form>
            </div>

            <div className="send-to-db">
                <Form
                    className="load-excel-form"
                    name="basic"
                    requiredMark={false}
                    initialValues={{remember: true}}
                    onChange={isFilled}>
                    <Text
                        className="text-hint">
                        Згенерувати сертифікати для:
                    </Text>
                    <Form.Item
                        name="type"
                        value={dataToDB.type}>
                        {radioGroup()}
                    </Form.Item>

                    <Text
                        className="text-hint">
                        Інформація про курс:
                    </Text>

                    <div style={{display: "flex", marginTop: 10}}>
                        <Form.Item
                            style={{marginRight: 5}}
                            name="startDate"
                            label="Період навчання з"
                        >
                            <DatePicker
                                onChange={onStartDateChange}
                                format={dateFormat}
                                name="startDate"
                                id="startDate"
                                value={dataToDB.startDate}
                                disabled={(dataToDB.type === "1" || dataToDB.type === "2") || dataToDB.type === "4" || dataToDB.type === "5"}
                            />
                        </Form.Item>

                        <Form.Item
                            name="endDate"
                            label="по"
                        >
                            <DatePicker
                                onChange={onEndDateChange}
                                format={dateFormat}
                                name="endDate"
                                value={dataToDB.endDate}
                                disabled={(dataToDB.type === "1" || dataToDB.type === "2") || dataToDB.type === "4" || dataToDB.type === "5"}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="studyType"
                        label="Форма навчання"
                        initialValue="онлайн"
                    >
                        <Select
                            options={studyTypes}
                            disabled={(dataToDB.type === "3")}
                            onChange={onStudyFormChange}
                            name="studyType"
                            className="dropdown"
                        />
                    </Form.Item>

                    <Form.Item
                        name="hours"
                        label="Тривалість навчання "
                    >
                        <InputNumber
                            min={1}
                            max={999}
                            name="hours"
                            value={dataToDB.hours}
                            onChange={onHoursChange}
                        />
                        <span> годин</span>
                    </Form.Item>

                    <Form.Item
                        name="courseNumber"
                        label="Номер курсу "
                    >
                        <InputNumber
                            min={1}
                            max={99}
                            name="courseNumber"
                            value={dataToDB.courseNumber}
                            onChange={onCourseNumberChange}
                        />
                    </Form.Item>

                    <span className="buttons">
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                className="flooded-button send-data-button"
                                disabled={!(formFilled && dataLoaded)}
                                headers={{Authorization: tokenToHeader()}}
                                onClick={() => loadToDatabase()}
                            >
                                Відправити всі дані у БД
                            </Button>
                        </Form.Item>
                            <Button
                                className="flooded-button send-data-button"
                                disabled={unsentCertificates === 0}
                                headers={{Authorization: tokenToHeader()}}
                                onClick={() => sendCertificates()}
                            >
                                Надіслати сертифікати
                            </Button>
                    </span>

                    <div style={databaseResponse.length !== 0 ? {} : {display: 'none'}}>
                        <Paragraph>
                            <Text
                                className="text-hint">
                                Під час збереження даних відбулись такі зміни:
                            </Text>
                        </Paragraph>
                        {databaseResponseList()}
                    </div>
                </Form>
            </div>
        </Content>
    </Layout>);
};

export default ImportCertificateData;
