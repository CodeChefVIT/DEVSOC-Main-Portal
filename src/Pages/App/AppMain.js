import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import Team from "../Team/Team";
import BottomNav from "../../Components/BottomNav/BottomNav";
import Dashboard from "../Dashboard/Dashboard";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import TopNav from "../../Components/TopNav/TopNav";
import Submission from "../Submission/Submission";

const AppMain = () => {
  const history = useHistory();
  const [dashboardDetails, setDashboardDetails] = useState({});
  const [teamDetails, setTeamDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const setupApp = async () => {
    setLoading(true);
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
    }

    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      history.replace("/");
    }

    setupApp();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <TopNav />
      <div className="all-container" style={{ height: "100%" }}>
        <Switch>
          <Route
            exact
            path="/app/dashboard"
            component={(props) => <Dashboard {...props} data={dashboardDetails} />}
          ></Route>
          <Route
            exact
            path="/app/team"
            component={(props) => <Team {...props} data={teamDetails} refresh={setupApp} />}
          ></Route>
          <Route
            exact
            path="/app/submission"
            component={(props) => <Submission {...props} data={teamDetails} refresh={setupApp} />}
          ></Route>
        </Switch>
      </div>
      <BottomNav />
    </>
  );
};

export default AppMain;
