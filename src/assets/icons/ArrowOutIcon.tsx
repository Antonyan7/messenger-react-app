import React from "react"

const ArrowOut = ({size = 28, color = "#212121"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
         strokeWidth="1.5" strokeLinecap="square">
        <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9"/>
    </svg>);

export default ArrowOut;
