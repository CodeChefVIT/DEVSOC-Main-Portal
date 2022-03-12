import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import "./Landing.css";
import logo from '../../assets/logo.png'

function Landing() {
  const history = useHistory();
  const handleButton = async () => {
    console.log("clicked");
    const url = `${process.env.REACT_APP_BACKEND_URL}/auth/getUrl`;
    try {
      await axios.get(url).then((res) => {
        console.log(res);
        window.location.href = res.data.data;
      });
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("authToken");
    if (token && token !== "") {
      history.replace("/app/dashboard");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="landing-page" style={{ backgroundImage: `url('/assets/landing-bg.png')` }}>
      <div className="dev-container">
        <img className="logo" src={logo}></img>
        <div>
          <h1 className="heading1">
            DEVSOC <span style={{ color: "#37ABBC" }}>‘22</span>
          </h1>
          <div className="google-link">
            <div className="sign-txt">Get into the action</div>
            <div className="google-btn" onClick={handleButton}>
              <div className="google-icon-wrapper">
                <img className="google-icon" src="/assets/gbtn.svg" alt="google" />
              </div>
              <p className="btn-text">
                <b>Sign in with Google</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <h1 className="devsoc21 ds-landing">DEVSOC'22</h1> */}
    </div>
  );
}

export default Landing;
