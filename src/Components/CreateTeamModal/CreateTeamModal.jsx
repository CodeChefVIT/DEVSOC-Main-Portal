import { CircularProgress, Dialog, DialogContent, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./CreateTeamModal.css";

const CreateTeamModal = ({ open, handleClose, refresh }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false);
  const [errorText, setErrorText] = useState("");

  const submit = async (data) => {
    setLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/team/make`;
    const token = localStorage.getItem("authToken");
    try {
      await axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          handleClose();
          refresh();
        });
    } catch (error) {
      const status = error.response.status;

      if (status === 403) {
        setErrorText("Team name taken");
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
        <h3>Enter team name</h3>
        <form onSubmit={handleSubmit(submit)}>
          <div className="team-name">
            <input
              placeholder="Team name"
              {...register("name", { required: true, maxLength: 30 })}
              className="modal-input"
            />
            {errors.name && (
              <span className="team-error">Please enter valid team name! (max length is 30)</span>
            )}
          </div>
          <div className="create-btn-div">
            <button className="team-primary-btn modal-input" type="submit">
              {loading ? <CircularProgress color="secondary" size={24} /> : "Create a team"}
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
    </Dialog>
  );
};

export default CreateTeamModal;
