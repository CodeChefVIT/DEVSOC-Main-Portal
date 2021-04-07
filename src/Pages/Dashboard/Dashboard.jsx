import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./Dashboard.css";

function Dashboard({ data, refresh }) {
  const [alreadyJoined, setAlreadyJoined] = useState(false);
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

  const history = useHistory();

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
      <div className="team-div">
        <div className="dashhack">{!hackBegin ? "Hack Starts in" : "Hack ends in"}</div>
        <div className="counter">
          <div className="clock">
            <div className="clock-item">
              {hrs.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}{" "}
              <span className="clock-label">DAYS</span>
            </div>
            :{" "}
            <div className="clock-item">
              {min.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}{" "}
              <span className="clock-label">HOURS</span>
            </div>
            :{" "}
            <div className="clock-item">
              {sec.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}{" "}
              <span className="clock-label">MINUTES</span>
            </div>
          </div>
        </div>
        {!alreadyJoined ? (
          <>
            <h3 style={{ marginBottom: "30px", marginTop: "20px" }}>Meanwhile, we recommend you</h3>
            <div className="team-btn-div">
              <button className="team-primary-btn" onClick={() => history.push("/app/team")}>
                Form your Team now!
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
