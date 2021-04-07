import React from "react";
import "./Submission.css";
import saltysubmission from "./Saly-16.svg";
import { Instagram } from "@material-ui/icons";

function Submission(props) {
  return (
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
  );
}

export default Submission;
