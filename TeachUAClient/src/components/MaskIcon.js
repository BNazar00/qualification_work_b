import React from "react";

const MaskIcon = ({maskColor, iconUrl}) => {
    return (
        <div className="icon"
             style={{
                 backgroundColor: maskColor,
                 WebkitMask: `url(${process.env.PUBLIC_URL + iconUrl}) no-repeat center / contain`
             }}/>
    )
};


export default MaskIcon;
