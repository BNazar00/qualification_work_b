import React from "react";
import {Content} from "antd/es/layout/layout";
import {BASE_URL} from "../../../service/config/ApiConfig";

const TaskContent = ({task}) => {

    return (
        <Content className="page-task-content">
            <div className="task-image-par">
                <img className="task-image"
                     src={BASE_URL + task.picture}
                />
                <div className="header-content">
                    <div className="task-header">
                        {task.name}
                    </div>

                    <div className="task-text">
                        <div className="innerHTML-from-js" dangerouslySetInnerHTML={{__html: `${task.headerText}`}}/>
                    </div>
                </div>
            </div>
            {task.description &&
            <div className="task-content">
                <div className="task-text">
                    <div className="innerHTML-from-js" dangerouslySetInnerHTML={{__html: `${task.description}`}}/>
                </div>
            </div>
            }
            <div className="full-width button-box"/>
        </Content>
    );
};

export default TaskContent;