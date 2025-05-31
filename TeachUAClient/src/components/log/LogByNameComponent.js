import React, {useEffect, useState} from 'react';
import {Divider, List, Button} from 'antd';
import {getLogByName} from "../../service/LogService";
import {useParams, useHistory} from 'react-router-dom';

const LogByNameComponent = () => {

    const [log, setLog] = useState([]);

    const params = useParams();

    let history = useHistory();

    const getData = () => {
        getLogByName(params.id).then(response => setLog(response.data));
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
                <Divider orientation="center">LOGS FROM {params.id}</Divider>
            <div>
                <Button className="back-button" onClick={() => history.goBack()}>Back to Logs</Button>
            </div>
            <List
                bordered
                dataSource={log}
                renderItem={item => (
                    <List.Item>
                        <p>{item}</p>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default LogByNameComponent;