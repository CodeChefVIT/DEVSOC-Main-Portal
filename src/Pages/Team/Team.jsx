import React, { useEffect, useState } from "react";
import CreateTeamModal from "../../Components/CreateTeamModal/CreateTeamModal";
import JoinTeamModal from "../../Components/JoinTeamModal/JoinTeamModal";
import "./Team.css";

function Team({ data, refresh }) {
  const [createTeam, setCreateTeam] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [joinTeam, setJoinTeam] = useState(false);

  useEffect(() => {
    if (data.message && data.message === "Not in a team") {
      setAlreadyJoined(false);
    } else {
      setAlreadyJoined(true);
    }
  }, [data]);

  return (
    <div className="team-container">
      <div className="team-div">
        <h3 style={{ marginBottom: "40px" }}>Oops, looks like you dont have a team yet</h3>
        <div className="team-btn-div">
          <button className="team-primary-btn" onClick={() => setCreateTeam(true)}>
            Create a team
          </button>
          <p style={{ fontWeight: 400, fontSize: 24, margin: "10px" }}>or</p>
          <button className="team-secondary-btn" onClick={() => setJoinTeam(true)}>
            Join a team
          </button>
        </div>
      </div>
      <CreateTeamModal
        open={createTeam}
        handleClose={() => setCreateTeam(false)}
        refresh={refresh}
      />
      <JoinTeamModal open={joinTeam} handleClose={() => setJoinTeam(false)} refresh={refresh} />
    </div>
  );
}

export default Team;
