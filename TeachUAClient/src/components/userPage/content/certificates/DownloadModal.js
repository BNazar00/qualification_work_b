import { Modal, Spin } from "antd";

const DownloadModal = ({isModalShown}) => {
    return (
        <Modal 
            title="Завантаження..." 
            centered={true} 
            closable={false} 
            footer={null} 
            open={isModalShown}
            className="download-modal"
        >
            <Spin size="large"/>
        </Modal>
    );
};

export default DownloadModal;