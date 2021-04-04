import React from "react";
import "./Team.css";

function Team(props) {
  return (
    <div className="team-container">
      <div className="team-div">
        <h3 style={{ marginBottom: "40px" }}>Oops, looks like you dont have a team yet</h3>
        <div className="team-btn-div">
          <button className="team-primary-btn">Create a team</button>
          <p style={{ fontWeight: 400, fontSize: 24, margin: "10px" }}>or</p>
          <button className="team-secondary-btn">Join a team</button>
        </div>
      </div>
    </div>
  );
}

export default Team;
