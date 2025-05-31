import React, {useEffect, useState} from "react";
import {getAllItems} from "../../service/AboutUsService";
import {Button, Layout} from "antd";
import "./css/aboutProject.css";
import AboutUsHeader from "./AboutUsHeader";
import ItemView from "./ItemView";


const AboutProject = () => {
    const [items, setItems] = useState([]);
    const getData = () => {
        getAllItems().then(response => {
            setItems(response);
        });
    }

    useEffect(() =>  {
        getData();
    },[]);

    return (
        <Layout className="aboutProject global-padding">
            <AboutUsHeader/>
            {items.map(item => <ItemView item={item}/>)}
        </Layout>
    );

};

export default AboutProject;