import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {getCentersByUserId} from "../../../service/CenterService";
import Loader from "../../Loader";
import {Layout, Pagination, Space} from "antd";
import UserCenterCardItem from "./UserCenterCardItem";
import './css/UserCenter.less';

const UserCenterList = ({load, setLoad, match}) => {
    const [centers, setCenters] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });

    const [page, setPage] = useState(0);

    const getData = (currPage) => {
        setLoad(true);
        let userId = match.params.id;

        getCentersByUserId(userId, currPage).then(response => {
            setCenters(response);
            setLoad(false);
        });
    };

    useEffect(() => {
            getData(page)
    }, []);

    const reloadAfterChange = () => {
        onPageChange(page + 1);
    };

    const onPageChange = (page) => {
        setPage(page - 1);
        getData(page - 1);
    };

    return load ? <Loader/> : (
        <Layout className="user-centers">
            <Space wrap className="centers-cards" size={[0, 0]}>
                {centers.content.map((center, index) => <UserCenterCardItem center={center} reloadAfterChange={reloadAfterChange} key={index}/>)}
            </Space>
            <Pagination className="user-content-pagination"
                        hideOnSinglePage
                        showSizeChanger={false}
                        onChange={onPageChange}
                        current={page + 1}
                        pageSize={centers.size}
                        total={centers.totalElements}/>
        </Layout>
    );
}

export default withRouter(UserCenterList);
