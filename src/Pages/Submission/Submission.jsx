import React from "react";
// import Header from "../ProfileEdit/Header";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import "./Submission.css";
import { Link } from "react-router-dom";
import saltysubmission from "./Saly-16.svg";
import ProjectSubmission from "../ProjectSubmission/ProjectSubmission";

function Submission(props) {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={4}>
          <input
            {...register("Name", { required: true, maxLength: 30 })}
            placeholder="Idea Name"
            className="Idea-name"
          />
        </Grid>
        <Grid container spacing={2} />
        <Grid item xs={8} sm={4}>
          <textarea
            {...register("address1", { required: true, maxLength: 30 })}
            placeholder="Idea Description"
            className="Idea-Description"
          />
        </Grid>
      </Grid>
      <div
        className={"bkg"}
        style={{
          height: "100vh",
          position: "fixed",
          bottom: "-10vh",
          right: "0vh",
          zIndex: -1,
        }}
      >
        <img
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            height: "auto",
            zIndex: -1,
          }}
          src={saltysubmission}
          alt={"image"}
          className="From-img"
        />
      </div>
      <Link to= "./app/submission/project">
      <button className="team-primary-btn">Submit Idea</button>
      </Link>
    </div>
  );
}

export default Submission;
