import React from "react";
// import Header from "../ProfileEdit/Header";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import "./Submission.css";
import { Link } from "react-router-dom";
import saltysubmission from "./Saly-16.svg";
import ProjectSubmission from "../ProjectSubmission/ProjectSubmission";
import { Instagram } from "@material-ui/icons";

function Submission(props) {
  // const { register, handleSubmit } = useForm();
  // return (
  //   <div>
  //     <Grid container spacing={2}>
  //       <Grid item xs={12} sm={4}>
  //         <input
  //           {...register("Name", { required: true, maxLength: 30 })}
  //           placeholder="Idea Name"
  //           className="Idea-name"
  //         />
  //       </Grid>
  //       <Grid container spacing={2} />
  //       <Grid item xs={12} sm={4}>
  //         <textarea
  //           {...register("address1", { required: true, maxLength: 30 })}
  //           placeholder="Idea Description"
  //           className="Idea-Description"
  //         />
  //       </Grid>
  //     </Grid>
  //     <div
  //       className={"bkg"}
  //       style={{
  //         height: "100vh",
  //         position: "fixed",
  //         bottom: "-10vh",
  //         right: "0vh",
  //         zIndex: -1,
  //       }}
  //     >
  //       <img
  //         style={{
  //           maxWidth: "100%",
  //           maxHeight: "100%",
  //           height: "auto",
  //           zIndex: -1,
  //         }}
  //         src={saltysubmission}
  //         alt={"image"}
  //         className="From-img"
  //       />
  //     </div>
  //     {/* <Link to="/app/submission/project">
  //       <button className="team-primary-btn">Submit Idea</button>
  //     </Link> */}
  //     <h3>Idea submissions opening soon!</h3>
  //   </div>
  // );

  return (
    <div className="team-container">
      <div>
        <div className="dashset">Idea Submissions open soon!</div>
        <div className="dashset">Stay tuned for our tracks to be released</div>
        <div className="social">
          <a
            href="https://codechefvit.com/discord"
            target="_blank"
            rel="noreferrer"
            className="discord"
          >
            <img
              src="https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png"
              alt=""
              style={{ marginRight: 10 }}
            />
            Join
          </a>
          <a
            href="https://instagram.com/codechefvit"
            target="_blank"
            rel="noreferrer"
            className="discord insta"
          >
            <Instagram style={{ fontSize: 30, marginRight: 10 }} />
            Follow
          </a>
        </div>
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
          src={saltysubmission}
          alt={"image"}
          className="From-img"
        />
      </div>
    </div>
  );
}

export default Submission;
