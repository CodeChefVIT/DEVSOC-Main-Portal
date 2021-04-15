import { CircularProgress, Dialog, DialogContent, Snackbar } from "@material-ui/core";
import { Done, FilterNone } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import "./InviteModal.css";

const InviteModal = ({ open, handleClose, data }) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [successSnack, setSuccessSnack] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false);
  const [errorText, setErrorText] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(data.teams.code)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const { executeRecaptcha } = useGoogleReCaptcha();
  const submit = async (formData) => {
    setLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/sendInvite`;
    const token = localStorage.getItem("authToken");
    let captcha = await executeRecaptcha("/");

    const dat = {
      teamId: data.teams._id,
      inviteEmail: formData.email,
      captcha,
    };

    try {
      await axios
        .post(url, dat, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res);
          setSuccessSnack(true);
          reset();
        });
    } catch (error) {
      const status = error.response.status;

      if (status === 403) {
        setErrorText("User already in a team");
      } else if (status === 410) {
        setErrorText("User already invited");
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
      className="create-team-modal invite-modal"
      fullWidth
      PaperProps={{ className: "dialog-paper" }}
    >
      <DialogContent>
        <h3>Enter invite email</h3>
        <form onSubmit={handleSubmit(submit)}>
          <div className="team-name" style={{ marginBottom: 20 }}>
            <input
              type="email"
              placeholder="Member email"
              {...register("email", { required: true })}
              className="modal-input"
              id="email-input"
            />
            {errors.email && <span className="team-error">Please enter a valid email!</span>}
          </div>
          <div className="create-btn-div">
            <button
              className="team-primary-btn modal-input"
              type="submit"
              style={{ marginBottom: "10px", width: "100%" }}
              disabled={loading}
            >
              {loading ? <CircularProgress color="secondary" size={24} /> : "Invite!"}
            </button>
          </div>
        </form>
        {/* <p>or</p> */}
        <h3 style={{ marginBottom: 30 }}>or use invite code</h3>
        <input
          value={data.teams.code}
          readOnly
          className="modal-input"
          style={{ marginBottom: "20px", cursor: "pointer" }}
          onClick={handleCopy}
        />
        <button
          className="team-secondary-btn modal-input"
          type="submit"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "30px",
          }}
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Done style={{ marginRight: "10px" }} /> Copied!
            </>
          ) : (
            <>
              <FilterNone style={{ marginRight: "10px" }} /> Copy Code
            </>
          )}
        </button>
      </DialogContent>
      <Snackbar
        open={successSnack}
        onClose={() => setSuccessSnack(false)}
        autoHideDuration={3000}
        className="snackbar"
      >
        <Alert variant="filled" severity="success" onClose={() => setSuccessSnack(false)}>
          Invite sent successfully!
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

export default InviteModal;
