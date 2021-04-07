import React from "react";
import saltysubmission from "./Saly-16.svg";
import TextInput from "../../Components/TextInput/TextInput";
import { Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";

function IdeaSubmission(props) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <div className="team-joined-div">
      <Grid container>
        <Grid item container xs={12} md={6} lg={4} spacing={2}>
          <form>
            <Grid item xs={12}>
              <TextInput
                label="Name"
                variant="outlined"
                inputProps={{ ...register("name", { required: true, maxLength: 30 }) }}
              />
              {/* {errors.name && <span className="team-error">This field is required!</span>} */}
            </Grid>
            <Grid item xs={12}>
              <TextInput
                variant="outlined"
                label="Phone Number"
                multiline
                rows={3}
                inputProps={{
                  ...register("mobile", { required: true, maxLength: 15, minLength: 7 }),
                }}
              />
              {/* {errors.mobile && (
              <span className="team-error">Please enter a valid phone number!</span>
            )} */}
            </Grid>
          </form>
        </Grid>
      </Grid>

      <div
        className={"bkg"}
        style={{
          height: "100vh",
          position: "fixed",
          bottom: "-10vh",
          right: "0vh",
          zIndex: -1,
        }}
      >
        <img
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            height: "auto",
            zIndex: -1,
          }}
          src={saltysubmission}
          alt={"image"}
          className="From-img"
        />
      </div>
      {/* <Link to="/app/submission/project">
        <button className="team-primary-btn">Submit Idea</button>
      </Link> */}
      {/* <h3>Idea submissions opening soon!</h3> */}
    </div>
  );
}

export default IdeaSubmission;
