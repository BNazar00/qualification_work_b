import React from 'react'

const SpeakingClubBanner = ({imageURL}) => {
    return (
        <div className="banner" style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), 
                                    url(${imageURL}) no-repeat 50% 28% / cover`
            }}>
            <span className="title">Клуб української мови "Розмовляй"</span>
        </div>
    )
}

export default SpeakingClubBanner;
