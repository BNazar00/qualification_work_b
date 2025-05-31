import React from "react";
import PropTypes from 'prop-types';
import {Content} from "antd/es/layout/layout";
import './css/PageContentCenter.css';
import {Button} from "antd";
import {convertToHtml} from "../../editor/EditorConverter";
import {getClubReport} from "../../../service/ClubService";
import {FilePdfOutlined} from "@ant-design/icons";
import {getCenterReport} from "../../../service/CenterService";

const CenterPageContent = ({ center, loading }) => {

    return (
        <Content className="page-content">
            {!center ?
                <div className="content">У цього центру опису немає...</div>
                :
                loading ? <div className="empty-block"/> :
                    <div className="content" >
                        {center.description}
                    </div>}
            <div className="full-width button-box">
                <Button onClick={() => getCenterReport(center.id, center.name)} className="outlined-button details-button">
                    Завантажити
                    <FilePdfOutlined/>
                </Button>
            </div>
        </Content>

    )
};

CenterPageContent.propTypes = {
  //center: PropTypes.object.isRequired
};

export default CenterPageContent;
