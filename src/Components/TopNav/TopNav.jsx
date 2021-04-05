import { SvgIcon } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./TopNav.css";

function TopNav() {
  const history = useHistory();
  const path = history.location.pathname;
  return (
    <div>
      <h1 className="devsoc21">DEVSOC'21</h1>
      <h1 className="page-title">
        {path === "/app/team"
          ? "My Team"
          : path === "/app/dashboard"
          ? "Dashboard"
          : path === "/app/submission"
          ? "My Submission"
          : path === "/app/profile" || path === "/app/profile/edit" 
          ? "Profile"
          : ""}
      </h1>
      <Link to={path === "/app/profile" ? "/app/dashboard" : "/app/profile"} className="user-btn">
        <SvgIcon viewBox="0 0 44 44" fill="none">
          <path
            d="M36.6666 38.5V34.8333C36.6666 32.8884 35.894 31.0232 34.5187 29.6479C33.1434 28.2726 31.2782 27.5 29.3333 27.5H14.6666C12.7217 27.5 10.8564 28.2726 9.48114 29.6479C8.10587 31.0232 7.33325 32.8884 7.33325 34.8333V38.5"
            stroke="url(#paint0_linear)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M22.0001 20.1667C26.0502 20.1667 29.3334 16.8834 29.3334 12.8333C29.3334 8.78325 26.0502 5.5 22.0001 5.5C17.95 5.5 14.6667 8.78325 14.6667 12.8333C14.6667 16.8834 17.95 20.1667 22.0001 20.1667Z"
            stroke="url(#paint1_linear)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="21.9999"
              y1="27.5"
              x2="21.9999"
              y2="38.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#3051FF" />
              <stop offset="1" stop-color="#62D9FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="22.0001"
              y1="5.5"
              x2="22.0001"
              y2="20.1667"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#3051FF" />
              <stop offset="1" stop-color="#62D9FF" />
            </linearGradient>
          </defs>
        </SvgIcon>
      </Link>
    </div>
  );
}

export default TopNav;
