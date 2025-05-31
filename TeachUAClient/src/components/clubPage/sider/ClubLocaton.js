import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, MarkerClusterer, useLoadScript, LoadScript } from "@react-google-maps/api";
import MarkItem from "../../map/MarkItem";

const MapContainer = ({ locations }) => {
 
    const [map, setMap] = useState(null);
    const [zoom, setZoom] = useState(10);
    const [center, setCenter] = useState(null);

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

    const chooseCenter = () => {
        const oneLocationCenter = {
            lat: locations[0].latitude,
            lng: locations[0].longitude
        };
        
        if (locations.length === 1) {
            setCenter(oneLocationCenter);
            setZoom(15);
        } else {
            setCenter(findCenter());
            setZoom(10);
        }
    }

    const findCenter = () => {
        const length = locations.length;
        var X = 0;
        var Y = 0;
        var Z = 0;

        for (var i = 0; i < length; ++i) {
            var lat = locations[0].latitude * Math.PI / 180;
            var lon = locations[0].longitude * Math.PI / 180;

            X += Math.cos(lat) * Math.cos(lon);
            Y += Math.cos(lat) * Math.sin(lon);
            Z += Math.sin(lat);
        }

        X /= length;
        Y /= length;
        Z /= length;

        var longitude = Math.atan2(Y, X);
        var latitude = Math.atan2(Z, Math.sqrt(X * X + Y * Y));

        return {
            lat: latitude * 180 / Math.PI,
            lng: longitude * 180 / Math.PI
        }
    }
    
    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            onLoad={map => {
                    setMap(map);
                    chooseCenter();
            }}
            center={center}
            options={option}
            onZoomChanged={changeZoom}
        >
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
                locations.map((location, index) =>
                    <Marker
                        id={index}
                        position={{
                            lat: location.latitude,
                            lng: location.longitude
                        }}
                        clusterer={cluster}
                        onClick={() => {
                            setZoom(15);
                            setCenter({
                                lat: location.latitude,
                                lng: location.longitude
                            })
                        }}
                        icon={{ url: `${process.env.PUBLIC_URL}/static/images/map/location.png` }} />)
            }
        </MarkerClusterer> 
     </GoogleMap> 
    )
}

export default MapContainer;