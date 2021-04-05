import React, { useEffect, useState } from "react";
import CreateTeamModal from "../../Components/CreateTeamModal/CreateTeamModal";
import JoinTeamModal from "../../Components/JoinTeamModal/JoinTeamModal";
import "./Dashboard.css";

function Dashboard({ data, refresh }) {
  const [createTeam, setCreateTeam] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [joinTeam, setJoinTeam] = useState(false);
  const [hackBegin, setHack] = useState(false);
  const [hrs, setHrs] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    if (data.message && data.message === "Not in a team") {
      setAlreadyJoined(false);
    } else {
      setAlreadyJoined(true);
    }
  }, [data]);

  useEffect(() => {
    const start = new Date();
    start.setFullYear(2021, 3, 30);
    start.setHours(9);
    start.setMinutes(0);
    start.setSeconds(0);
    const Now = new Date();
    if (start - Now > 0) {
    } else {
      const start = new Date();
      start.setFullYear(2021, 3, 30);
      start.setHours(9);
      start.setMinutes(0);
      start.setSeconds(0);
    }
    // Test = start - Now;
  }, []);

  return (
    <div className="team-container">
      {!alreadyJoined ? (
        <div className="team-div">
          <>
            <h3 style={{ marginBottom: "40px" }}>Oops, looks like you dont have a team yet!</h3>
            <div className="team-btn-div">
              <button className="team-primary-btn" onClick={() => setCreateTeam(true)}>
                Create a team
              </button>
              <p style={{ fontWeight: 400, fontSize: 24, margin: "10px" }}>or</p>
              <button className="team-secondary-btn" onClick={() => setJoinTeam(true)}>
                Join a team
              </button>
            </div>
            <CreateTeamModal
              open={createTeam}
              handleClose={() => setCreateTeam(false)}
              refresh={refresh}
            />
            <JoinTeamModal
              open={joinTeam}
              handleClose={() => setJoinTeam(false)}
              refresh={refresh}
            />
          </>
        </div>
      ) : (
        <div className="team-div">
          <div className="dashset">You are all set</div>
          <div>Hack Timer</div>
          <div className="counter">
            <div class="clock">
              {hrs} : {min} : {sec}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
