import { Dialog, DialogContent, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import axios from "axios";
import React from "react";
import "./RemoveMember.css";

const RemoveMember = ({ open, handleClose, data, refresh }) => {
  const removeUser = async (user) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/team/removeUser`;
    const token = localStorage.getItem("authToken");

    const dat = {
      remove: user._id,
      teamId: data.teams._id,
    };

    try {
      await axios
        .post(url, dat, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          refresh(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth className="create-team-modal remove-modal">
      <DialogContent style={{ width: "90%", paddingBottom: "40px" }}>
        <h3>Remove team members</h3>
        <div className="to-be-removed-div">
          {data.teams.users.map((user, i) => (
            <div className="team-member-rem" key={i}>
              <h2 className="member-rem">{user.name}</h2>
              <IconButton className="remove-icon-btn" onClick={() => removeUser(user)}>
                <Delete />
              </IconButton>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveMember;
