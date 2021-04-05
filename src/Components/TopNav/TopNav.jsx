import { Avatar, Dialog, DialogContent, SvgIcon } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./TopNav.css";

function TopNav({ data }) {
  const history = useHistory();
  const path = history.location.pathname;

  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: "0 3%" }}>
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
      <button
        className="user-btn"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Avatar alt={data.name} variant="circular" src={data.avatar} />
      </button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        className="create-team-modal"
        fullWidth
      >
        <DialogContent>
          <h3>Hello, {data.name}</h3>
          <Link to="/app/profile" style={{ textDecoration: "none" }}>
            <button className="team-primary-btn modal-input">
              <SvgIcon viewBox="0 0 44 44" fill="none">
                <path
                  d="M36.6666 38.5V34.8333C36.6666 32.8884 35.894 31.0232 34.5187 29.6479C33.1434 28.2726 31.2782 27.5 29.3333 27.5H14.6666C12.7217 27.5 10.8564 28.2726 9.48114 29.6479C8.10587 31.0232 7.33325 32.8884 7.33325 34.8333V38.5"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M22.0001 20.1667C26.0502 20.1667 29.3334 16.8834 29.3334 12.8333C29.3334 8.78325 26.0502 5.5 22.0001 5.5C17.95 5.5 14.6667 8.78325 14.6667 12.8333C14.6667 16.8834 17.95 20.1667 22.0001 20.1667Z"
                  stroke="white"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </SvgIcon>
              Profile
            </button>
          </Link>
          <button
            className="team-primary-btn modal-input"
            onClick={() => {
              localStorage.clear();
              history.push("/");
            }}
          >
            <SvgIcon viewBox="0 0 49 44">
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M25.125 29.75V32.0625C25.125 33.9024 24.3941 35.667 23.0931 36.9681C21.792 38.2691 20.0274 39 18.1875 39H8.9375C7.09756 39 5.33298 38.2691 4.03195 36.9681C2.73091 35.667 2 33.9024 2 32.0625V8.9375C2 7.09756 2.73091 5.33298 4.03195 4.03195C5.33298 2.73091 7.09756 2 8.9375 2H18.1875C20.0274 2 21.792 2.73091 23.0931 4.03195C24.3941 5.33298 25.125 7.09756 25.125 8.9375V11.25M34.375 29.75L43.625 20.5L34.375 29.75ZM43.625 20.5L34.375 11.25L43.625 20.5ZM43.625 20.5H11.25H43.625Z"
                stroke="white"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </SvgIcon>
            Logout
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TopNav;
