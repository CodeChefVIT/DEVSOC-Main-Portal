import React from "react";
import salty from "./Saly-16.svg";
import TextInput from "../../Components/TextInput/TextInput";
import { CircularProgress, Grid, Hidden, Snackbar } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Alert } from "@material-ui/lab";

function IdeaSubmission({ data, refresh }) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();

  const history = useHistory();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [loading, setLoading] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [successSnack, setSuccessSnack] = useState(false);
  const [errorSnack, setErrorSnack] = useState(false);
  const [errorText, setErrorText] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    let captcha = await executeRecaptcha("/");
    var update = {
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
          refresh(true);
          // history.push("/app/profile");
        });
    } catch (error) {
      setErrorText("Something went wrong, please try again!");
      setErrorSnack(true);
    }
    setLoading(false);
  };

  const initialise = () => {
    if (data.teams) {
      if (data.teams.submission) {
        setValue("name", data.teams.submission?.name);
        setValue("desc", data.teams.submission?.description);
      }
    } else {
      history.push("/app/team");
    }
  };

  useEffect(() => {
    initialise();
  }, []);

  return (
    <div className="team-joined-div">
      <Grid container>
        <Grid item xs={12} md={4} lg={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item container xs={12} spacing={2} className="sub-side">
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
                  multiline
                  variant="outlined"
                  label="Bio"
                  onChange={(event) => {
                    setMarkdown(event.target.value);
                  }}
                  helperText="Markdown Supported"
                  inputProps={{
                    ...register("desc", {
                      required: { value: true, message: "Please fill this field!" },
                    }),
                  }}
                  rows={10}
                />
                {errors.bio && <span className="team-error">{errors.bio.message}</span>}
              </Grid>
              <button className="team-primary-btn submit-btn" type="submit" disabled={loading}>
                {loading ? <CircularProgress color="secondary" size={24} /> : "Submit Idea"}
              </button>
            </Grid>
          </form>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          lg={9}
          style={{
            backgroundColor: "#1c006f88",
            padding: 25,
            borderRadius: 25,
            maxHeight: "75vh",
            overflow: "auto",
          }}
        >
          <ReactMarkdown plugins={[gfm]} children={markdown} allowDangerousHtml />
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

export default IdeaSubmission;
