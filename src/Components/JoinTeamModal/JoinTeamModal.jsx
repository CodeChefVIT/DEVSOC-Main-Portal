import { CircularProgress, Dialog, DialogContent, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";

const JoinTeamModal = ({ open, handleClose, refresh }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false);
  const [errorText, setErrorText] = useState("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const submit = async (data) => {
    setLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/team/join`;
    const token = localStorage.getItem("authToken");
    let captcha = await executeRecaptcha("/");

    data = { ...data, captcha };
    data.code = data.code.toUpperCase();
    // console.log(data);

    try {
      await axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res);
          handleClose();
          refresh();
        });
    } catch (error) {
      const status = error.response.status;

      if (status === 404) {
        setErrorText("Team not found");
      } else if (status === 403) {
        setErrorText("You are already in a team");
      } else if (status === 405) {
        setErrorText("Team is full");
      } else {
        setErrorText("There was some error. Please try again!");
      }

      setErrorSnack(true);
    }
    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="create-team-modal"
      fullWidth
      PaperProps={{ className: "dialog-paper" }}
    >
      <DialogContent>
        <h3 style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}>Enter team code</h3>
        <form onSubmit={handleSubmit(submit)}>
          <div className="team-name">
            <input
              placeholder="Team code"
              {...register("code", { required: true, maxLength: 5, minLength: 5 })}
              className="modal-input"
            />
            {errors.code && <span className="team-error">Please enter a valid team code!</span>}
          </div>
          <div className="create-btn-div">
            <button className="team-primary-btn modal-input" type="submit" disabled={loading}>
              {loading ? <CircularProgress color="secondary" size={24} /> : "Join team!"}
            </button>
          </div>
        </form>
      </DialogContent>
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
    </Dialog >
  );
};

export default JoinTeamModal;
