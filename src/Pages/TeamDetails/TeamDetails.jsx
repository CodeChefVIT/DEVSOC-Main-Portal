import { Container, Grid, Hidden } from "@material-ui/core";
import React from "react";
import "./TeamDetails.css";
import salty from "./TeamDetails.png";
import logo from './DEVSOCLogo.png';
import { Link } from "react-router-dom";

const TeamDetails = () => {
  return (
    
    <div className="team-details">
       <img
        style={{
          height: "100vh",
          margin: "0",
          width: "100vw",
          padding: "0",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "fixed",
          bottom: "0",
          right: "0",
          zIndex: -1,
        }}
        src={salty}
        alt={""}
        className="From-img"
      />
      <div style={{ padding: "0 3%", marginBottom: "40px" }}>
        <h1 className="devsoc21">
          <Link to="/app/dashboard" style={{ textDecoration: "none", width: "fit-content" }}>
          <img src={logo} width={150}></img>
          </Link>
        </h1>
        <h1 className="page-title">Team Details</h1>
      </div>
      <div className="team-details-div">
        {/* <Container> */}
        <div style={{ padding: "0 5%", height: "100%" }}>
          <Grid container sapcing={3} style={{ height: "100%" }}>
            <Grid item xs={12} sm={6} style={{ display: "flex", alignItems: "center" }}>
              <h1 style={{ textAlign: "center" }}>Idea not made public yet!</h1>
            </Grid>
            {/* <Hidden xsDown>
              <Grid
                item
                xs={12}
                sm={6}
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <img src="/assets/teamDetails.png" alt="team details" style={{ width: "400px" }} />
              </Grid>
            </Hidden> */}
          </Grid>
        </div>
        {/* </Container> */}
      </div>
    </div>
  );
};

export default TeamDetails;
