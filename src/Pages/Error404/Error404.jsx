import React from "react";
import { useHistory } from "react-router";

function Error404({ data, refresh }) {
  const history = useHistory();
  return (
    <div className="team-container">
      <div className="team-div">
        <h1 className="devsoc21 ds-landing" style={{ padding: "0 !important" }}>
          DEVSOC'22
        </h1>
        <h3 className="dashset">Are you lost baby girl?</h3>
        <div className="team-btn-div">
          <button className="team-primary-btn" onClick={() => history.push("/app/dashboard")}>
            Get back home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error404;
