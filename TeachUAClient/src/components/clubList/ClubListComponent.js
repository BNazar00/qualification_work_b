import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "antd";
import ClubList from "./ClubList";
import "../map/css/MapModal.css";
import MapComponent from "../map/MapComponent";
import ClubListHeader from "./ClubListHeader";
import { getClubsByCategoryAndCity } from "../../service/ClubService";
import Loader from "../Loader";
import MainInformationStep from "../addClub/steps/MainInformationStep";
import ContactsStep from "../addClub/steps/ContactsStep";
import DescriptionStep from "../addClub/steps/DescriptionStep";

const ClubListComponent = () => {
    const DEFAULT_SORT_BY = "name";
    const DEFAULT_SORT_DIRECTION = "asc";
    const DEFAULT_SORT_VIEW = "BLOCK";

    const [loading, setLoading] = useState(false);
    const [mapVisible, setMapVisible] = useState(false);
    const [advancedSearch, setAdvancedSearch] = useState(false);
    const [activeCategory, setCategoryActive] = useState();
    const location = useLocation();
    const [showHideMenu, setShowHideMenu] = useState(true);

    useEffect(() => {
        if (typeof location.state !== "undefined") {
            setAdvancedSearch(location.state.showAdvancedSearch);
            setCategoryActive(location.state.showActiveCategory);
        }
    }, [location]);


    return loading ? (
        <Loader />
    ) : (
        <Layout>
            <ClubListHeader
                setAdvancedSearch={setAdvancedSearch}
                advancedSearch={advancedSearch}
                showHideMenu={showHideMenu}
                setShowHideMenu={setShowHideMenu}
            />
            <ClubList
                loading={loading}
                load={setLoading}
                showHideMenu={showHideMenu}
                setShowHideMenu={setShowHideMenu}
                advancedSearch={advancedSearch}
                defaultSortBy={DEFAULT_SORT_BY}
                defaultSortDir={DEFAULT_SORT_DIRECTION}
                defaultSortView={DEFAULT_SORT_VIEW}
            />
            <MapComponent visible={mapVisible} setVisible={setMapVisible} />
        </Layout>
    );
};

export default ClubListComponent;
