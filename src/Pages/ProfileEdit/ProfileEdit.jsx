import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./ProfileEdit.css";
import Grid from "@material-ui/core/Grid";
import salty from "./Saly-14.svg";
import { Hidden } from "@material-ui/core";

export default function ProfileEdit({ data }) {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  useEffect(() => {
    setValue("name", data.name);
    setValue("college", data.college);
    setValue("website", data.website);
    // setValue("address.line1", data.address.line1);
    // setValue("address.line2", data.address.line2);
    // setValue("address.city", data.address.city);
    // setValue("address.state", data.address.state);
    // setValue("address.pincode", data.address.pincode);
    // setValue("address.country", data.address.country);
    setValue("resume", data.resume);
    // setValue("personal.github", data.personal.github);
    // setValue("personal.linkedin", data.personal.linkedin);
    setValue("bio", data.bio);
  }, []);

  return (
    <div className="team-joined-div">
      <Grid container spacing={3}>
        <Grid item md={6} lg={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <input
                  {...register("name", { required: true, maxLength: 30 })}
                  placeholder="Name"
                  className="TopLabels"
                />
              </Grid>
              <Grid item sm={6}>
                <input
                  {...register("address.line1", { required: true, maxLength: 30 })}
                  placeholder="Address line 1"
                  className="TopLabels"
                />
              </Grid>
              <Grid item sm={6}>
                <input
                  {...register("website")}
                  placeholder="Personal Website(optional)"
                  className="TopLabels"
                />
              </Grid>
              <Grid item sm={6}>
                <input
                  {...register("address.line2", { required: true, maxLength: 30 })}
                  placeholder="Address line 2"
                  className="TopLabels"
                />
              </Grid>
              <Grid item sm={6}>
                <input
                  type="text"
                  {...register("college")}
                  placeholder="College Name"
                  className="TopLabels"
                />
              </Grid>
              <Grid item sm={3}>
                <input
                  {...register("address.city", { required: true, maxLength: 10 })}
                  placeholder="City"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
              </Grid>
              <Grid item sm={3}>
                <input
                  {...register("address.state", { required: true, maxLength: 100 })}
                  placeholder="State"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
              </Grid>
              <Grid item sm={6}>
                <input
                  {...register("resume", { required: true, maxLength: 30 })}
                  placeholder="Resume Link"
                  className="TopLabels"
                />
              </Grid>

              <Grid item sm={3}>
                <input
                  {...register("address.pincode", { required: true, maxLength: 30 })}
                  placeholder="Pincode"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
              </Grid>
              <Grid item sm={3}>
                <input
                  {...register("address.country", { required: true, maxLength: 100 })}
                  placeholder="Country"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
              </Grid>
              <Grid item sm={3}>
                <input
                  {...register("personal.github", { required: true, maxLength: 100 })}
                  placeholder="Github Link"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
              </Grid>
              <Grid item sm={3}>
                <input
                  {...register("personal.linkedin", { required: true, maxLength: 30 })}
                  placeholder="LinkedIn Link"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
              </Grid>
              <Grid item sm={6}>
                <select
                  {...register("tshirt", { required: true, maxLength: 2 })}
                  placeholder="Tshirt Size"
                  className="LowerLabels"
                >
                  <option value="" selected disabled>
                    T-Shirt Size
                  </option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </Grid>
              <Grid item sm={6}>
                <textarea {...register("bio")} rows={4} placeholder="Bio" className="LowerLabels" />
              </Grid>
              <Grid item container sm={6} justify="center" alignItems="center">
                <input type="submit" />
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
    </div>
  );
}
