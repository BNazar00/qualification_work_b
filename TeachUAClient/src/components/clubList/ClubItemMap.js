import React, {useEffect, useState} from 'react';
import { GoogleMap, InfoWindow, Marker, MarkerClusterer, useLoadScript } from "@react-google-maps/api";
import MarkItem from "../map/MarkItem";
import { Modal } from 'antd';
import { searchParameters } from "../../context/SearchContext";

const ClubItemMap = ({ club, visible, setVisible }) => {

    const [map, setMap] = useState(null);
    const [selected, setSelected] = useState(null);
    const [zoom, setZoom] = useState(10);

    const [center, setCenter] = useState({
        lat: club?.locations[0]?.city?.latitude,
        lng: club?.locations[0]?.city?.longitude
    });

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAP_KEY
    });

    if (loadError) return "Error loading map";
    if (!isLoaded) return "Map is loading";

    const mapContainerStyle = {
        width: "100%",
        height: "100%"
    };

    const option = {
        disableDefaultUI: true,
        zoomControl: true
    };

    const changeZoom = () => {
        if (map != null) {
            setZoom(map.zoom);
        }
    };
    const closeMap = () => {
        setVisible(false);
    };

    return (
        <Modal
            centered
            visible={visible}
            onOk={() => closeMap()}
            onCancel={() => closeMap()}
            width={1200}
            footer={null}
            className='map-modal'
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={zoom}
                onLoad={map => {
                    setMap(map);
                }}
                center={center}
                options={option}
                onZoomChanged={changeZoom}>
                <MarkerClusterer
                    onClusteringEnd={(clusters) => {
                        clusters.clusters.map((cluster) => {
                            cluster.clusterIcon.styles = [{
                                url: `${process.env.PUBLIC_URL}/static/images/map/cluster.png`,
                                height: 58,
                                width: 67,
                                textColor: '#FFFFFF',
                                textSize: 18,
                            }];
                        })
                    }}>
                    {(cluster) =>
                        club.locations.map(location =>
                            location.city.name === searchParameters.cityName && <Marker
                                id={club.id}
                                position={{
                                    lat: location.latitude,
                                    lng: location.longitude
                                }}
                                clusterer={cluster}
                                onClick={() => {
                                    setZoom(15);
                                    club.location = location;
                                    setSelected(club);
                                    setCenter({
                                        lat: location.latitude,
                                        lng: location.longitude
                                    })
                                }}
                                icon={{ url: `${process.env.PUBLIC_URL}/static/images/map/location.png` }} />)
                    }
                </MarkerClusterer>

                {selected && (
                    <InfoWindow position={{ lat: center.lat, lng: center.lng }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}>
                        <MarkItem mapClub={selected} />
                    </InfoWindow>)}
            </GoogleMap>
        </Modal>
    )
}

export default ClubItemMap;