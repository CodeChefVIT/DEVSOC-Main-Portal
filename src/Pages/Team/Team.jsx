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
            <Grid item sm={12} md={6}>
              <h3 className="team-name">Team {data.teams.name}</h3>
              <div className="my-team-info">
                <h2 className="gradient-head">Status</h2>
                <p className="team-status">Selected for final pitch</p>
                <h2 className="gradient-head" style={{ marginBottom: "15px" }}>
                  Team Members
                </h2>
                <Grid container spacing={3} className="team-members-div">
                  {data.teams.users.map((user) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      key={user.email}
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                    >
                      <p className="team-status team-member">{user.name}</p>
                    </Grid>
                  ))}
                </Grid>
                <h2 className="gradient-head" style={{ marginTop: "40px" }}>
                  Idea Status
                </h2>
                <p className="team-status">Idea accepted</p>
              </div>
              <div className="team-action-div">
                <button className="team-primary-btn">
                  {btnLoading ? <CircularProgress color="secondary" size={24} /> : "Edit team"}
                </button>
                <button className="team-secondary-btn" onClick={handleLeave}>
                  {btnLoading ? <CircularProgress color="secondary" size={24} /> : "Leave team"}
                </button>
              </div>
            </Grid>
            <Hidden smDown>
              <Grid
                item
                sm={12}
                md={6}
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <img src="/assets/team-joined.svg" alt="team joined" style={{ width: "500px" }} />
              </Grid>
            </Hidden>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Team;
