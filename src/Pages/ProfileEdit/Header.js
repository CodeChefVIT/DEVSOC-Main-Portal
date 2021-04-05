//headings for form page 
import React from "react";
export default (props) => {
  return (
    <div style={{ marginBottom: 0.1 }}>
      <h1 className="h1">
        <h1 className="devsoc-heading">DEVSOC'21</h1>
        <h2 className="profile-heading">{props.title}</h2>
        <h5 className="set-heading">{props.desc}</h5>
      </h1>
    </div>
  );
};
