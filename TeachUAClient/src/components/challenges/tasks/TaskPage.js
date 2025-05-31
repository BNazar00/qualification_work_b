import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {getTaskProfile} from "../../../service/ChallengeService";
import {BrowserRouter} from "react-router-dom";
import TaskContent from "./TaskContent";
import {Layout, Result} from "antd";
import "../css/ChallengeTaskPage.css"

const TaskPage = () => {
    const params = useParams();
    const [task, setTask] = useState({
        id: 0,
        name: "",
        headerText: "",
        description: "",
        picture: ""
    });

    useEffect(() => {
        getTaskProfile(params.taskId).then((response) => {
            if (response.status > 400) {
                setTask(undefined);
            } else {
                window.scrollTo(0, 0);
                setTask(response);
            }
        });
    }, []);


    return (
        <Layout className="challenge-task-page">
            {task ?
                <BrowserRouter>
                    <TaskContent task={task}/>
                </BrowserRouter>
                :
                <Result
                    className="task-not-found"
                    status="404"
                    title="404"
                    subTitle="Завдання яке ви намагаєтесь відкрити не існує або у вас немає до нього доступу"
                />}

        </Layout>
    );
}

export default TaskPage;