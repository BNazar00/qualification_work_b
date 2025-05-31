import React from "react";
import {BASE_URL} from "../../service/config/ApiConfig";

const ItemView = ({item}) => {

    const Item = () => {
        switch (item.type) {
            case 1:
                return <div className="row">
                    <div className="title-content">{item.text}</div>
                </div>
            case 2:
                return <div className="row">
                    <div className="col">
                        <div className="content-text" dangerouslySetInnerHTML={{__html: `${item.text}`}}/>
                    </div>
                </div>;
            case 3:
                console.log(`${BASE_URL}${item.picture}`);
                return <div className="row">
                    <img className="image"
                         src={`${BASE_URL}${item.picture}`}
                    ></img>
                    <div className="content-text" dangerouslySetInnerHTML={{__html: `${item.text}`}}/>
                </div>
            case 4:
                return <div className="row">
                    <div className="content-text" dangerouslySetInnerHTML={{__html: `${item.text}`}}/>
                    <img className="image"
                         src={`${BASE_URL}${item.picture}`}
                    ></img>
                </div>
            case 5:
                return <div className="row">
                    <div className="col">
                        <div className="video">
                            <iframe width="100%" height="378" style={{borderRadius: '16px'}}
                                    src={item.video} frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
        }
    }

    return (
        <div className='content'>
            <Item/>
        </div>
    );
}

export default ItemView;