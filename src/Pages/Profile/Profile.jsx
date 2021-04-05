import React from "react";
import  user_photo from './Group 7.png';
import {Grid} from '@material-ui/core'
import './Profile.css';
import side_photo from './Saly-1 (2).svg'
export default function Profile() 
{
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={1} >
      <img src={user_photo} alt="user photo" className="user_profile_picture"/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={12} >
      <h1>Siddharth Singh</h1>
      </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={12}> 
     				<h3>abc@gmail.com</h3>
				</Grid>	
			</Grid>

      <Grid container spacing={2}>
        <Grid item xs={8} sm={12} >
      		<h3>+91 99999999</h3>
			</Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={12}>
                <div className="team-btn-div">
                      <button className="team-primary-btn">
                        Edit Profile
                      </button>
							</div>
				</Grid>
      </Grid>
      <div
        className={"bkg"}
        style={{
         width: "80vw",
          position: "fixed",
          bottom: "-5vh",
          right: "-1vh",
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
          src={side_photo}
          alt={"image"}
          className="From-img"
        />
      </div>

    </div>
  );
}