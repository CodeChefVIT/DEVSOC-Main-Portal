import React from "react";
import { Avatar, Grid, Hidden } from "@material-ui/core";
import "./Profile.css";
import back from "./back.svg";
import { Link, useHistory } from "react-router-dom";
import { GitHub, LinkedIn } from "@material-ui/icons";

export default function Profile({ data }) {
  const history = useHistory();
  const getString = (num) => {
    switch (num) {
      case 1:
        return "First Year";
      case 2:
        return "Second Year";
      case 3:
        return "Third Year";
      case 4:
        return "Fourth Year";
      case 5:
        return "Fifth Year";
      default:
        return "";
    }
  };
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
          <div className="social">
            {data.personal.website === "" ? (
              <></>
            ) : (
              <a href={data.personal?.website} target="_blank" rel="noreferrer">
                <h3>{data.personal?.website}</h3>
              </a>
            )}
          </div>
          <h3>
            {data.college}: {getString(data.collegeYear)}
          </h3>
          <h3>{data.bio}</h3>
          <div className="social">
            {data.personal.github === "" ? (
              <></>
            ) : (
              <a href={data.personal?.github} target="_blank" rel="noreferrer">
                <GitHub />
              </a>
            )}
            {data.personal.linkedin === "" ? (
              <></>
            ) : (
              <a href={data.personal?.linkedin} target="_blank" rel="noreferrer">
                <LinkedIn />
              </a>
            )}
          </div>
          <Link to="/app/profile/edit">
            <button className="team-primary-btn profile-btn">Edit Profile</button>
          </Link>
          <Hidden smUp>
            <button
              className="team-primary-btn profile-btn"
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
            alt={""}
            className="From-img"
          />
        </Grid>
      </Hidden>
    </div>
  );
}
