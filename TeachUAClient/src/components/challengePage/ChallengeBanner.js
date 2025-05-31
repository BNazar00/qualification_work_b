import React from 'react'

const ChallengeBanner = ({imageURL}) => {
    return (
        <div className="banner" style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), 
                                    url(${imageURL}) no-repeat 50% 28% / cover`
            }}>
            <span className="title">Про челендж "Навчай українською"</span>
        </div>
    )
}

export default ChallengeBanner;
