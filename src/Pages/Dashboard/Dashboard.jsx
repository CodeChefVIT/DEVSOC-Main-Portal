import React, { useEffect, useState } from "react";
import CreateTeamModal from "../../Components/CreateTeamModal/CreateTeamModal";
import JoinTeamModal from "../../Components/JoinTeamModal/JoinTeamModal";
import "./Dashboard.css";

function Dashboard({ data, refresh }) {
  const [createTeam, setCreateTeam] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [joinTeam, setJoinTeam] = useState(false);
  const [hackBegin, setHack] = useState(false);
  const [timer, setTimer] = useState(0);
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

  var hackTimer;
  useEffect(() => {
    const start = new Date();
    start.setFullYear(2021, 3, 30);
    start.setHours(9);
    start.setMinutes(0);
    start.setSeconds(0);
    const Now = new Date();
    const diff = (start - Now) / 1000;
    console.log(diff);
    if (start - Now > 0) {
      setTimer(diff);
    } else {
      const end = new Date();
      end.setFullYear(2021, 4, 2);
      end.setHours(20);
      end.setMinutes(0);
      end.setSeconds(0);
      const newdiff = (end - Now) / 1000;
      setTimer(newdiff);
      setHack(true);
    }

    clearInterval(hackTimer);
    //eslint-disable-next-line
    hackTimer = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (timer > 86400) {
      setHrs(Math.floor(timer / 86400)); // Actually Days
      setMin(Math.floor((timer - 86400 * Math.floor(timer / 86400)) / 3600)); // Actually Hours
      setSec(
        Math.floor(
          (timer -
            (3600 * Math.floor((timer - 86400 * Math.floor(timer / 86400)) / 3600) +
              86400 * Math.floor(timer / 86400))) /
            60
        )
      ); // Actually Min
    } else {
      setHrs(Math.floor(timer / 3600)); // Hours
      setMin(Math.floor((timer - 3600 * Math.floor(timer / 3600)) / 60)); // Min
      setSec(
        Math.floor(
          timer -
            (60 * Math.floor((timer - 3600 * Math.floor(timer / 3600)) / 60) +
              3600 * Math.floor(timer / 3600))
        )
      ); // Sec
    }
  }, [timer]);

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
          <div className="dashhack">{!hackBegin ? "Hack Starts in" : "Hack ends in"}</div>
          <div className="counter">
            <div class="clock">
              {hrs.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}{" "}
              :{" "}
              {min.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}{" "}
              :{" "}
              {sec.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
