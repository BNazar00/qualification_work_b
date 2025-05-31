import PropTypes from "prop-types";
import ClubListItem from "./ClubListItem";
import ClubListRectangleItem from "./ClubListRectangleItem";
import React, {useState} from "react";
import ClubListItemInfo from "./ClubListItemInfo";
import ClubListControl from "./ClubListControl";
import ClubListEmptySearch from "./ClubListEmptySearch";
import {Layout, Pagination} from "antd";


const {Content} = Layout;

const ClubsListDisplayContent = ({
                                     clubs, reloadAfterChange, view, setView, loading, advancedSearch, currentPage,
                                     onPageChange, setSortBy, sortDirection, setSortDirection, sortBy
                                 }) => {

    const [clubInfoVisible, setClubInfoVisible] = useState(false);
    const [clickedClub, setClickedClub] = useState(null);

    const onClubClick = (club) => {
        setClickedClub(club);
        setClubInfoVisible(true);
    };

    return (
        <Content className="club-list-content"
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
                             centerIsChecked={false}/>}

            {!loading && clubs.content.length === 0 ? <ClubListEmptySearch/> :
                !advancedSearch ?
                    <div className="content-clubs-list content-clubs-block">
                        {clubs.content.map((club, index) =>
                            <ClubListItem club={club} key={index} onClubClick={onClubClick}/>)}
                    </div> :
                    <div className={`content-clubs-list ${view === 'BLOCK' && "content-clubs-block"}`}>
                        {clubs.content.map((club, index) =>
                            view === 'BLOCK' ?
                                <ClubListItem club={club} key={index} onClubClick={onClubClick} page={currentPage}/>
                                :
                                <ClubListRectangleItem club={club} key={index} onClubClick={onClubClick}/>)}
                    </div>
            }

            {clickedClub &&
            <ClubListItemInfo visible={clubInfoVisible} setVisible={setClubInfoVisible}
                              club={clickedClub} reloadAfterChange={reloadAfterChange} />}

            <Pagination className="pagination"
                        hideOnSinglePage
                        showSizeChanger={false}
                        onChange={onPageChange}
                        current={currentPage + 1}
                        pageSize={clubs.size}
                        total={clubs.totalElements}/>

        </Content>
    );

};
ClubsListDisplayContent.propTypes = {
    clubs: PropTypes.object.isRequired,
    view: PropTypes.string.isRequired
};

export default ClubsListDisplayContent;