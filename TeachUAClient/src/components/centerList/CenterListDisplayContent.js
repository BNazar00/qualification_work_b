import PropTypes from "prop-types";
import ClubListEmptySearch from "../clubList/ClubListEmptySearch";
import { Layout, Pagination } from "antd";
import React, {useEffect, useState} from "react";
import CenterListItem from "./CenterListItem";
import CenterListRectangleItem from "./CenterListRectangleItem";
import "./css/CenterList.less"
import Loader from "../Loader";
import ClubListControl from "../clubList/ClubListControl";
import CenterListItemInfo from "./CenterListItemInfo";


const CenterListDisplayContent = ({centers,loading, view, setView, advancedSearch, currentPage, onPageChange,
                                      setSortBy, sortDirection, setSortDirection, sortBy}) => {

    const [centerInfoVisible, setCenterInfoVisible] = useState(false);
    const [clickedCenter, setClickedCenter] = useState(null);
    const [localCenters, setLocalCenters ] = useState(null);

    useEffect(() => {
        if(centers === undefined || centers === null){
            setLocalCenters([]);
        }else{
            setLocalCenters(centers);
        }
    },[]);

    const onCenterClick = (center) =>{
        setClickedCenter(center);
        setCenterInfoVisible(true);
    }

    return (
        !centers ? <Loader/> :
        <Layout className="center-list-content"
                     style={{
                         maxWidth: advancedSearch ? '944px' : '1264px',
                     }}>

            {advancedSearch &&
            <ClubListControl setSortBy={setSortBy}
                             setSortDirection={setSortDirection}
                             sortBy={sortBy}
                             view={view}
                             sortDirection={sortDirection}
                             setView={setView}
                             centerIsChecked={true}/>}

            {!loading && centers.content?.length === 0 ? <ClubListEmptySearch /> :

                        <div className={`content-center-list ${view === 'BLOCK' && "content-center-block"}`}>
                            {centers.content.map((center) =>
                                view === 'BLOCK' ?
                                    <CenterListItem center={center} key={center.id} onCenterClick={onCenterClick} />
                                    :
                                    <CenterListRectangleItem center={center} key={center.id} onCenterClick={onCenterClick} />)}
                        </div>
                    }

                    {clickedCenter &&
                    <CenterListItemInfo visible={centerInfoVisible} setVisible={setCenterInfoVisible}
                                      center={clickedCenter} />}

                    <Pagination className="pagination"
                                hideOnSinglePage
                                showSizeChanger={false}
                                onChange={onPageChange}
                                current={currentPage + 1}
                                pageSize={centers.size}
                                total={centers.totalElements}
                    />
        </Layout>

    );
};

CenterListDisplayContent.propTypes = {
    centers: PropTypes.object.isRequired,
    view: PropTypes.string.isRequired
};

export default CenterListDisplayContent;