import { CircularProgress, Dialog, DialogContent } from "@material-ui/core";
import { Done, FilterNone } from "@material-ui/icons";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./InviteModal.css";

const InviteModal = ({ open, handleClose, data }) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
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
      .catch((err) => console.log(err));
  };

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
          document.getElementById("email-input").value = "";
        });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} className="create-team-modal invite-modal" fullWidth>
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
          style={{ marginBottom: "20px" }}
        />
        <button
          className="team-secondary-btn modal-input"
          type="submit"
          style={{
            marginBottom: "10px",
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
    </Dialog>
  );
};

export default InviteModal;
