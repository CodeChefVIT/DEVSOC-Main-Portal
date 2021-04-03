import { ButtonBase, Hidden } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./BottomNav.css";

function BottomNav(props) {
  const history = useHistory();

  useEffect(() => {
    console.log(history.location.pathname);
  }, [history.location]);
  return (
    <div className="app-nav">
      <div className="nav-tab-div">
        <div className="nav-tabs-container">
          <Link
            to="/app/team"
            className={`nav-tab ${history.location.pathname === "/app/team" ? "active" : null}`}
          >
            <Home />
          </Link>
          <Link
            to="/app/dashboard"
            className={`nav-tab ${
              history.location.pathname === "/app/dashboard" ? "active" : null
            }`}
          >
            <Home />
          </Link>
          <Link
            to="/app/submission"
            className={`nav-tab ${
              history.location.pathname === "/app/submission" ? "active" : null
            }`}
          >
            <Home />
          </Link>
          <a
            className="nav-tab"
            onClick={() => {
              localStorage.clear();
              history.push("/");
            }}
          >
            <Home />
          </a>
        </div>
      </div>
    </div>
  );
}

export default BottomNav;
