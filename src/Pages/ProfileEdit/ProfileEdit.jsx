import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./ProfileEdit.css";
import Grid from "@material-ui/core/Grid";
import salty from "./Profile.png";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Hidden,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";
import { Alert } from "@material-ui/lab";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import TextInput from "../../Components/TextInput/TextInput";
import NavigationPrompt from "react-router-navigation-prompt";

export default function ProfileEdit({ data, refresh }) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();

  const history = useHistory();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [loading, setLoading] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
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
      regNumber: data.regno,
      collegeYear: data.year,
      captcha,
    };
    // console.log(update);
    const token = localStorage.getItem("authToken");
    try {
      await axios
        .patch(`${process.env.REACT_APP_BACKEND_URL}/user/update`, update, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {
          // console.log(data);
          setSuccessSnack(true);
          setFirstTime(false);
          refresh(true);
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
    setValue("regno", data.regNumber);
    setValue("year", data.collegeYear);
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
      // setValue("tshirt", data.personal.tshirt);  // Don't know why it doesn't work
      if (data.personal.discord) {
        setValue("discordUser", data.personal.discord.nickname);
        setValue("discordHash", data.personal.discord.hash);
      }
    }
    setValue("bio", data.bio);
    if (!data.is_profile_completed) {
      setFirstTime(true);
    }
  };

  useEffect(() => {
    initialise();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="team-joined-div">
      <img
        style={{
          height: "100vh",
          margin: "0",
          width: "100vw",
          padding: "0",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",


          position: "fixed",
          bottom: "0",
          right: "0",
          zIndex: -1,
        }}
        src={salty}
        alt={""}
        className="From-img"
      />
      <div style={{ fontSize: "1.3rem", marginBottom: 10 }}>
        {data.is_profile_completed ? "" : "Please Complete your profile to navigate to other pages"}
      </div>
      <Grid container>
        <Grid item xs={12} md={8} lg={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} justify="flex-start" alignItems="flex-start">
              <Grid item container xs={12} sm={6} spacing={2}>
                <Grid item xs={12} style={{ paddingTop: 12 }}>
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
                    placeholder="without country code"
                  />
                  {errors.mobile && (
                    <span className="team-error">Please enter a valid phone number!</span>
                  )}
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
                    label="Year of Study"
                    select
                    defaultValue={data?.collegeYear}
                    inputProps={{
                      ...register("year", {
                        required: { value: true, message: "Required" },
                      }),
                    }}
                  >
                    <MenuItem key={0} value="1">
                      First Year
                    </MenuItem>
                    <MenuItem key={1} value="2">
                      Second Year
                    </MenuItem>
                    <MenuItem key={2} value="3">
                      Third Year
                    </MenuItem>
                    <MenuItem key={3} value="4">
                      Fourth Year
                    </MenuItem>
                    <MenuItem key={4} value="5">
                      Fifth Year
                    </MenuItem>
                  </TextInput>
                  {errors.year && <span className="team-error">{errors.year.message}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="Registration No"
                    inputProps={{
                      ...register("regno"),
                    }}
                  />
                  {errors.regno && <span className="team-error">{errors.regno.message}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="Github Profile"
                    inputProps={{
                      ...register("github", {
                        required: true,
                        maxLength: 50,
                        pattern: /^(https?:\/\/)?(www\.)?github.com\/[a-zA-Z0-9-]+\/?$/,
                      }),
                    }}
                  />
                  {errors.github && <span className="team-error">Invalid Github Profile Url!</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="LinkedIn Profile"
                    inputProps={{
                      ...register("linkedin", {
                        required: true,
                        maxLength: 60,
                        pattern: /^(https?:\/\/)?(www\.)?linkedin.com\/in\/[a-zA-Z0-9-]+\/?$/,
                      }),
                    }}
                  />
                  {errors.linkedin && (
                    <span className="team-error">Invalid LinkedIn Profile Url!</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput
                    variant="outlined"
                    label="Discord username"
                    inputProps={{ ...register("discordUser", { required: true, maxLength: 30 }) }}
                    style={{ fontSize: "0.75rem" }}
                  />
                  {errors.discordUser && (
                    <span className="team-error">Please fill this field!</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput
                    variant="outlined"
                    label="Discord Hash"
                    inputProps={{
                      ...register("discordHash", {
                        required: true,
                        minLength: 4,
                        maxLength: 4,
                        pattern: /^\d{4}$/,
                      }),
                    }}
                  />
                  {errors.discordHash && (
                    <span className="team-error">Enter only the 4 digits without hash!</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    multiline
                    variant="outlined"
                    label="Bio"
                    inputProps={{
                      ...register("bio", {
                        required: { value: true, message: "Please fill this field!" },
                        maxLength: { value: 500, message: "Max 500 characters only!" },
                      }),
                    }}
                    rows={4}
                  />
                  {errors.bio && <span className="team-error">{errors.bio.message}</span>}
                </Grid>
              </Grid>
              <Grid item container xs={12} sm={6} spacing={2}>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="Personal Website(optional)"
                    inputProps={{
                      ...register("website", {
                        maxLength: { value: 200, message: "Too long.. consider shotening url" },
                        pattern: {
                          value: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
                          message: "Invalid Url!",
                        },
                      }),
                    }}
                  />
                  {errors.website && <span className="team-error">{errors.website.message}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    variant="outlined"
                    label="Resume Link"
                    inputProps={{
                      ...register("resume", {
                        required: true,
                        maxLength: { value: 200, message: "Too long.. consider shotening url" },
                        pattern: {
                          value: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
                          message: "Invalid Url!",
                        },
                      }),
                    }}
                  />
                  {errors.resume && <span className="team-error">{errors.resume.message}</span>}
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 12 }}>
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
                    defaultValue={data.personal.tshirt}
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
              <Grid item container xs={12} sm={6}>
                <button className="team-primary-btn submit-btn" type="submit" disabled={loading}>
                  {loading ? <CircularProgress color="secondary" size={24} /> : "Update Profile"}
                </button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      <Hidden xsDown>
        <Grid item md={6}>

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
      <NavigationPrompt when={firstTime}>
        {({ onConfirm, onCancel }) => (
          <React.Fragment>
            <Dialog
              open={firstTime}
              keepMounted
              onClose={() => { }}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">Wait!</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Complete your profile in order to navigate to other sections
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={onCancel} color="primary">
                  Complete my profile
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )}
      </NavigationPrompt>
      {/* <Prompt
        message={(location, action) => {
          if (firstTime)
            return "You need to update profile for idea submission. Do you still want to navigate right now?";
          else return true;
        }}
      /> */}
    </div>
  );
}
