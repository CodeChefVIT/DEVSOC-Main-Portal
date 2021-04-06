import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./ProfileEdit.css";
import Grid from "@material-ui/core/Grid";
import salty from "./Saly-14.svg";
import { CircularProgress, Hidden } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";



export default function ProfileEdit({ data, refresh }) {

  const { register, setValue, getValues } = useForm();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    data = getValues();
    const token = localStorage.getItem("authToken");
    await axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/user/update`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        console.log(data);
        refresh(true);
      });
    setLoading(false);
  };

  const initialise = () => {
    setValue("name", data.name);
    setValue("college", data.college);
    setValue("mobile", data.mobile);
    if (data.address) {
      setValue("address.line1", data.address.line1);
      setValue("address.line2", data.address.line2);
      setValue("address.city", data.address.city);
      setValue("address.state", data.address.state);
      setValue("address.pincode", data.address.pincode);
      setValue("address.country", data.address.country);
    }
    if (data.personal) {
      setValue("personal.website", data.personal.website);
      setValue("personal.resume", data.personal.resume);
      setValue("personal.github", data.personal.github);
      setValue("personal.linkedin", data.personal.linkedin);
      setValue("personal.tshirt", data.personal.tshirt);
    }
    setValue("bio", data.bio);
  };

  useEffect(() => {
    initialise();
  }, [initialise]);

  return (
    <div className="team-joined-div">
      <Grid container spacing={3}>
        <Grid item md={12} lg={8} style={{ paddingBottom: 80 }}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <input
                  {...register("name", { required: true, maxLength: 30 })}
                  placeholder="Name"
                  className="TopLabels"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  {...register("address.line1", { required: true, maxLength: 30 })}
                  placeholder="Address line 1"
                  className="TopLabels"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  type="number"
                  {...register("mobile", { required: true, maxLength: 30 })}
                  placeholder="Mobile"
                  className="TopLabels"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  {...register("address.line2", { required: true, maxLength: 30 })}
                  placeholder="Address line 2"
                  className="TopLabels"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  type="url"
                  {...register("personal.website")}
                  placeholder="Personal Website(optional)"
                  className="TopLabels"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <input
                  {...register("address.city", { required: true, maxLength: 10 })}
                  placeholder="City"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <input
                  {...register("address.state", { required: true, maxLength: 100 })}
                  placeholder="State"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  type="text"
                  {...register("college")}
                  placeholder="College Name"
                  className="TopLabels"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <input
                  type="number"
                  {...register("address.pincode", { required: true, maxLength: 6 })}
                  placeholder="Pincode"
                  className="TopLabels"
                  
                  onInput={(object)=>{
                    if (object.target.value.length > 6) {
                      object.target.value = object.target.value.slice(0, object.target.maxLength)
                       }
}
}
                  style={{ padding: "6% 10%" }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <input
                  {...register("address.country", { required: true, maxLength: 100 })}
                  placeholder="Country"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  type="url"
                  {...register("personal.resume", { required: true, maxLength: 30 })}
                  placeholder="Resume Link"
                  className="TopLabels"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <input
                  type="url"
                  {...register("personal.github", { required: true, maxLength: 100 })}
                  placeholder="Github Link"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <input
                  type="url"
                  {...register("personal.linkedin", { required: true, maxLength: 30 })}
                  placeholder="LinkedIn Link"
                  className="TopLabels"
                  style={{ padding: "6% 10%" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <textarea {...register("bio")} rows={4} placeholder="Bio" className="LowerLabels" />
              </Grid>
              <Grid item container sm={6} justify="center" alignItems="center">
                <select
                  {...register("personal.tshirt", { required: true, maxLength: 2 })}
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
                <button className="submit-btn" onClick={onSubmit}>
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
    </div>
  );
}
