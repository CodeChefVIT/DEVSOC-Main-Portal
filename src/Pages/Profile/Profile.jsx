import React from "react";
import { Avatar, Grid, Hidden, SvgIcon } from "@material-ui/core";
import "./Profile.css";
import back from "./back.svg";
import { Link, useHistory } from "react-router-dom";
import { GitHub, LinkedIn } from "@material-ui/icons";

export default function Profile({ data }) {
  const history = useHistory();
  return (
    <div className="team-joined-div">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} className="profile-data">
          <Avatar
            className="user_profile_picture"
            alt={data.name}
            variant="circular"
            src={data.avatar}
          />

          <h1>{data.name}</h1>
          <h3>{data.email}</h3>
          <h3>{data.college}</h3>
          <h3>{data.bio}</h3>
          {data.profile ? (
            <div className="social">
              <a href={data.profile?.github} target="_blank" rel="noreferrer">
                <GitHub />
              </a>
              <a href={data.profile?.linkedin} target="_blank" rel="noreferrer">
                <LinkedIn />
              </a>
            </div>
          ) : (
            <></>
          )}
          <Link to="/app/profile/edit">
            <button className="team-primary-btn">Edit Profile</button>
          </Link>
          <Hidden smUp>
            <button
              className="team-primary-btn"
              style={{ margin: "5px auto" }}
              onClick={() => {
                localStorage.removeItem("authToken");
                history.push("/");
              }}
            >
              Logout
            </button>
          </Hidden>
        </Grid>
      </Grid>

      <Hidden xsDown>
        <Grid item md={6}>
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              height: "auto",
              position: "fixed",
              bottom: "0",
              right: "0",
              zIndex: -1,
            }}
            src={back}
            alt={"image"}
            className="From-img"
          />
        </Grid>
      </Hidden>
    </div>
  );
}
