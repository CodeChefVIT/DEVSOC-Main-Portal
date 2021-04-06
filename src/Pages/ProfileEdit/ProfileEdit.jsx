import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./ProfileEdit.css";
import Grid from "@material-ui/core/Grid";
import salty from "./Saly-14.svg";
import { CircularProgress, Hidden, Snackbar } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";
import { Alert } from "@material-ui/lab";

export default function ProfileEdit({ data, refresh }) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [successSnack, setSuccessSnack] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false);
  const [errorText, setErrorText] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    var update = {
      college: data.college,
      bio: data.bio,
      name: data.name,
      mobile: data.mobile,
      address: {
        line1: data.line1,
        line2: data.line2,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        country: data.country,
      },
      personal: {
        website: data.website,
        resume: data.resume,
        github: data.github,
        linkedin: data.linkedin,
        tshirt: data.tshirt,
      },
    };
    const token = localStorage.getItem("authToken");
    try {
      await axios
        .patch(`${process.env.REACT_APP_BACKEND_URL}/user/update`, update, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {
          console.log(data);
          setSuccessSnack(true);
          refresh(true);
        });
    } catch (error) {
      setErrorText("Something went wrong, please try again!");
      setErrorSnack(true);
    }
    setLoading(false);
  };

  const initialise = () => {
    setValue("name", data.name);
    setValue("college", data.college);
    setValue("mobile", data.mobile);
    if (data.address) {
      setValue("line1", data.address.line1);
      setValue("line2", data.address.line2);
      setValue("city", data.address.city);
      setValue("state", data.address.state);
      setValue("pincode", data.address.pincode);
      setValue("country", data.address.country);
    }
    if (data.personal) {
      setValue("website", data.personal.website);
      setValue("resume", data.personal.resume);
      setValue("github", data.personal.github);
      setValue("linkedin", data.personal.linkedin);
      setValue("tshirt", data.personal.tshirt);
    }
    setValue("bio", data.bio);
  };

  useEffect(() => {
    initialise();
  }, []);

  return (
    <div className="team-joined-div">
      <Grid container spacing={3}>
        <Grid item md={12} lg={8} style={{ paddingBottom: 80 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <input
                  {...register("name", { required: true, maxLength: 30 })}
                  placeholder="Name"
                  className="TopLabels"
                />
                {errors.name && <span className="team-error">This field is required!</span>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  {...register("line1", { required: true, maxLength: 200 })}
                  placeholder="Address line 1"
                  className="TopLabels"
                />
                {errors.line1 && <span className="team-error">This field is required!</span>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  type="number"
                  {...register("mobile", { required: true, maxLength: 15, minLength: 6 })}
                  placeholder="Mobile"
                  className="TopLabels"
                />
                {errors.number && (
                  <span className="team-error">Please enter a valid phone number!</span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  {...register("line2", { maxLength: 100 })}
                  placeholder="Address line 2"
                  className="TopLabels"
                />
                {errors.line2 && <span className="team-error">Max 100 characters only</span>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  type="url"
                  {...register("website", { type: "url", maxLength: 200 })}
                  placeholder="Personal Website(optional)"
                  className="TopLabels"
                />
                {errors.website && <span className="team-error">Please enter a valid url!</span>}
              </Grid>
              <Grid item xs={12} sm={3}>
                <input
                  {...register("city", { required: true, maxLength: 30 })}
                  placeholder="City"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
                {errors.city && (
                  <span className="team-error">Please fill this field! Max 30 characters.</span>
                )}
              </Grid>
              <Grid item xs={12} sm={3}>
                <input
                  {...register("state", { required: true, maxLength: 30 })}
                  placeholder="State"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
                {errors.state && (
                  <span className="team-error">Please fill this field! Max 30 characters.</span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  type="text"
                  {...register("college", { required: true, maxLength: 100 })}
                  className="TopLabels"
                  placeholder="College Name"
                />
                {errors.college && <span className="team-error">Please fill this field!</span>}
              </Grid>
              <Grid item xs={12} sm={3}>
                <input
                  {...register("pincode", {
                    required: "Time",
                    maxLength: 6,
                    minLength: 6,
                    pattern: /^[0-9]{6}$/,
                  })}
                  placeholder="Pincode"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
                {errors.pincode && <span className="team-error">Invalid Pin Code!</span>}
              </Grid>
              <Grid item xs={12} sm={3}>
                <input
                  {...register("country", { required: true, maxLength: 100 })}
                  placeholder="Country"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
                {errors.country && <span className="team-error">Please fill this field!</span>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  type="url"
                  {...register("resume", { required: true, maxLength: 200 })}
                  placeholder="Resume Link"
                  className="TopLabels"
                />
                {errors.resume && <span className="team-error">Invalid Url!</span>}
              </Grid>
              <Grid item xs={12} sm={3}>
                <input
                  type="url"
                  {...register("github", { required: true, maxLength: 200 })}
                  placeholder="Github Link"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
                {errors.github && <span className="team-error">Invalid Url!</span>}
              </Grid>
              <Grid item xs={12} sm={3}>
                <input
                  type="url"
                  {...register("linkedin", { required: true, maxLength: 200 })}
                  placeholder="LinkedIn Link"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
                {errors.linkedin && <span className="team-error">Invalid Url!</span>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <textarea
                  {...register("bio", { required: true, maxLength: 500 })}
                  rows={4}
                  placeholder="Bio"
                  className="LowerLabels"
                />
                {errors.bio && <span className="team-error">Please fill this field!</span>}
              </Grid>
              <Grid item container sm={6} justify="center" alignItems="center">
                <select
                  {...register("tshirt", { required: true })}
                  placeholder="Tshirt Size"
                  className="LowerLabels"
                >
                  <option value="S">T-Shirt Size: S</option>
                  <option value="M">T-Shirt Size: M</option>
                  <option value="L">T-Shirt Size: L</option>
                  <option value="XL">T-Shirt Size: XL</option>
                </select>
                {errors.tshirt && <span className="team-error">Please Select a size!</span>}
                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? <CircularProgress color="secondary" size={24} /> : "Update Profile"}
                </button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      <Hidden mdDown>
        <Grid item md={6}>
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              height: "auto",
              position: "fixed",
              bottom: "0",
              right: "0",
              zIndex: -1,
            }}
            src={salty}
            alt={"image"}
            className="From-img"
          />
        </Grid>
      </Hidden>
      <Snackbar
        open={successSnack}
        onClose={() => setSuccessSnack(false)}
        autoHideDuration={3000}
        className="snackbar"
      >
        <Alert variant="filled" severity="success" onClose={() => setSuccessSnack(false)}>
          Profile updated successfully!
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
    </div>
  );
}
