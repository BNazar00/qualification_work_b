import {Button, Layout, Result} from "antd";
import {withRouter} from 'react-router-dom';
import React from "react";
import PageHeader from "./header/PageHeader";
import PageContent from "./content/PageContent";
import PageSider from "./sider/PageSider";
import {getClubById} from "../../service/ClubService";
import Loader from "../Loader";
import './css/ClubPage.css';
import PageComments from "./comments/PageComments";
import {getFeedbackListByClubId} from "../../service/FeedbackService";
import {searchParameters} from "../../context/SearchContext";

class ClubPage extends React.Component {
    state = {
        club: {},
        cityName: "",
        feedback: [],
        clubNotFound: false,
    };

    getData = () => {
        const clubId = this.props.match.params.id;

        getClubById(clubId).then(response => {
            this.setState({club: response});
            if (response.status) {
                this.setState({clubNotFound: true});
            }
        });
        getFeedbackListByClubId(clubId).then(response => {
            this.setState({feedback: response});
        });
    };

    componentDidMount() {
        this.setState({cityName: searchParameters.cityName});
        this.getData();
    }

    componentDidUpdate(preProps) {
        if (preProps.match.params.id !== this.props.match.params.id) {
            this.getData();
        }
    }

    render() {
        return this.state.clubNotFound ?
            <Result
                className="club-not-found"
                status="404"
                title="404"
                subTitle="Клуб який ви намагаєтесь відкрити не існує"
            /> :
            !this.state.club.categories ? <Loader/> : (
                <Layout className="global-padding">
                    <PageHeader club={this.state.club}/>
                    <Layout className="club-page" style={{padding: 40, background: 'white'}}>
                        <PageContent club={this.state.club} feedbackCount={this.state.feedback.length}/>
                        <PageSider cityName={this.state.cityName} club={this.state.club}/>
                    </Layout>
                    <PageComments feedback={this.state.feedback} feedbackAdded={this.getData}
                                  club={this.state.club}/>
                </Layout>)
    }
}

export default withRouter(ClubPage);