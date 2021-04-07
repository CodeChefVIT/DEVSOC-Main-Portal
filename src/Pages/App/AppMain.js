import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import Team from "../Team/Team";
import BottomNav from "../../Components/BottomNav/BottomNav";
import Dashboard from "../Dashboard/Dashboard";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import TopNav from "../../Components/TopNav/TopNav";
import Submission from "../Submission/Submission";
import ProfileSection from "../ProfileSection/ProfileSection";
import SubmissionSection from "../SubmitSection/SubmitSection";
import "./AppMain.css";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const AppMain = () => {
  const history = useHistory();
  const [dashboardDetails, setDashboardDetails] = useState({});
  const [teamDetails, setTeamDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorSnack, setErrorSnack] = useState(false);
  const [errorText, setErrorText] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const joinViaInvite = async (toJoin) => {
    let url = `${process.env.REACT_APP_BACKEND_URL}/user/joinInvite`;
    const token = localStorage.getItem("authToken");
    let captcha = await executeRecaptcha("/");

    const data = {
      code: toJoin.code,
      email: toJoin.email,
      captcha,
    };

    try {
      await axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      const status = error.response.status;
      if (status === 405) {
        setErrorText("This account was not invited for the team");
      } else if (status === 403) {
        setErrorText("Cannot accept invitation! Already in a team!");
      } else if (status === 407) {
        setErrorText("Cannot accept invitation! Team is full!");
      } else if (status === 404) {
        setErrorText("Invite team not found!");
      } else {
        setErrorText("There was some error with the");
      }

      setErrorSnack(true);
    }

    localStorage.removeItem("toJoin");
  };

  const setupApp = async (noLoad) => {
    if (!noLoad) {
      setLoading(true);
    }

    let url = `${process.env.REACT_APP_BACKEND_URL}/user/getProfile`;
    const token = localStorage.getItem("authToken");

    try {
      await axios
        .get(url, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setDashboardDetails(res.data.user);
        });
    } catch (error) {
      console.log(error);
      localStorage.removeItem("authToken");
      history.replace("/");
      return;
    }

    url = `${process.env.REACT_APP_BACKEND_URL}/team/user`;

    try {
      await axios
        .get(url, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setTeamDetails(res.data);
        });
    } catch (error) {
      console.log(error);
      localStorage.removeItem("authToken");
      history.replace("/");
      return;
    }

    const toJoin = JSON.parse(localStorage.getItem("toJoin"));

    if (toJoin) {
      await joinViaInvite(toJoin);
      await setupApp();
    }

    if (!noLoad) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      history.replace("/"); //if there is no token take the user back to home page
    }

    setupApp();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <TopNav data={dashboardDetails} />
      <div className="all-container">
        <Switch>
          <Route
            exact
            path="/app/dashboard"
            component={(props) => <Dashboard {...props} data={teamDetails} refresh={setupApp} />}
          ></Route>
          <Route
            exact
            path="/app/team"
            component={(props) => (
              <Team {...props} data={teamDetails} refresh={setupApp} profile={dashboardDetails} />
            )}
          ></Route>
          <Route
            exact
            path="/app/submission"
            component={(props) => <Submission {...props} data={teamDetails} refresh={setupApp} />}
          ></Route>
          <Route
            path="/app/profile"
            component={(props) => (
              <ProfileSection {...props} data={dashboardDetails} refresh={setupApp} />
            )}
          ></Route>
          {/* <Route
            path="/app/submission"
            component={(props) => (
              <SubmissionSection {...props} data={dashboardDetails} refresh={setupApp} />
            )}
          ></Route> */}
        </Switch>
      </div>
      <BottomNav />
      <Snackbar
        open={errorSnack}
        onClose={() => setErrorSnack(false)}
        autoHideDuration={3000}
        className="snackbar"
      >
        <Alert variant="filled" severity="error" onClose={() => setErrorSnack(false)}>
          {errorText}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AppMain;
