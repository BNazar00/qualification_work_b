import React, {useRef} from "react";
import PropTypes from 'prop-types';
import {Content} from "antd/es/layout/layout";
import {Button, Form} from "antd";
import marathonDay from "../DayData/DataObjects";
import '../css/TaskPage.css';
import '../DayData/DataObjects'

const TaskContent = () => {

    const path = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];
    const data = marathonDay.marathonDay.find(value => value.pathUrl === path);

    return (
        <Content className="page-task-content">
            <div className="task-image-par">
                <img className="task-image"
                     src={`${process.env.PUBLIC_URL}`+`/static/images/marathon/challengeUA.jpg`}
                />
                <div className="header-content">
                    <div className="task-header">
                        {data.name}
                    </div>

                    <div className="task-subheader">
                        {data.subheader}
                    </div>
                    <div className="task-text">
                        <div className="innerHTML-from-js" dangerouslySetInnerHTML={{__html: `${data.text}`}}/>
                    </div>
                </div>
            </div>
            <div className="task-content">
                <div className="task-text">
                    <div className="innerHTML-from-js" dangerouslySetInnerHTML={{__html: `${data.text2}`}}/>
                </div>
                <div className="task-task-header">
                    {data.taskTitle}
                </div>

                <div className="task-info">
                    <div className="innerHTML-from-js" dangerouslySetInnerHTML={{__html: `${data.task}`}}/>
                </div>

            </div>

            <div className="full-width button-box">
            </div>
        </Content>


    )
};

TaskContent.propTypes = {
    task: PropTypes.object.isRequired
};


export default TaskContent;