import React from "react";
const ArrowRightCircle = ({size = 28, color = "#43c89a"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
         strokeWidth="1.5" strokeLinecap="square">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8l4 4-4 4M8 12h7"/>
    </svg>);
export default ArrowRightCircle;
