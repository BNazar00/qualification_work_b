import React from 'react';
import "../comments/css/CommentEditComponent.less";
import classes from "./css/ModalHint.module.css";
import Modal from "antd/es/modal/Modal";

const ModalHint = ({children, visible, setVisible}) => {
    return (
            <Modal
                className={classes.modalHint}
                centered
                width={521}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <span className={classes.title}>{children}</span>
            </Modal>
    );
};

export default ModalHint;