import {Button, Form, Input, message, Upload} from "antd";
import {addBannerItem} from "../../../service/BannerItemService";
import {addToTable} from "../../../util/TableUtil";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import {UploadOutlined} from "@ant-design/icons";
import "./css/AddBannerItem.css";
import TextArea from "antd/es/input/TextArea";
import {tokenToHeader} from "../../../service/UploadService";

const AddBannerItem = ({bannerItems, setBannerItems}) => {
    const [bannerItemForm] = Form.useForm();

    const onFinish = (values) => {
        addBannerItem(values)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message)
                    return;
                }

                message.success(`Банер з id = ${response.id} успішно додано`)

                setBannerItems(addToTable(bannerItems, response));
                bannerItemForm.resetFields();
            });
    };

    return (
        <div className="add-banner-item">
            <Form className="add-banner-item-form"
                  name="basic"
                  requiredMark={false}
                  onFinish={onFinish}
                  form={bannerItemForm}>
                <Form.Item name="title"
                           rules={[{
                               required: true,
                               message: "Введіть заголовок"
                           },
                               {
                                   required: false,
                                   pattern: /^[А-Яа-яЇїІіЄєҐґa-zA-Z0-9()!"#$%&'*+\n, ,-.:\r;<=>?|@№_`{}~^\/[\]\\]{0,}$/,
                                   message: "Некоректний ввід заголовока"
                               },
                               {
                                   min: 5,
                                   max: 150,
                                   message: "Заголовок може містити від 5 до 150 символів."
                               },
                               {
                                   required: false,
                                   pattern: /^[^ЁёЪъЫыЭэ]+$/,
                                   message: 'Заголовок не може містити російські літери'
                               }
                           ]}>
                    <TextArea className="add-banner-item-type-input"
                           placeholder="Заголовок">
                    </TextArea>
                </Form.Item>
                <Form.Item name="subtitle"
                           rules={[{
                               required: false,
                           },
                               {
                                   required: false,
                                   pattern: /^[А-Яа-яЇїІіЄєҐґa-zA-Z0-9()!"#$%&'*+\n, ,-.:\r;<=>?|@№_`{}~^\/[\]\\]{0,}$/,
                                   message: "Некоректний ввід опису"
                               },
                               {
                                   min: 5,
                                   max: 250,
                                   message: "Опис може містити від 5 до 250 символів."
                               },
                               {
                                   required: false,
                                   pattern: /^[^ЁёЪъЫыЭэ]+$/,
                                   message: 'Опис не може містити російські літери'
                               }]}>
                    <TextArea className="add-banner-item-type-input"
                           placeholder="Опис">
                    </TextArea>
                </Form.Item>
                <Form.Item name="link"
                           rules={[{
                               required: false,
                           }
                           ]}>
                    <Input className="add-banner-item-type-input"
                           placeholder="Посилання">
                    </Input>
                </Form.Item>
                <Form.Item name="sequenceNumber"
                           rules={[{
                               required: true,
                               message: "Введіть порядковий номер"
                           },
                               {
                                   required: false,
                                   pattern: /^[-0-9]*$/,
                                   message: "Поле може містити лише цифри"
                               }]}>
                    <Input className="add-banner-item-type-input"
                           placeholder="Порядковий номер">
                    </Input>
                </Form.Item>
                <div className="upload-and-submit">

                    <Form.Item className="upload-banner-image"
                               name="picture"
                               rules={[{
                                   required: true,
                                   message: "Завантажте зображення"
                               }]}>
                        <Upload name="image"
                                action={UPLOAD_IMAGE_URL}
                                maxCount={1}
                                accept="image/*"
                                data={{folder: `banners`}}
                                headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}>
                            <span className="add-banner-item-upload"><UploadOutlined
                                className="icon"/>Завантажити</span>
                        </Upload>
                    </Form.Item>
                    <Button htmlType="submit" className="flooded-button add-banner-item-button">Добавити банер</Button>
                </div>
            </Form>
        </div>
    );

};

export default AddBannerItem;
