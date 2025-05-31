import React, {useContext, useState, useEffect} from "react";
import {SearchContext} from "../../context/SearchContext";
import Cities from "./Cities";
import {useLocation} from 'react-router-dom'
import AuthMenu from "./AuthMenu";
import AddClubModal from "../addClub/AddClubModal";
import { Button } from "antd";
import { getUserId } from "../../service/StorageService";
import { AuthContext } from "../../context/AuthContext";

const HeaderRight = () => {
    const {setClubs} = useContext(SearchContext);
    const {setShowLogin} = useContext(AuthContext);
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);

    return (
      
        <div className="right-side-menu">
            <AddClubModal isShowing={showModal} setShowing={setShowModal}/>
            <Cities setClubs={setClubs}/>
            {location.pathname === "/" &&
              <Button onClick={() => getUserId() ? setShowModal(true) : setShowLogin(true)}
              className="add-club-button">Додати гурток</Button>
            }
            <AuthMenu/>
        </div>
    )
};

export default HeaderRight;