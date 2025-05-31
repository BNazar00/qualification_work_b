import { Input, Table, Typography } from "antd";
import React, {useEffect, useState} from "react";
import { getCertificatesByUserName } from "../../service/CertificateService";
import EmptySearch from "../EmptySearch";
import { Link } from "react-router-dom";
import { FilterOutlined } from "@ant-design/icons";
import './css/CertificateSearch.css'

const {Title} = Typography;

const CertificatesSearch = () => {

    const [certificates, setCertificates] = useState([]);

    const {Search} = Input;

    useEffect(() => {

    }, []);

    const onSearch = (value) => {
        if(!value){
            return;
        }
        getCertificatesByUserName({userName:value}).then((response) => {
            setCertificates(response);
        })
    };

    const columns = [
        {
            title: 'Учасник',
            dataIndex: 'userName',
            render: (userName) => userName
        },
        {
            title: 'Електронна пошта',
            dataIndex: 'sendToEmail',
            render: (sendToEmail) => sendToEmail
        },
        {
            title: 'Серійний номер',
            dataIndex: 'serialNumber',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.serialNumber - b.serialNumber,
            render: (serialNumber) => serialNumber != null ? <Link to={'/certificate/' + serialNumber}>{serialNumber}</Link> : "-"
        },
        {
            title: 'Дата видачі',
            dataIndex: 'date',
            render: (text, record) => record.dates.date
        },
        {
            title: 'Тривалість челенджу',
            dataIndex: 'duration',
            render: (text, record) => record.dates.duration
        },
        {
            title: 'Статус видачі',
            dataIndex: 'sendStatus',
            filters: [
                {
                  text: 'Видані сертифікати',
                  value: true,
                },
                {
                  text: 'Не надіслані сертифікати',
                  value: null,
                },
                {
                    text: 'Сертифікати з помилкою при надсиланні',
                    value: false,
                },
            ],
            filterIcon: filtered => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => record.sendStatus == value,
            render: (sendStatus) => sendStatus ? "видано" : sendStatus == null ? "не видано" : "помилка відправки"
        }
    ];

    return (  
        <div className="certificateSearchContent">
            <Title level={3}>Пошук сертифікатів</Title>
            <div className="searchCertificateUser">
                <Search
                    placeholder="Введіть дані людини для пошуку сертифікату"
                    onSearch={onSearch}
                    allowClear
                    style={{
                        width: 250,
                    }}
                />
            </div>
            {certificates.length > 0 ? 
            <Table
                bordered='true'
                dataSource={certificates}
                columns={columns}
                rowClassName="certificateTable"
                pagination={{}}
                size="middle"
                tableLayout="fixed"
                className={"table certificateTable"}
            />:
            
            <Title level={2}>
                Немає даних для відображення
            </Title>
            }
        </div>
    );
}
 
export default CertificatesSearch;