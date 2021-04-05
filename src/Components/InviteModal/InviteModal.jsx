import { CircularProgress, Dialog, DialogContent } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DataUsageRounded } from "@material-ui/icons";

const InviteModal = ({ open, handleClose, refresh, data }) => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submit = async (formData) => {
    setLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/sendInvite`;
    const token = localStorage.getItem("authToken");

    const dat = {
      teamId: data.teams._id,
      inviteEmail: formData.email,
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
          // handleClose();
          // refresh(true);
        });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} className="create-team-modal" fullWidth>
      <DialogContent>
        <h3>Enter invite email</h3>
        <form onSubmit={handleSubmit(submit)}>
          <div className="team-name">
            <input
              type="email"
              placeholder="Member email"
              {...register("email", { required: true })}
              className="modal-input"
            />
            {errors.email && <span className="team-error">Please enter a valid email!</span>}
          </div>
          <div className="create-btn-div">
            <button className="team-primary-btn modal-input" type="submit">
              {loading ? <CircularProgress color="secondary" size={24} /> : "Invite!"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
