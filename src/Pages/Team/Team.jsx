import { CircularProgress, Grid, Hidden } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateTeamModal from "../../Components/CreateTeamModal/CreateTeamModal";
import JoinTeamModal from "../../Components/JoinTeamModal/JoinTeamModal";
import "./Team.css";

function Team({ data, refresh }) {
  const [createTeam, setCreateTeam] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [joinTeam, setJoinTeam] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    if (data.message && data.message === "Not in a team") {
      setAlreadyJoined(false);
    } else {
      setAlreadyJoined(true);
    }
  }, [data]);

  const handleLeave = async () => {
    setBtnLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/team/leave`;
    const token = localStorage.getItem("authToken");

    try {
      await axios
        .post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          refresh();
        });
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className="team-joined-div">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <button className="team-secondary-btn" onClick={handleLeave}>
                {btnLoading ? <CircularProgress color="secondary" size={24} /> : "Leave team"}
              </button>
            </Grid>
            <Hidden xsDown>
              <Grid
                item
                xs={12}
                sm={6}
                style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
              >
                <img src="/assets/team-joined.svg" alt="team joined" style={{ width: "400px" }} />
              </Grid>
            </Hidden>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Team;
