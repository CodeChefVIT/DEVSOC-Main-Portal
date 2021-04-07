import { Dialog, DialogContent, IconButton, Snackbar } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import "./RemoveMember.css";

const RemoveMember = ({ open, handleClose, data, refresh }) => {
  const [successSnack, setSuccessSnack] = useState(false);
  const [infoSnack, setInfoSnack] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false);
  const [errorText, setErrorText] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const removeUser = async (user) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/team/removeUser`;
    const token = localStorage.getItem("authToken");
    let captcha = await executeRecaptcha("/");

    const dat = {
      remove: user._id,
      teamId: data.teams._id,
      captcha,
    };

    setInfoSnack(true);
    try {
      await axios
        .post(url, dat, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res);
          refresh(true);
          setSuccessSnack(true);
        });
    } catch (error) {
      // console.log(error);
      setErrorText("Something went wrong! Please try again!");
      setErrorSnack(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      className="create-team-modal remove-modal"
      PaperProps={{ className: "dialog-paper remove-paper" }}
    >
      <DialogContent style={{ width: "90%", paddingBottom: "40px" }}>
        <h3>Remove team members</h3>
        <div className="to-be-removed-div">
          {data.teams.users.length > 1 ? (
            data.teams.users.map((user, i) =>
              user._id !== data.teams.leader._id ? (
                <div className="team-member-rem" key={i}>
                  <h2 className="member-rem">{user.name}</h2>
                  <IconButton className="remove-icon-btn" onClick={() => removeUser(user)}>
                    <Delete />
                  </IconButton>
                </div>
              ) : null
            )
          ) : (
            <h1 style={{ fontWeight: "normal", fontSize: "1.8rem", color: "#3500d4" }}>
              You are alone :(
            </h1>
          )}
        </div>
      </DialogContent>
      <Snackbar
        open={infoSnack}
        onClose={() => setInfoSnack(false)}
        autoHideDuration={3000}
        className="snackbar"
      >
        <Alert variant="filled" severity="info" onClose={() => setInfoSnack(false)}>
          Removing team member
        </Alert>
      </Snackbar>
      <Snackbar
        open={successSnack}
        onClose={() => setSuccessSnack(false)}
        autoHideDuration={3000}
        className="snackbar"
      >
        <Alert variant="filled" severity="success" onClose={() => setSuccessSnack(false)}>
          Member removed successfully!
        </Alert>
      </Snackbar>
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
    </Dialog>
  );
};

export default RemoveMember;
