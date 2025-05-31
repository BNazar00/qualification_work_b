import {Button, Layout, Result} from "antd";
import {Router, useLocation, withRouter} from 'react-router-dom';
import React from "react";
import {useEffect} from "react";
import MarathonTaskContent from "./MarathonTaskContent";
import {BrowserRouter} from "react-router-dom";

const ScrollToTop =({children})=>{
    const {pathname}=useLocation();
    useEffect(()=>{
        window.scrollTo(0,0);},[pathname]);
    return children || null;
};



class MarathonTaskPage extends React.Component {
    state = {
        task: {}
    };



    render() {
        return (

            <Layout className="marathon-task-page">
                <BrowserRouter>
                    <ScrollToTop>
                <MarathonTaskContent task={this.state.task}/>
                    </ScrollToTop>
                </BrowserRouter>
            </Layout>

        )
    }
}

export default withRouter(MarathonTaskPage);