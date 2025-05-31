import React, { useEffect, useState } from 'react'
import {
    getAllLogs,
    getLogByName,
    deleteLogByName,
    downloadLogByName,
} from '../../service/LogService'
import './css/LogComponent.css'
import {
    Button,
    Divider,
    Input,
    List,
    message,
    Modal,
    Space,
    Table,
} from 'antd'

const LogComponent = () => {
    const [log, setLog] = useState([])
    const [logs, setLogs] = useState([])
    const [searchQuery, setSearchQuery] = useState('teachualogs-')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { Search } = Input

    const getData = () => {
        getAllLogs().then((response) => setLogs(response.data))
    }

    const success = (fileName) => {
        message.success(`File ${fileName} removed successfully`)
    }

    const error = (fileName) => {
        message.error(`Cannot delete file: ${fileName}`)
    }

    const deleteLog = ({ fileName }) => {
        deleteLogByName(fileName)
            .then(() => {
                success(fileName)
                getData()
            })
            .catch(() => {
                error(fileName)
                getData()
            })
    }

    const showModal = ({ fileName }) => {
        setIsModalOpen(true)
        getLogByName(fileName).then((response) => setLog(response.data))
    }

    const setShowing = () => {
        setIsModalOpen(false)
    }

    const onSearch = (value) => setSearchQuery(value)

    const dataSource = logs
        .filter((el) => el.includes(searchQuery))
        .map((log, index) => ({
            number: index + 1,
            fileName: log,
        }))

    const columns = [
        {
            title: '#',
            dataIndex: 'number',
            key: 'number',
            width: 75,
        },
        {
            title: 'File name',
            dataIndex: 'fileName',
            key: 'fileName',
            width: 400,
        },
        {
            title: 'Action',
            key: 'action',
            width: 200,
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        className="orange-btn"
                        onClick={() => showModal(record)}
                    >
                        View
                    </Button>
                    <Button
                        className="orange-btn"
                        onClick={() => downloadLogByName(record)}
                    >
                        Download
                    </Button>
                    <Button
                        className="orange-btn"
                        onClick={() => deleteLog(record)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ]

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Divider />
            <Space
                direction="horizontal"
                style={{ width: '100%', justifyContent: 'center' }}
            >
                <Search
                    allowClear
                    defaultValue={searchQuery}
                    onSearch={onSearch}
                    placeholder="input search file name"
                    style={{
                        width: 304,
                    }}
                />
            </Space>
            <Space
                direction="horizontal"
                style={{ width: '100%', justifyContent: 'center' }}
            >
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ hideOnSinglePage: true }}
                    title={() => 'List of logs'}
                />
                <Modal
                    open={isModalOpen}
                    title="Log"
                    onOk={() => setShowing(false)}
                    onCancel={() => setShowing(false)}
                    width={1100}
                    footer={null}
                >
                    <List
                        size="small"
                        bordered
                        dataSource={log}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                </Modal>
            </Space>
            <Divider />
        </>
    )
}

export default LogComponent
