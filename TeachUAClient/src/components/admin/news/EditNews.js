import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { Button, Form, Image, Input, InputNumber, message, Switch, Typography, Upload } from 'antd';
import { useForm } from "antd/es/form/Form";

import { getNewsById, updateNewsById} from "../../../service/NewsService";
import { BASE_URL, UPLOAD_IMAGE_URL } from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import "react-quill/dist/quill.snow.css";
import Editor from './Editor';
import { tokenToHeader } from "../../../service/UploadService";

const { Title } = Typography;

const EditNews = (props) => {

    const [news, setNews] = useState([{
        id: 0,
        title: "",
        date: "",
        description: "",
        urlTitleLogo: "",
        isActive: ""
    }]);

    const [currentUrlTitleLogo, setCurrentUrlTitleLogo] = useState([{
        uid: "",
        name: "",
        status: "",
        url: ""
    }])
    const [newsNotFound, setNewsNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [urlTitleLogo, setUrlTitleLogo] = useState();
    const [newsEditForm, form] = useForm();
    const newsId = useParams();
    const [name, setName] = useState();
    const [isChecked, setIsChecked] = useState(news.isActive);


    const handleNameChange = (value) => {
        setName(value);
    }
    
    const getData = () => {
        getNewsById(newsId.id).then(response => {
            setNews(response);
            setIsChecked(response.isActive);
            let baseImage = [{
                uid: "1",
                name: response.name,
                status: "upload",
                url: BASE_URL + response.urlTitleLogo
            }];
            setCurrentUrlTitleLogo(baseImage);
        }).catch(response => {
            if (response.status === 404) {
                setNewsNotFound(true);
            }
        });
        setLoading(false);
    };

    const onFill = () => {
        newsEditForm.setFieldsValue(news);
    };

    const saveForm = (values) => {
        // console.log("PRE Update, values = " + values.date);
        if (typeof values.date === 'string') {
            // console.log('Variable   values.date   is a string');
            values.date = values.date.split(",").map(Number);
        }
        // if (values.date instanceof Array) {
        //     console.log('Value values.date  is Array!');
        // }
        //
        updateNewsById(newsId.id, values).then(response => {
            console.log(response);
            console.log(newsId.id)
            if (response.status) {
                message.warning(response.message);
                return;
            }
            message.success(`Новина ${news.title} успішно оновлено`);
        });
        setNews(values);
    };

    const handleToggleSwitch = (state) => {
        console.log("handleChange", state);
        news.isActive = state;
        setIsChecked(state)
    };

    const handleUrlTitleLogoChange = (value) => {
        if (value.file.status == "removed") {
            news.urlTitleLogo = null;
        } else {
            setUrlTitleLogo("/upload/news/" + value.file.name);
            news.urlTitleLogo = urlTitleLogo;
        }
        setCurrentUrlTitleLogo(value.fileList);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="add-form">
            <Link
                to="/admin/news"
                className="back-btn"
            >
                <Button className="flooded-button">
                    До списку новин
                </Button>
            </Link>
            <Link
                to={"/news/" + newsId.id}
                className="back-btn"
            >
                <Button className="flooded-button">
                    Переглянути новину
                </Button>
            </Link>
            <Title>Редагування новини</Title>
            <Form
                initialValues={onFill()}
                onFinish={saveForm}
                form={newsEditForm}
                autoComplete="off"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
            >

                <Form.Item
                    name="isActive"
                    label="Статус"
                    initialValue={isChecked}
                >
                    <Switch defaultChecked={isChecked} checked={isChecked} onChange={handleToggleSwitch} />
                </Form.Item>

                <Form.Item
                    label="Заголовок"
                    name="title"
                    value={news.title}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Дата"
                    name="date"
                    value={news.date}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Опис"
                    name="description"
                >
                    <Editor />
                </Form.Item>
                <Form.Item
                    name="urlTitleLogo"
                    label="Фото"
                    value={urlTitleLogo}
                >
                    <Upload
                        name="image"
                        listType="picture-card"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        accept="image/*"
                        fileList={currentUrlTitleLogo}
                        data={{ folder: `news` }}
                        headers={{ contentType: 'multipart/form-data', Authorization: tokenToHeader() }}
                        onChange={(uploaded) => handleUrlTitleLogoChange(uploaded)}
                    >
                        <span className="upload-label"><UploadOutlined className="icon" />Завантажити</span>
                    </Upload>
                </Form.Item>
                <Form.Item>
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
    )

}
export default EditNews;