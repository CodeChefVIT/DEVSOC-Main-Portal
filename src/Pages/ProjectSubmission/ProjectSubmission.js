import React from "react";
import { useForm } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import './ProjectSubmission.css';

export default function ProjectSubmissions() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <Grid container spacing={2}>

        <Grid item xs={12} sm={4}>
          <input {...register("Name", { required: true, maxLength: 30 })} placeholder="<Idea name>" className="inputfield" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <input {...register("repo_link", { required: true, maxLength: 30 })} placeholder="Repo Link" className="inputfield" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} >
          <textarea {...register("project_desc", { required: true, maxLength: 30 })} placeholder="Project Description" className="description" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container spacing={2} >
          <Grid item xs={12} sm={12}>
            <input {...register("demo_video", { required: true, maxLength: 50 })} placeholder="Demo Video Link" className="inputfield" />
        </Grid>
          <Grid item xs={12} sm={12}  >
            <textarea {...register("extra_field", { required: true, maxLength: 30 })} placeholder="Any Extra Field" className="inputfield extra" />
          </Grid>
        </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
    <Grid item xs={12} sm={12}>
          <button className="team-primary-btn">
            Submit Project
          </button>
          </Grid>
          <Grid item xs={12} sm={12}>
          <button className="team-secondary-btn">
            Edit Idea
          </button>
          </Grid>
      </Grid>
    </form>
  );
}
