import {Button, Layout, Result} from "antd";
import {Router, useLocation, withRouter} from 'react-router-dom';
import React from "react";
import {useEffect} from "react";
import TaskContent from "./TaskContent";
import {BrowserRouter} from "react-router-dom";

const ScrollToTop =({children})=>{
    const {pathname}=useLocation();
    useEffect(()=>{
        window.scrollTo(0,0);},[pathname]);
    return children || null;
};



class TaskPage extends React.Component {
    state = {
        task: {}
    };



    render() {
        return (

            <Layout className="marathon-task-page">
                <BrowserRouter>
                    <ScrollToTop>
                <TaskContent task={this.state.task}/>
                    </ScrollToTop>
                </BrowserRouter>
            </Layout>

        )
    }
}

export default withRouter(TaskPage);