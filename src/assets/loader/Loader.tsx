import React from "react"

const Loader = () => (
  <div className="message-loader">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"
         className="lds-eclipse">
      <path d="M17.79290545 74.74243165a40 40 0 0063.18757528-49.06455268 42 40 52.171 01-63.18757528 49.06455268"
            fill="#337ab7">
        <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51"
                          keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>
      </path>
    </svg>
  </div>
);

export default Loader;
