import React, {useEffect, useState} from "react";
import { Table } from 'antd';
import {getAllChallenges} from "../../../service/ChallengeService";

const ChallengesInTasks = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    const getChallenges = () => {
        getAllChallenges().then(response => {
            setChallenges(response);
        });
        setLoading(false);
    };

    useEffect(() => {
        getChallenges();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
        },
        {
            title: 'Порядковий номер',
            dataIndex: 'sortNumber',
            width: '15%',
        },
        {
            title: 'Назва',
            dataIndex: 'name',
            width: '35%',
        },
        {
            title: 'Заголовок',
            dataIndex: 'title',
            width: '35%',
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={challenges} />
        </div>

    )
}

export default ChallengesInTasks;