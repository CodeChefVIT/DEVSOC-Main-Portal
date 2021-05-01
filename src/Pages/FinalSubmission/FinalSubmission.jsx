import React from "react";
import salty from "./Saly-16.svg";
import TextInput from "../../Components/TextInput/TextInput";
import {
  CircularProgress,
  Grid,
  Hidden,
  IconButton,
  MenuItem,
  Snackbar,
  Tooltip,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import "./FinalSubmission.css";
import { Alert } from "@material-ui/lab";
import { ExpandMore, GetApp } from "@material-ui/icons";

function FinalSubmission({ data, refresh }) {
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
  const [file, setFile] = useState(null);
  const [zipUpload, setZipUploaded] = useState(false);

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleZipDownload = () => {
    const a = document.createElement("a");
    a.download = "devsoc-source.zip";
    a.href = data.teams.submission.zip;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    let captcha = await executeRecaptcha("/");
    const token = localStorage.getItem("authToken");

    // if (file === null && !data.teams.submission.zip) {
    //   setErrorText("Select ZIP file!");
    //   setErrorSnack(true);
    //   setLoading(false);
    //   return;
    // }

    if (file) {
      const zip = new FormData();
      if (file.size > 100000000) {
        setErrorText("ZIP file size cannot exceed 100mb!");
        setErrorSnack(true);
        setLoading(false);
        return;
      }
      zip.append("zip", file);

      try {
        await axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/team/uploadZip`, zip, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((data) => {});
      } catch (error) {
        setErrorText("Could not upload ZIP file. Please try again!");
        setErrorSnack(true);
        setLoading(false);
        return;
      }
    }

    const update = {
      captcha,
      finalDescription: markdown,
      techStack: formData.techStack,
      githubLink: formData.github,
      videolink: formData.demoVideo,
    };

    try {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/team/finalSubmission`, update, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {
          // console.log(data);
          setSuccessSnack(true);
          refresh(true);
          // history.push("/app/profile");
        });
    } catch (error) {
      setErrorText("There was some error. Please try again");
      setErrorSnack(true);
    }
    setLoading(false);
  };

  const initialise = () => {
    // console.log(data);
    if (data.teams && data.teams.submission) {
      setValue("name", data.teams.submission.name);
      setValue("description", data.teams.submission.finalDescription);
      setMarkdown(data.teams.submission.finalDescription);
      setValue("github", data.teams.submission.githubLink);
      setValue("demoVideo", data.teams.submission.videolink);
      setValue("techStack", data.teams.submission.techStack);

      if (data.teams.submission.zip) {
        setZipUploaded(true);
      } else {
        setZipUploaded(false);
      }
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
    <div className="team-joined-div" style={{ padding: "0" }}>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={12} sm={12} md={7}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} className="sub-side" className="final-left-box">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextInput
                      select
                      label="Track"
                      variant="outlined"
                      defaultValue={
                        data.teams && data.teams.submission
                          ? data.teams.submission.track === "Open Innovation"
                            ? "openInnovation"
                            : data.teams.submission.track
                          : null
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
                    <Tooltip title="Link to the Github Repo. If multiple repos are used, enter any one URL and mention the others in the README">
                      <TextInput
                        label="Github Repo link"
                        variant="outlined"
                        type="url"
                        inputProps={{
                          ...register("github", {
                            required: { value: true, message: "This field is required" },
                            maxLength: { value: 200, message: "Max 200 characters only" },
                          }),
                        }}
                      />
                    </Tooltip>
                    {errors.github && <span className="team-error">{errors.github.message}</span>}
                  </Grid>
                  <Grid item xs={12}>
                    <Tooltip title="Link to the demo video. Make sure the video is not private. Optional for Review 2, but required for final pitch">
                      <TextInput
                        label="Demo Video link (optional)"
                        variant="outlined"
                        type="url"
                        inputProps={{
                          ...register("demoVideo", {
                            maxLength: { value: 200, message: "Max 200 characters only" },
                          }),
                        }}
                      />
                    </Tooltip>
                    {errors.demoVideo && (
                      <span className="team-error">{errors.demoVideo.message}</span>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Tooltip title="Enter your tech stack, separated by comma.">
                      <TextInput
                        label="Tech Stack"
                        variant="outlined"
                        inputProps={{
                          ...register("techStack", {
                            required: { value: true, message: "This field is required" },
                            maxLength: { value: 500, message: "Max 500 characters only" },
                          }),
                        }}
                      />
                    </Tooltip>
                    {errors.techStack && (
                      <span className="team-error">{errors.techStack.message}</span>
                    )}
                  </Grid>
                  {/* <Grid item xs={12}>
                    <h3 className="file-gradient-head">
                      Source Code upload{" "}
                      {!zipUpload ? (
                        " (Not uploaded)"
                      ) : (
                        <IconButton
                          style={{ padding: 0, marginLeft: "10px" }}
                          onClick={handleZipDownload}
                        >
                          <GetApp />
                        </IconButton>
                      )}
                    </h3>
                    <input
                      type="file"
                      accept=".zip,.rar"
                      style={{ marginBottom: "1em" }}
                      onChange={handleFile}
                    />
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} className="sub-side">
                <Grid container spacing={2}>
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
                      rows={15}
                    />
                    {errors.description && (
                      <span className="team-error">{errors.description.message}</span>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <button
                      className="team-primary-btn submit-btn"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress color="secondary" size={24} />
                      ) : (
                        "Submit Project"
                      )}
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={5}
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
                fontSize: "1.5rem",
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
          Project Submitted successfully!
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

export default FinalSubmission;
