import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React from "react";
import "./TeamCard.css";

const TeamCard = ({ team }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/team/${team._id}`);
  };

  return (
    <div className="team-card" onClick={handleClick}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={8}>
          <div style={{ padding: "20px 30px", display: "flex", alignItems: "center" }}>
            <h4>Team: </h4>
            <div style={{ marginLeft: "20px" }}>
              <h2 className="card-team-name">{team.name}</h2>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} className="card-count-div">
          {/* <Hidden smDown>
            <div className="team-card-divider">&nbsp;</div>
          </Hidden> */}

          <div style={{ display: "flex", alignItems: "center" }}>
            <h2>{team.users.length} </h2>
            <h4 style={{ marginLeft: "10px" }}>members </h4>
          </div>
        </Grid>
      </Grid>
      <div className="card-members-list">
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="card-vertical-divider"></div>
          <div className="card-members-div">
            <Grid container spacing={0}>
              <Grid item xs={12} sm={2}>
                <h3 style={{ textAlign: "center", fontWeight: "200" }}>Members List</h3>
              </Grid>
              <Grid item xs={12} sm={10} className="member-container-div">
                <Grid container spacing={0}>
                  {team.users.map((user, i) => (
                    <Grid item xs={12} sm={6}>
                      <h3 className="card-member-name">
                        {i + 1}. {user.name}
                      </h3>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
