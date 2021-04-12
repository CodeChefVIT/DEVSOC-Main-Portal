import { CircularProgress, Grid, Hidden } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import CreateTeamModal from "../../Components/CreateTeamModal/CreateTeamModal";
import InviteModal from "../../Components/InviteModal/InviteModal";
import JoinTeamModal from "../../Components/JoinTeamModal/JoinTeamModal";
import RemoveMember from "../../Components/RemoveMemberModal/RemoveMember";
import "./Team.css";

function Team({ data, refresh, profile }) {
  const [createTeam, setCreateTeam] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [ideaSubmitted, setIdeaSubmitted] = useState(false);
  const [joinTeam, setJoinTeam] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    if (data.message && data.message === "Not in a team") {
      setAlreadyJoined(false);
    } else {
      setAlreadyJoined(true);
      if (data.teams.submission) {
        setIdeaSubmitted(true);
      }
    }
  }, [data]);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleLeave = async () => {
    setBtnLoading(true);

    const url = `${process.env.REACT_APP_BACKEND_URL}/team/leave`;
    const token = localStorage.getItem("authToken");
    let captcha = await executeRecaptcha("/");

    try {
      await axios
        .post(
          url,
          { captcha },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // console.log(res);
          refresh();
        });
    } catch (error) {
      // console.log(error);
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
            <Grid item xs={12} sm={12} md={6}>
              <h3 className="team-name">Team {data.teams.name}</h3>
              <div className="my-team-info">
                {/* <h2 className="gradient-head">Status</h2>
                <p className="team-status">Selected for final pitch</p> */}
                <div
                  className="team-members-head-div"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h2 className="gradient-head">Team Members</h2>
                  {data.isLeader && !ideaSubmitted ? (
                    <span className="remove-btn" onClick={() => setRemoving(true)}>
                      Remove members
                    </span>
                  ) : null}
                </div>
                <Grid container spacing={3} className="team-members-div">
                  {data.teams.users.map((user, i) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      key={user.email}
                      style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        display: "flex",
                        justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
                      }}
                      className="member-name-grid"
                    >
                      <p className="team-status team-member">{user.name}</p>
                    </Grid>
                  ))}
                </Grid>
                {/* <h2 className="gradient-head" style={{ marginTop: "40px" }}>
                  Idea Status
                </h2>
                <p className="team-status">Idea accepted</p> */}
              </div>
              <div className="team-action-div">
                {data.isLeader && !ideaSubmitted ? (
                  <button className="team-primary-btn" onClick={() => setInviting(true)}>
                    Invite members
                  </button>
                ) : null}
                {!ideaSubmitted ? (
                  <button className="team-secondary-btn" onClick={handleLeave}>
                    {btnLoading ? <CircularProgress color="secondary" size={24} /> : "Leave team"}
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </Grid>
            <Hidden smDown>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <img src="/assets/team-joined.svg" alt="team joined" style={{ width: "500px" }} />
              </Grid>
            </Hidden>
          </Grid>
          <RemoveMember
            open={removing}
            handleClose={() => setRemoving(false)}
            data={data}
            refresh={refresh}
            profile={profile}
          />
          <InviteModal
            open={inviting}
            handleClose={() => setInviting(false)}
            data={data}
            refresh={refresh}
          />
        </div>
      )}
    </div>
  );
}

export default Team;
