import { Layout, Result} from "antd";
import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import CenterPageHeader from "./header/CenterPageHeader";
import CenterPageSider from "./sider/CenterPageSider";
import {searchParameters} from "../../context/SearchContext";
import {getCenterById} from "../../service/CenterService";
import CenterPageContent from "./content/CenterPageContent";
import Loader from "../Loader";
import ClubsOfCenter from "./clubsOfCenter/ClubsOfCenter";
import './css/CenterPage.css';

const CenterPage = () => {

    const [cityName, setCityName] = useState(searchParameters.cityName);
    const [centerNotFound, setCenterNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [center, setCenter] = useState({});
    const [club, setClickedClub]  = useState(false);
    const [clubInfoVisible, setClubInfoVisible] = useState(false);

    const centerId  = useParams();
    const clubsPerPage = 3; // size of pagination

    const getData = () => {
            getCenterById(centerId.id).then(response => {

                setCenter(response);
            }).catch(response => {
                if(response.status === 404){
                    setCenterNotFound(true);
                }
            });
        setLoading(false);
    };

    useEffect(() =>  {
        getData();
    }, []);

        return (
            !center.clubs ? <Loader/> :
                (
                <Layout className="global-padding">

                    <CenterPageHeader center={center}/>
                    <Layout
                        className="center-page"
                        style={{padding: 40, background: "white"}}
                    >
                        <CenterPageContent center={center} loading={loading}/>

                        <CenterPageSider cityName={cityName} center={center}/>

                    </Layout>
                    <Layout className="clubs-of-center">

                        <ClubsOfCenter centerId={centerId.id}
                                       clubs={center.clubs}
                                       clubsPerPage={clubsPerPage}
                                       setClickedClub={setClickedClub}
                                       setClubInfoVisible={setClubInfoVisible} 
                                       key={centerId.id}/>

                    </Layout>
                </Layout>
            )
        );
}

export default CenterPage;