import { CircularProgress, Dialog, DialogContent } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const JoinTeamModal = ({ open, handleClose, refresh }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/team/join`;
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
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className="create-team-modal" fullWidth>
      <DialogContent>
        <h3>Enter team code</h3>
        <form onSubmit={handleSubmit(submit)}>
          <div className="team-name">
            <input
              placeholder="Team code"
              {...register("code", { required: true, maxLength: 5, minLength: 5 })}
            />
            {errors.code && <span className="team-error">Please enter valid team code!</span>}
          </div>
          <div className="create-btn-div">
            <button className="team-primary-btn modal-input" type="submit">
              {loading ? <CircularProgress color="secondary" size={24} /> : "Join team!"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinTeamModal;
