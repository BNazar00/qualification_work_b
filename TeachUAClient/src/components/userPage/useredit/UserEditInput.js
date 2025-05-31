import React, {useState} from 'react';
import {Button, Form, Input, message, Modal, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import {tokenToHeader, uploadImage} from "../../../service/UploadService";

/*export class PasswordUpdate extends React.Component {

    render() */
export const PasswordUpdate = () => {

    const [isEqual, setEqual] = useState(true);
    const [passwordForm, setPasswordForm] = useState({
        password: "",
        newPassword: ""
    })

    const onChange = e => {
        if (e.target.name === "password")
            passwordForm.password = e.target.value
        console.log(e.target.value)
        if (e.target.id === "confirmPassword")
            passwordForm.newPassword = e.target.value
        if (passwordForm.password != passwordForm.newPassword) {
            console.log(passwordForm.password + " " + passwordForm.newPassword)
            setEqual(false)
        } else {
            console.log(passwordForm.password + " " + passwordForm.newPassword);
            setEqual(true)
        }
    }

    return (
        <div>
            <Form.Item
                name="currentPassword"
                className="user-edit-input"
                // initialValue=""
                hasFeedback
                alert="Необхідне поле"
                rules={[{
                    required: true,
                    message: "Введіть старий пароль",
                    //type:"password"
                    //pattern: /^\S{8,20}$/,

                },
                    {
                        message: 'Невірний пароль',
                    }]}>

                <Input.Password
                    className="user-edit-box"
                    placeholder="Введіть діючий пароль"

                    //value={""}
                />
            </Form.Item>

            <Form.Item
                id="password"
                name="password"
                className="user-edit-input"
                //initialValue=""
                hasFeedback
                alert="Необхідне поле"
                rules={[{
                    required: true,
                    message: 'Будь ласка, введіть новий пароль',
                },
                    {
                        pattern: /^\S{8,20}$/,
                        message: 'Пароль не може бути коротшим, ніж 8 та довшим, ніж 20 символів'

                    },
                    {
                        pattern: /^(?=[a-zA-Z0-9~`!@#$%^&()_=+{}[\]|:;"<>?])(?=.*[a-zA-Z])(?=.*\d)(?=.*[~`!@#$%^&()_=+{}[\]|:;"<>?])[a-zA-Z0-9~`!@#$%^&()_=+{}[\]|:;"<>?]+$/,
                        message: "Пароль повинен містити великі/маленькі літери латинського алфавіту, цифри та спеціальні символи"
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (getFieldValue('currentPassword') != value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('Значення поля ‘Новий пароль’ має відрізнятися від значення поля ‘Старий пароль’'));
                        },

                    }),

                ]}>

                <Input.Password
                    className="user-edit-box"
                    placeholder="Введіть новий пароль"
                    value={""}
                    onChange={onChange}
                />

            </Form.Item>

            <Form.Item

                name="confirmPassword"
                // initialValue=" "
                className="user-edit-input"
                hasFeedback
                alert="Необхідне поле"
                rules={[
                    {
                        required: true,
                        message: 'Будь ласка, підтвердіть пароль',
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if ((!value || getFieldValue('password') === value) && isEqual) {
                                console.log(isEqual)
                                return Promise.resolve();
                            }
                            console.log(isEqual)
                            return Promise.reject(new Error('\'Значення поля ‘Підтвердити новий пароль’ має бути еквівалентним значенню поля ‘Новий пароль’'));
                        },
                    }),

                ]}>
                <Input.Password className="user-edit-box"
                                placeholder="Підтвердіть новий пароль"
                                onChange={onChange}
                />
            </Form.Item>
        </div>)
}

//}

const UserEditInput = (
    {user}) => {
    const [isSelected, setSelection] = useState(false);
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    let prefixSelector = '+38';
    return (
        <div className="user-edit-column">
            <Form.Item name="id"
                       initialValue={user.id}>
            </Form.Item>

            <Form.Item name="lastName"
                       initialValue={user.lastName}
                       className="user-edit-input"
                       label="Прізвище"
                       hasFeedback
                       alert="Необхідне поле"
                       rules={[{
                           required: true,
                           message: "Будь ласка введіть Ваше прізвище",
                       },
                           {
                               required: false,
                               pattern: /^[^0-9]*$/,
                               message: 'Прізвище не може містити цифри',
                           },
                           {
                               required: false,
                               pattern: /^(?=[^-'ʼ\s]).*[^-'ʼ\s]$/,
                               message: 'Прізвище повинно починатися і закінчуватися літерою',
                           },
                           {
                               required: false,
                               pattern: /^[^`~!@₴£№#$%^&*()_+={}\[\]|/\\:;“"<,>.?๐฿]*$/,
                               message: 'Прізвище не може містити спеціальні символи',
                           },
                           {
                               max: 25,
                               message: 'Прізвище не може містити більше, ніж 25 символів',
                           }]}>

                <Input className="user-edit-box"/>

            </Form.Item>
            <Form.Item name="firstName"
                       initialValue={user.firstName}
                       className="user-edit-input"
                       label="Ім'я"
                       hasFeedback
                       rules={[{
                           required: true,
                           message: "Будь ласка введіть Ваше ім'я"
                       },
                           {
                               required: false,
                               pattern: /^[^0-9]*$/,
                               message: 'Ім\'я не може містити цифри',
                           },
                           {
                               required: false,
                               pattern: /^(?=[^-'ʼ\s]).*[^-'ʼ\s]$/,
                               message: 'Ім\'я повинно починатися і закінчуватися літерою',
                           },
                           {
                               required: false,
                               pattern: /^[^`~!@₴£№#$%^&*()_+={}\[\]|/\\:;“"<,>.?๐฿]*$/,
                               message: 'Ім\'я не може містити спеціальні символи',
                           },
                           {
                               max: 25,
                               message: 'Ім\'я не може містити більше, ніж 25 символів',
                           }]}>
                <Input className="user-edit-box"/>
            </Form.Item>

            <Form.Item name="phone"
                       initialValue={user.phone}
                       className="user-edit-input"
                       label="Телефон"
                       hasFeedback
                       rules={[{
                           required: true,
                           message: "Будь ласка введіть Ваш номер телефону"
                       },
                           {
                               required: false,
                               pattern: /^[^A-Za-zА-Яа-яІіЇїЄєҐґ]*$/,
                               message: 'Телефон не може містити літери',
                           },
                           {
                               required: false,
                               pattern: /^[^\s]*$/,
                               message: 'Телефон не може містити пробіли',
                           },
                           {
                               pattern: /^.{10}$/,
                               message: "Телефон не відповідає вказаному формату",
                           },
                           {
                               required: false,
                               pattern: /^[^-/"`~!@#$%^&*()_+={}\[\]|\\\s:;“’'<,>.?๐฿]*$/,
                               message: 'Телефон не може містити спеціальні символи',
                           }]}>
                <Input
                    placeholder="(---) --- -- --"
                    addonBefore={prefixSelector}/>
            </Form.Item>


            <Form.Item name="email"
                       initialValue={user.email}
                       className="user-edit-input"
                       label="Email">
                <Input className="user-edit-box" disabled={true}/>
            </Form.Item>

            <Form.Item name="urlLogo"
                       initialValue={user.urlLogo}
                       className="user-edit-input"
                       label="Фото"
                       tooltip="Приймас зображення формату JPG / PNG із
                                мінімальною роздільною здатністю 200x200 пікселів та
                                максимальним розміром файлу 5МВ"
                       hasFeedback={false}
                       rules={[{
                           required: false,
                           message: "Будь ласка завантажте Логотип"
                       }]}>
                <Upload
                    name="image"
                    action={UPLOAD_IMAGE_URL}
                    // customRequest={uploadImage}
                    maxCount={1}
                    data={{folder: `user/logo/${user.id}`}}
                    headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                    accept="image/png,image/jpeg,image/jpg,image/svg"
                    //showUploadList={false}
                    //beforeUpload={() => false}
                >
                    <span className="add-club-upload"><UploadOutlined className="icon"/>Завантажити фото</span>
                </Upload>
            </Form.Item>

            <div>
                <div className={"align-checkbox"}>
                    <input name="checkbox"
                           type="checkbox"
                           className="checkbox"
                           checked={isSelected}
                           onClick={() => {
                               setSelection(!isSelected);
                           }}/>
                    <text className="checkbox-label-interval">Змінити пароль</text>
                </div>
            </div>

            <div>
                <p></p>
            </div>

            {isSelected ? <PasswordUpdate isSelected={isSelected}/> : ""}


            <div className="user-edit-footer">
                <Button className="submit-button"
                        htmlType="submit">
                    Зберегти зміни
                </Button>
            </div>

            <div>
                <p></p>
            </div>

        </div>

    )
};

export default UserEditInput;

