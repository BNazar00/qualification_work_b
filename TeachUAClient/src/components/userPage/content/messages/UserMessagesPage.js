import React, { useEffect, useState } from 'react';
import { Content } from "antd/es/layout/layout";
import { getUserId } from "../../../../service/StorageService";
import "./css/UserMessagesPage.less";
import { getMessagesByRecipientId } from "../../../../service/MessageService";
import Message from "./Message";
import { List } from 'antd';

const UserMessagesPage = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessagesByRecipientId(getUserId()).then(response => setMessages(response));
    }, []);

    return (
        <Content className="messagesContent">

            <div className="contentBox">

                <div className="contentTitle">
                    Мої повідомлення
                </div>

                <div className="messages">

                    <List
                        className="certificates"
                        itemLayout="horizontal"
                        split={false}
                        locale={{
                            emptyText: <div className="noMessages">Повідомлень немає</div>
                        }}
                        dataSource={messages}
                        pagination={{ hideOnSinglePage: true, defaultPageSize: 4, className: "user-content-pagination" }}
                        renderItem={(message) => (
                            <Message message={message} key={message.id} />
                        )}
                    />
                </div>
            </div>
        </Content>
    );
};

export default UserMessagesPage;