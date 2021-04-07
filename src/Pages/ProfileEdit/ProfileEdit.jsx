import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./ProfileEdit.css";
import Grid from "@material-ui/core/Grid";
import salty from "./Saly-14.svg";
import {
  CircularProgress,
  Hidden,
  MenuItem,
  Snackbar,
  withStyles,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";
import { Alert } from "@material-ui/lab";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const TextInput = withStyles({
  root: {
    width: "100%",
    borderRadius: 14,
    backgroundColor: "#1c006f",
    "& .MuiInputBase-input": {
      fontFamily: "Montserrat",
      borderRadius: 16,
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#cdcdcd !important",
    },
    "& .MuiFormLabel-filled:not(.Mui-focused)": {
      paddingTop: 10,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 14,
        borderColor: "#1c006f",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cdcdcd !important",
      },
    },
  },
})(TextField);

export default function ProfileEdit({ data, refresh }) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    getValues,
  } = useForm();

  const history = useHistory();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [loading, setLoading] = useState(false);
  const [successSnack, setSuccessSnack] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false);
  const [errorText, setErrorText] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    let captcha = await executeRecaptcha("/");
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
        discord: {
          nickname: data.discordUser,
          hash: data.discordHash,
        },
      },
      captcha,
    };
    console.log(update);
    const token = localStorage.getItem("authToken");
    try {
      await axios
        .patch(`${process.env.REACT_APP_BACKEND_URL}/user/update`, update, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {
          console.log(data);
          setSuccessSnack(true);
          // refresh(true);
          history.push("/app/profile");
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
      setValue("discordUser", data.personal.discord.nickname);
      setValue("discordHash", data.personal.discord.hash);
    }
    setValue("bio", data.bio);
  };

  useEffect(() => {
    initialise();
  }, []);

  return (
    <div className="team-joined-div">
      <Grid container>
        <Grid item sm={12} md={8} lg={6}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ marginBottom: 15 }}
            onChange={() => {
              console.log({ errors, vals: getValues() });
            }}
          >
            <Grid container spacing={2} justify="flex-start" alignItems="flex-start">
              <Grid item container xs={12} sm={6} spacing={1}>
                <Grid item xs={12}>
                  <TextInput
                    label="Name"
                    variant="outlined"
                    inputProps={{ ...register("name", { required: true, maxLength: 30 }) }}
                  />
                  {errors.name && <span className="team-error">This field is required!</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="Phone Number"
                    inputProps={{
                      ...register("mobile", { required: true, maxLength: 15, minLength: 7 }),
                    }}
                  />
                  {errors.mobile && (
                    <span className="team-error">Please enter a valid phone number!</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="Personal Website(optional)"
                    inputProps={{ ...register("website", { type: "url", maxLength: 200 }) }}
                  />
                  {errors.website && <span className="team-error">Please enter a valid url!</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="College"
                    inputProps={{ ...register("college", { required: true, maxLength: 100 }) }}
                  />
                  {errors.college && <span className="team-error">Please fill this field!</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="Resume Link"
                    inputProps={{ ...register("resume", { required: true, maxLength: 200 }) }}
                  />
                  {errors.resume && <span className="team-error">Invalid Url!</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="Github Profile"
                    inputProps={{ ...register("github", { required: true, maxLength: 50 }) }}
                  />
                  {errors.github && <span className="team-error">Invalid Url!</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="LinkedIn Profile"
                    inputProps={{ ...register("linkedin", { required: true, maxLength: 60 }) }}
                  />
                  {errors.linkedin && <span className="team-error">Invalid Url!</span>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput
                    variant="outlined"
                    label="Discord Username"
                    inputProps={{ ...register("discordUser", { required: true, maxLength: 30 }) }}
                  />
                  {errors.linkedin && <span className="team-error">Invalid Url!</span>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput
                    variant="outlined"
                    label="Discord Hash"
                    inputProps={{ ...register("discordHash", { required: true, maxLength: 4 }) }}
                  />
                  {errors.linkedin && <span className="team-error">Invalid Url!</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    multiline
                    variant="outlined"
                    label="Bio"
                    inputProps={{ ...register("bio", { required: true, maxLength: 500 }) }}
                    rows={4}
                  />
                  {errors.bio && <span className="team-error">Please fill this field!</span>}
                </Grid>
              </Grid>
              <Grid item container xs={12} sm={6} spacing={1}>
                <Grid item xs={12}>
                  <TextInput
                    label="Address Line 1"
                    variant="outlined"
                    inputProps={{ ...register("line1", { required: true, maxLength: 200 }) }}
                  />
                  {errors.line1 && <span className="team-error">This field is required!</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="Address Line 2"
                    inputProps={{ ...register("line2", { maxLength: 100 }) }}
                  />
                  {errors.line2 && <span className="team-error">Max 100 characters only</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="City"
                    inputProps={{ ...register("city", { required: true, maxLength: 30 }) }}
                  />
                  {errors.city && (
                    <span className="team-error">Please fill this field! Max 30 characters.</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="State"
                    inputProps={{ ...register("state", { required: true, maxLength: 30 }) }}
                  />
                  {errors.state && (
                    <span className="team-error">Please fill this field! Max 30 characters.</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="Pincode"
                    inputProps={{
                      ...register("pincode", {
                        required: "Time",
                        maxLength: 6,
                        minLength: 6,
                        pattern: /^[0-9]{6}$/,
                      }),
                    }}
                  />
                  {errors.pincode && <span className="team-error">Invalid Pin Code!</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="Country"
                    inputProps={{ ...register("country", { required: true, maxLength: 100 }) }}
                  />
                  {errors.country && <span className="team-error">Please fill this field!</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    select
                    label="T Shirt Size"
                    variant="outlined"
                    inputProps={{ ...register("tshirt", { required: true }) }}
                  >
                    <MenuItem key={0} value="S">
                      T-Shirt Size: S/36
                    </MenuItem>
                    <MenuItem key={1} value="M">
                      T-Shirt Size: M/38
                    </MenuItem>
                    <MenuItem key={2} value="L">
                      T-Shirt Size: L/40
                    </MenuItem>
                    <MenuItem key={3} value="XL">
                      T-Shirt Size: XL/42
                    </MenuItem>
                    <MenuItem key={4} value="XXL">
                      T-Shirt Size: XXL/44
                    </MenuItem>
                  </TextInput>
                  {errors.tshirt && <span className="team-error">Please Select a size!</span>}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} spacing={4}>
                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? <CircularProgress color="secondary" size={24} /> : "Update Profile"}
                </button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      <Hidden xsDown>
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
