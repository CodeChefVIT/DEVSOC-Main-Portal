import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import "./Landing.css";
import logo from '../../assets/logo.png'
import text from "./Landing.png";
import salty from "./landing-bg.png";

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

    <div className="landing-page">
      {/* <a href="http://discord.codechefvit.com/" target="_blank">
        <div class="side-fixed-btn hover-change">
          <img src={discord} alt="" />
        </div>
      </a> */}
      <img
        style={{
          height: "100%",
          margin: "0",
          width: "100%",
          padding: "0",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "fixed",
          bottom: "0",
          right: "0",
          zIndex: -1,
          filter: "brightness(0.7)",
        }}
        src={salty}
        alt={""}
        className="From-img"
      />
      <div className="dev-container">
        {/* <img className="logo" src={logo}></img> */}
        <div>
          <div className="devsoc">
            <h1 className="heading1" style={{ marginTop: "30px" }}>
              DEVSOC <span style={{ color: "#37ABBC" }}>‘22</span> has been postponed :(
            </h1>
            {/* <img src={text} className="logo2"></img> */}
            {/* <div className="google-link">
              <div className="google-btn" onClick={handleButton}>
                <div className="google-icon-wrapper">
                  <img className="google-icon" src="/assets/gbtn.png" alt="google" />
                </div>
              </div>
            </div> */}
          </div>
        </div>

      </div>

      {/* <h1 className="devsoc21 ds-landing">DEVSOC'22</h1> */}
    </div>
  );
}

export default Landing;
