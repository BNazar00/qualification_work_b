import React, {useEffect, useState} from "react";
import { useParams, useHistory } from "react-router-dom";

import { Button, Typography, Modal, Popconfirm, Space, Table, message } from "antd";

import './css/FileList.css';

/*
 * Component FileList
 *
 * params:
 *  getFiles - function to get file list, accepts a single or no arguments: root path; depending on value of usePath.
 *  onFileRead - function to get file content, accepts a single argument: file path
 *  onDelete - function to delete file, accepts a single argument: file path
 *  onDownload - function to download file, accepts a single argument: file path
 *  usePath - boolean argument, if true means that you can navigate folders using getFiles function. Folders must end with '/' to be navigated
 *  allowedDeleteRoot - string argument, marks files deletable if they are located in this folder or its subfolders, is ignored when usePath is false
 *
*/
export const FileList = ({getFiles, onFileRead, onDelete, onDownload, usePath, allowedDeleteRoot}) => {

    const [files, setFiles] = useState([]);
    const [file, setFile] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { path = '.' } = useParams();
    const history = useHistory();

    const getData = () => {
        getFiles(path).then(response => {
            setFiles(response.data);
            console.log(response.data);
        });
        console.log(files);
    }

    const fileIsFolder = (fileName) => {
        return fileName.endsWith('/');
    }

    const canDelete = (fileName) => {
        return (!usePath || path.startsWith(allowedDeleteRoot)) && !fileIsFolder(fileName);
    }

    const formFilePath = (fileName) => {
        return path + '/' + fileName;
    }

    const deleteFile = (fileName) => {
        deleteFileRequest(fileName).then(response => {
            message.success('Файл видалено');
            getData();
        });
    }

    const readFileRequest = (fileName) => {
        if (usePath) {
            return onFileRead(formFilePath(fileName));
        }
        return onFileRead(fileName);
    }

    const deleteFileRequest = (fileName) => {
        if (usePath) {
            return onDelete(formFilePath(fileName));
        }
        return onDelete(fileName);
    }

    const downloadFileRequest = (fileName) => {
        if (usePath) {
            return onDownload(formFilePath(fileName));
        }
        return onDownload(fileName);
    }

    const open = (fileName) => {
        if (fileIsFolder(fileName)) {
            history.push(history.location.pathname + '/' + fileName.substring(0, fileName.length - 1));
            return;
        }
        showModal(fileName);

    }

    const showModal = (fileName) => {
        setIsModalOpen(true);
        readFileRequest(fileName).then(response => {
            setFile(response.data);
        });
    }

    const setShowing = () => {
        setIsModalOpen(false);
    }

    const dataSource = files.map((file, index) => ({ key: index, fileName: file }));

    const columns = [
        {
            title: 'Назва Файлу',
            dataIndex: 'fileName',
            key: 'fileName',
        },
        {
            title: 'Дія',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => open(record.fileName)}>
                        Переглянути
                    </Button>
                    
                    {!fileIsFolder(record.fileName) &&
                    <>
                        <Button onClick={() => downloadFileRequest(record.fileName)} disabled={fileIsFolder(record.fileName)}>
                            Скачати
                        </Button>
                    </>}
                    {canDelete(record.fileName) &&
                    <>
                        <Popconfirm 
                            title="Видалити файл?" 
                            onConfirm={() => deleteFile(record.fileName)}
                            disabled={!canDelete(record.fileName)}
                            cancelText="Ні"
                            okText="Так"
                            okButtonProps={<Button />}
                        >
                            <Button danger={true} disabled={!canDelete(record.fileName)}>Видалити</Button>
                        </Popconfirm>
                    </>}
                </Space>
            ),
        },
    ]

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        getData();
    }, [path])

    return (
        <div className="filesContent">
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ hideOnSinglePage: true }}
            />
            <Modal
                open={isModalOpen}
                title="Файл"
                onOk={() => setShowing(false)}
                onCancel={() => setShowing(false)}
            >
            <Typography.Paragraph> {file} </Typography.Paragraph>
            </Modal>
        </div>
    )
}
