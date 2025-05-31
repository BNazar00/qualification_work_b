import { Upload, Modal } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {tokenToHeader} from "../../service/UploadService";
import {UPLOAD_IMAGE_URL} from "../../service/config/ApiConfig";


const AddClubGalery = ({ onChange }) => {
    
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList }) => {
        setFileList(fileList);
        onChange(fileList);
    }

    const uploadButton = (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Додати</div>
        </div>
    );

    return (
        <>
            <Upload
                name="image"
                action={UPLOAD_IMAGE_URL}
                data={{folder: `club/galleries`}}
                accept="image/png,image/jpeg,image/jpg,image/svg"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                headers={{ contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
            >
                {fileList.length >= 5 ? null : uploadButton}
            </Upload>

            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
      </>
    );
}

export default AddClubGalery;