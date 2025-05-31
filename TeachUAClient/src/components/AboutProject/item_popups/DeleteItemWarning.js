import React, { useState } from 'react';
import {Button, Layout, message, Modal, Tooltip} from 'antd';
import { mapSearchParameters, searchParameters} from "../../../context/SearchContext";
import {deleteItem} from "../../../service/AboutUsService";

const AddItemComponent = ({ visible, setVisible, item}) => {

    const closePopup = () => {
        setVisible(false);
    };


    return (
        <Modal
            centered
            visible={visible}
            onOk={() => closePopup()}
            onCancel={() => closePopup()}
            footer={null}
        >
            <Layout className="aboutProject global-padding">
                <div className="row">
                <span className="delete-text">
                    Після видалення компонент повернути буде не можливо
                </span>
                </div>
                <div className="row">
                <div className="add-item-button">
                    <Button className="flooded-button donate-button"
                            onClick={() => {
                                deleteItem(item.id).then(response => {
                                    if (response.status) {
                                        message.warning(response.message);
                                        return;
                                    }
                                    message.success(`Компонент успішно видалено`);
                                });
                                closePopup();
                            }}>
                        Так, підтвердити
                    </Button>
                </div>
                </div>
            </Layout>
        </Modal>
    )
}

export default AddItemComponent;