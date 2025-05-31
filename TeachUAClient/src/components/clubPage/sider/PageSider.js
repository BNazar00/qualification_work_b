import React from "react";
import './css/PageSider.css';
import PropTypes from 'prop-types';
import Sider from "antd/es/layout/Sider";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import {getSimilarClubsByCategoryName} from "../../../service/ClubService";
import ContactsInfoUtil from "../../../util/ContactsInfoUtil";
import SimilarClubs from "./SimilarClubs";
import ClubLocation from "./ClubLocaton";

class PageSider extends React.Component {
    state = {
        similarClubs: []
    };

    getData = () => {
        const categoriesName = Array.from(this.props.club.categories, category => category.name);

        getSimilarClubsByCategoryName(this.props.club.id, categoriesName, this.props.cityName).then(response => {
            this.setState({similarClubs: response});
        });

    };

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getData();
    }

    componentDidUpdate(preProps) {
        if (preProps.club.id !== this.props.club.id) {
            this.getData();
        }
    }

    checkLocation = (locations) => {
        for (var i = 0; i < locations.length; ++i) {
            if (locations[i].latitude == null || locations[i].longitude == null) {
                return false;
            }
        }

        if (locations.length === 0) {
            return false;
        }

        return true;
    }

    render() {
        return (
            <Sider className="page-sider" width={364}>
                {this.props.club.locations.length === 0 ?
                    <div className="address">
                        <EnvironmentFilled
                            className="address-icon"/>
                        <span className="text">Онлайн</span>
                    </div>
                    :
                    this.props.club.locations.map(location =>
                        <div className="address">
                            <EnvironmentFilled className="address-icon"/>
                            <span className="text"> {location.address}</span>
                            <br></br>
                        </div>
                    )
                }
                { this.checkLocation(this.props.club.locations) &&
                    <div className="map"> 
                        <ClubLocation locations={this.props.club.locations}/>
                    </div>
                 }
                <div className="age">
                    <span className="sider-label">Вік аудиторії: </span>
                    <span className="years">від {this.props.club.ageFrom} до {this.props.club.ageTo} років</span>
                </div>
                {this.props.club.center &&
                <div className="center">
                    <span className="sider-label">Центр розвитку: </span>
                    <span className="name">{this.props.club.center.name}</span>
                </div>}
                <ContactsInfoUtil label="Зв’яжіться з гуртком" contacts={this.props.club.contacts} />
                <SimilarClubs cityName={this.props.cityName} similarClubs={this.state.similarClubs}/>
            </Sider>
        )
    }
}

PageSider.propTypes = {
    club: PropTypes.object.isRequired
};

export default PageSider;