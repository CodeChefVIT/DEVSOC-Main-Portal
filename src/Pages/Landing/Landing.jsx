import React from "react";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-page" style={{ backgroundImage: `url('/assets/landing-bg.svg')` }}>
      <h1 className="devsoc21">DEVSOC'21</h1>
      <div className="google-link">
        <div className="sign-txt">Get into the action</div>
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img className="google-icon" src="/assets/gbtn.svg" alt="google" />
          </div>
          <p className="btn-text">
            <b>Sign in with Google</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
