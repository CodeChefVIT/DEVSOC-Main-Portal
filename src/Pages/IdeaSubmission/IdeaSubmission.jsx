import React from "react";
import salty from "./Saly-16.svg";
import TextInput from "../../Components/TextInput/TextInput";
import { CircularProgress, Grid, Hidden, MenuItem, Snackbar } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Alert } from "@material-ui/lab";
import { ExpandMore } from "@material-ui/icons";
import "./Idea.css";

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
    var update = { ...data, captcha };
    // console.log(update);
    const token = localStorage.getItem("authToken");
    try {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/team/saveidea`, update, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {
          // console.log(data);
          setSuccessSnack(true);
          refresh(true);
          // history.push("/app/profile");
        });
    } catch (error) {
      if (error.response.status === 409) {
        setErrorText("Time Size should be 2 to 5 members!");
        setErrorSnack(true);
      } else {
        setErrorText("Something went wrong, please try again!");
        setErrorSnack(true);
      }
    }
    setLoading(false);
  };

  const initialise = () => {
    // console.log(data);
    if (data.teams && data.teams.submission) {
      setValue("name", data.teams.submission.name);
      setValue("description", data.teams.submission.description);
      setMarkdown(data.teams.submission.description);
    }
  };

  useEffect(() => {
    initialise();
    // eslint-disable-next-line
  }, []);

  if (data.message) {
    return (
      <div>
        <>
          <div className="dashset">Idea Submissions have started</div>
          <div className="dashset">
            To submit yours <ExpandMore fontSize={"large"} />
          </div>
          <div className="team-btn-div">
            <button className="team-primary-btn" onClick={() => history.push("/app/team")}>
              Form your Team now!
            </button>
          </div>
        </>

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
          alt={""}
          className="From-img"
        />
      </div>
    );
  }

  return (
    <div className="team-joined-div">
      <Grid container>
        <Grid item xs={12} md={4} lg={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item container xs={12} spacing={2} className="sub-side">
              <Grid item xs={12}>
                <TextInput
                  select
                  label="Track"
                  variant="outlined"
                  defaultValue={
                    data.teams && data.teams.submission ? data.teams.submission.track : ""
                  }
                  inputProps={{ ...register("track", { required: true }) }}
                  disabled
                >
                  <MenuItem key={0} value="ar-vr">
                    Best of AR/VR
                  </MenuItem>
                  <MenuItem key={1} value="fun">
                    Most Fun!
                  </MenuItem>
                  <MenuItem key={2} value="health">
                    Health and Wellness + Medical
                  </MenuItem>
                  <MenuItem key={3} value="devtools">
                    DevTools
                  </MenuItem>
                  <MenuItem key={4} value="openInnovation">
                    Open Innovation
                  </MenuItem>
                  <MenuItem key={5} value="socialGood">
                    Best Social Good Hack
                  </MenuItem>
                  <MenuItem key={6} value="blockchain">
                    Blockchain
                  </MenuItem>
                </TextInput>
                {errors.track && (
                  <span className="team-error">Please Select a your preferred track!</span>
                )}
              </Grid>
              <Grid item xs={12} style={{ paddingTop: 12 }}>
                <TextInput
                  label="Project Name"
                  variant="outlined"
                  inputProps={{
                    ...register("name", {
                      required: { value: true, message: "This field is required" },
                      maxLength: { value: 100, message: "Max 100 characters only" },
                    }),
                  }}
                  disabled
                />
                {errors.name && <span className="team-error">{errors.name.message}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  multiline
                  variant="outlined"
                  label="Description"
                  onChange={(event) => {
                    setMarkdown(event.target.value);
                  }}
                  helperText={
                    <a
                      href="https://github.github.com/gfm/"
                      style={{ textDecoration: "none", color: "#FFF", fontWeight: 600 }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Markdown Supported
                    </a>
                  }
                  inputProps={{
                    ...register("description", {
                      required: { value: true, message: "Please fill this field!" },
                    }),
                  }}
                  rows={10}
                  disabled
                />
                {errors.description && (
                  <span className="team-error">{errors.description.message}</span>
                )}
              </Grid>
              {/* <button className="team-primary-btn submit-btn" type="submit" disabled={loading}>
                {loading ? <CircularProgress color="secondary" size={24} /> : "Submit Idea"}
              </button> */}
              <Grid item xs={12}>
                <div>
                  {/* Once the idea is submitted, you will not be able to join/ leave this team or
                  invite/remove someone from your team. */}
                  Idea submission is closed! If you have already submitted the idea, stay tuned!
                </div>
              </Grid>
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
          }}
        >
          <label className="MuiFormLabel-root">Idea Preview </label>
          {markdown === "" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: "2rem",
                fontWeight: 600,
              }}
            >
              No Content Yet
            </div>
          ) : (
            <div style={{ overflow: "auto", maxHeight: "calc(100% - 10px)" }}>
              <ReactMarkdown plugins={[gfm]} children={markdown} />
            </div>
          )}
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
            alt={""}
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
          Idea Submitted successfully!
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
