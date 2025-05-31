import React from 'react'

const Banner = ({imageURL}) => {
    return (
        <div className="banner" style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), 
                                    url(${imageURL}) no-repeat 50% 28% / cover`
            }}>
            <span className="title">Челендж "Навчай українською"</span>
        </div>
    )
}

export default Banner;
