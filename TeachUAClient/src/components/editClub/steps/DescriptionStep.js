import {Button, Form, Input, message, Typography, Upload} from "antd";
import React, { useState } from "react";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import { getShortContent, saveContent } from "../../editor/EditorConverter";
import AddClubGalery from "../../addClub/AddClubGalery";
import {tokenToHeader} from "../../../service/UploadService";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import { updateClubById } from "../../../service/ClubService";

const DescriptionStep = ({ step, setStep, setResult, result, setShowing, reloadAfterChange }) => {
    const [descriptionForm] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const {Text} = Typography;

    const leftDesc = "{\"blocks\":[{\"key\":\"brl63\",\"text\":\"";
    const rightDesc = "\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}";

    const onChangeHandler = ({files}) => {
        setFileList(files);
    }

    const prevStep = () => {
        setResult(Object.assign(result, descriptionForm.getFieldValue()));
        setStep(step - 1);
    }

    const onFinish = (values) => {
        const text = values.descriptionText.replace(/(\r\n|\n|\r)/gm, "");
        const textEdit = text.replace(/"/gm, '\\"');
        const descJSON = leftDesc + textEdit + rightDesc;
        result.description = saveContent(descJSON);

        if (values.urlLogo && values.urlLogo.file) {
            result.urlLogo = values.urlLogo.file.response;
        }

        if (values.urlBackground && values.urlBackground.file) {
            result.urlBackground = values.urlBackground.file.response;
        }

        if (values.urlGallery) {
            result.urlGallery = values.urlGallery.map(img => ({"url": img.response}));
        }

        updateClubById(result).then(() => {
            setShowing(false);
            reloadAfterChange();
            message.success("Гурток успішно оновлено");
        }).catch(() => {
            message.error("Помилка при оновленні гуртка");
        });
    };

    return (
        <Form
            name="basic"
            form={descriptionForm}
            requiredMark={false}
            onFinish={onFinish}
            onSubmit={e => e.preventDefault()}
            className="description-step">

            <Text style={{fontSize :'19px', color:'GrayText'}}>Логотип</Text>
            <Form.Item name="urlLogo"
                className="add-club-row"
                hasFeedback>
                <Upload
                    name="image"
                    action={UPLOAD_IMAGE_URL}
                    data={{folder: `club/logos`}}
                    accept="image/png,image/jpeg,image/jpg,image/svg"
                    maxCount={1}
                    headers={{ contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                >
                    <span className="add-club-upload"><UploadOutlined className="icon" />Завантажити нове лого</span>
                </Upload>
            </Form.Item>

            <Text style={{fontSize :'19px', color:'GrayText'}}>Обкладинка</Text>
            <Form.Item name="urlBackground"
                className="add-club-row"
                hasFeedback>
                <Upload
                    name="image"
                    action={UPLOAD_IMAGE_URL}
                    data={{folder: `club/backgrounds`}}
                    accept="image/png,image/jpeg,image/jpg,image/svg"
                    maxCount={1}
                    headers={{ contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                >
                    <span className="add-club-upload"><UploadOutlined className="icon" />Завантажити нову обкладинку</span>
                </Upload>
            </Form.Item>

            <Text style={{fontSize :'19px', color:'GrayText'}}>Оновити галерею</Text>
            <Form.Item name="urlGallery"
                className="add-club-row"
                hasFeedback>
                <AddClubGalery onChange={onChangeHandler}/>
            </Form.Item>

            <Text style={{fontSize :'19px', color:'GrayText'}}>Опис</Text>
            <Form.Item
                name="descriptionText"
                className="add-club-row"
                initialValue={getShortContent(result.description).trim()}
                hasFeedback
                rules={[
                    {
                        required: true,
                        pattern: /^[А-Яа-яЇїІіЄєҐґa-zA-Z0-9()!"#$%&'*+\n, ,-.:\r;<=>?|@№_`{}~^\/[\]\\]{40,}$/,
                        message: "Некоректний опис гуртка"
                    },
                    {
                        min: 40,
                        max: 1500,
                        message: "Опис гуртка може містити від 40 до 1500 символів."
                    },
                    {
                        required: false,
                        pattern: /^[^ЁёЪъЫыЭэ]+$/,
                        message: 'Опис гуртка не може містити російські літери'
                    }
                ]}
            >
                <Input.TextArea className="editor-textarea"
                                style={{ height: 200 }} 
                                placeholder="Додайте опис гуртка" />
            </Form.Item>
            <div className="add-club-content-footer">
                <Button ghost={true} className="add-club-content-prev"
                    type="button" onClick={prevStep}>Назад</Button>
                <Button className="flooded-button add-club-content-next"
                    htmlType="submit">Завершити</Button>
            </div>
        </Form>
    )
};

export default DescriptionStep;