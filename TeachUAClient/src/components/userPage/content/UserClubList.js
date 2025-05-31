import {Layout, Pagination, Space} from "antd";
import React, {useEffect, useState} from "react";
import {getClubsByUserId} from "../../../service/ClubService";
import Loader from "../../Loader";
import {withRouter} from "react-router-dom";
import UserClubCardItem from "./UserClubCardItem";
import './css/UserClub.less';


const UserClubList = ({load, setLoad, match}) => {
    const [clubs, setClubs] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });

    const [page, setPage] = useState(0);

    const getData = (currPage) => {
        setLoad(true);
        let userId = match.params.id;

        getClubsByUserId(userId, currPage).then(response => {
            setClubs(response);
            setLoad(false);
        });
    };


    useEffect(() => {
        getData(page);
    }, []);

    const reloadAfterChange = () => {
        onPageChange(page + 1);
    };

    const onPageChange = (currPage) => {
        setPage(currPage - 1);
        getData(currPage - 1);
    };


    return load ? <Loader/> : (
        <div className="test">
            <Layout className="user-clubs">
                <Space wrap className="cards" size={[0, 0]}>
                    {clubs.content.map((club, index) => <UserClubCardItem club={club} reloadAfterChange={reloadAfterChange} key={index}/>)}
                </Space>
                <Pagination className="user-content-pagination"
                            hideOnSinglePage
                            showSizeChanger={false}
                            onChange={onPageChange}
                            current={page + 1}
                            pageSize={clubs.size}
                            total={clubs.totalElements}/>
            </Layout>
        </div>
    )

}


export default withRouter(UserClubList);

