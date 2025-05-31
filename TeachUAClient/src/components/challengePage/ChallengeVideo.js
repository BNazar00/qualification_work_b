import {items} from "./WebinarItems";
import React from "react";


const ChallengeVideo = ({item}) => {



    return (
        <div className="webinar-items">
                <div className="video">
                    <span className="title">{item.text}</span>
                    <iframe width="100%" height="378" style={{borderRadius: '16px'}}
                            src={item.link} frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                </div>
        </div>
    )
}

export default ChallengeVideo