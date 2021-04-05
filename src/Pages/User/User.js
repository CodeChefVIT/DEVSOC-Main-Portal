import React from "react";
import { useForm } from "react-hook-form";
import "./User.css";
import Grid from "@material-ui/core/Grid";
import salyy from "./Saly-1.svg";
import uploadbutton from "./upload.png";

export default function Form() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={4}>
          <input
            {...register("Name", { required: true, maxLength: 30 })}
            placeholder="name"
            className="TopLabels"
          />
        </Grid>
        <Grid item xs={8} sm={4}>
          <input
            {...register("address1", { required: true, maxLength: 30 })}
            placeholder="address line 1"
            className="TopLabels"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={4}>
          <input
            {...register("address2", { required: true, maxLength: 30 })}
            placeholder="address line 2"
            className="TopLabels"
          />
        </Grid>
        <Grid item xs={8} sm={4}>
          <input
            {...register("city", { required: true, maxLength: 20 })}
            placeholder="city"
            className="TopLabels"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={4}>
          <input type="email" {...register("email")} placeholder="Email ID" className="TopLabels" />
        </Grid>
        <Grid item xs={8} sm={4}>
          <input {...register("City")} placeholder="City" className="TopLabels" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={2}>
          <div className="image-upload input-style">
            {" "}
            <label for="resume-file-input">
              <span>
                <img src={uploadbutton} />
                Resume
              </span>
            </label>
            <input
              type="file"
              {...register("Resume", { required: true, maxLength: 30 })}
              placeholder="Resume"
              id="resume-file-input"
            />
          </div>
        </Grid>

        <Grid item xs={8} sm={2}>
          <div className="image-upload input-style">
            {" "}
            <label for="picture-file-input">
              <span>
                <img src={uploadbutton} />
                Picture
              </span>
            </label>
            <input
              type="file"
              {...register("Picture", { required: true })}
              placeholder="Picture"
              id="picture-file-input"
            />
          </div>
        </Grid>
        <Grid item xs={8} sm={2}>
          <input
            {...register("state", { required: true, maxLength: 100 })}
            placeholder="State"
            className="BottomLabels"
          />
        </Grid>
        <Grid item xs={8} sm={2}>
          <input
            {...register("state", { required: true, maxLength: 30 })}
            placeholder="Pincode"
            className="BottomLabels"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={2}>
          <input
            {...register("size", { required: true, maxLength: 2 })}
            placeholder="Tshirt Size"
            className="LowerLabels"
          />
        </Grid>
        <Grid item xs={8} sm={2}>
          <input {...register("bio")} placeholder="Bio" className="LowerLabels" />
        </Grid>
        <Grid item xs={8} sm={4}>
          <input {...register("email")} placeholder="Email" className="LowerLabels" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={3}>
          <input {...register("bio")} placeholder="Bio" className="Lower" />
        </Grid>

        <Grid item xs={12} sm={8}>
          <input type="submit" />
        </Grid>
      </Grid>

      <div
        className={"bkg"}
        style={{
          height: "100vh",
          position: "fixed",
          bottom: "-5vh",
          right: "10vh",
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
          src={salyy}
          alt={"image"}
          className="From-img"
        />
      </div>
    </form>
  );
}
