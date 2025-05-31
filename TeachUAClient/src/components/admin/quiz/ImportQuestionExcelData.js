import {Button, Form, Layout, List, message, Upload} from "antd";
import React, {useState} from "react";
import './css/ImportData.css';
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import {CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";
import {BASE_URL} from "../../../service/config/ApiConfig";
import {loadDataToDatabase} from "../../../service/QuizService";
import {tokenToHeader} from "../../../service/UploadService";
import {useForm} from "antd/es/form/Form";

const ImportQuestionExcelData = () => {

    const [dataLoaded, setDataLoaded] = useState(false);

    const [dataToLoad, setDataToLoad] = useState({});

    const [mistakes, setMistakes] = useState([]);
    const [databaseResponse, setDatabaseResponse] = useState([]);

    const [datesForm] = useForm();

    const [dataToDB, setDataToDB] = useState({
        questionsExcelList: {},
        answersExcelList: {}
    });


    const onFinish = () => {

    };


    const uploadExcel = (value) => {
        if (value.file.response !== undefined) {
            console.log(value.file.response)
            setDataLoaded(value.file.response.questionParsingMistakes.length === 0)
            setMistakes(value.file.response.questionParsingMistakes)
            setDataToLoad(value.file.response.questionsInfo)
            setQuestionsExcelList(value.file.response)

        }
        console.log(dataToDB);
    }

    const setQuestionsExcelList = (value) => {
        setDataToDB({
            ...dataToDB, answersExcelList: value.answersInfo, questionsExcelList: value.questionsInfo
        })

    }


    const ICON_WARNING = 1;
    const ICON_ERROR = 2;
    const ICON_OK = 3;

    const renderIcon = (type) => {
        switch (type) {
            case ICON_WARNING:
                return (<ExclamationCircleOutlined className="site-result-demo-error-icon icon warn-icon"/>)
            case ICON_ERROR:
                return (<CloseCircleOutlined className="site-result-demo-error-icon icon error-icon"/>)
            case ICON_OK:
                return (<CheckCircleOutlined className="icon ok-icon"/>)
        }
    }

    const mistakesList = () => {
        return (
            <List
                size="small"
                dataSource={mistakes}
                renderItem={item =>
                    <List.Item className="import-db-list-item">
                        {renderIcon(ICON_ERROR)}
                        {`
                            Рядок ${item.rowIndex}. 
                            ${item.errorDetails}: 
                            ${item.cellValue.length !== 0 ? `зі значенням "${item.cellValue} "` : " немає даних"}  
                        `}
                    </List.Item>}
            />
        )
    }

    const databaseResponseList = () => {
        return (
            <List
                size="small"
                dataSource={databaseResponse}
                renderItem={item =>
                    <List.Item className="import-db-list-item">
                        {renderIcon(ICON_WARNING)}
                        {`
                            ${item.message}  
                        `}
                    </List.Item>}
            />
        )
    }

    const loadToDatabase = () => {
        if (dataLoaded) {
            console.info(dataToDB)
            console.log(dataToDB);
            loadDataToDatabase(dataToDB).then(response => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                console.log(response);
                setDatabaseResponse(response);
                message.success('Дані успішно додані');
            })
        }
    }


    return (
        <Layout className="" style={{paddingTop: 40, background: 'white'}}>
            <Content className="certificate-page">
                <div className="import-excel">
                    <Form
                        form={datesForm}
                        className="load-excel-form"
                        name="basic"
                        requiredMark={false}
                        onFinish={onFinish}>

                        <Text
                            className="text-hint">
                            Завантажте excel-файл для імпорту інформації про запитання:
                        </Text>

                        <div
                            style={dataLoaded ? {} : {display: 'none'}}

                            className="import-report">
                            <span>
                                {renderIcon(ICON_OK)}
                                Знайдено інформацію для генерації {dataLoaded ? dataToLoad.length : 0} запитань

                            </span>

                        </div>

                        <span className="buttons">
                        <Form.Item
                            name="excel-file"
                            rules={[{
                                required: true,
                                message: "Завантажте Excel-файл"
                            }]}>
                            <Upload
                                name="excel-file"
                                action={BASE_URL + "/api/v1/question/excel"}
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

                <span className="buttons">
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        className="flooded-button send-data-button"
                                        disabled={!dataLoaded}
                                        headers={{Authorization: tokenToHeader()}}
                                        onClick={() => loadToDatabase()}
                                    >
                                        Відправити всі дані у БД
                                    </Button>

                                </Form.Item>

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
            </Content>
        </Layout>
    );
};

export default ImportQuestionExcelData;
