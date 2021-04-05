import React from "react";
import {Grid} from '@material-ui/core'
import './Profile.css';
import { useEffect, useState } from "react";
import side_photo from './Saly-1 (2).svg'
export default function Profile() 
{
  const [avatarURL, setAvatarURL] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/getProfile`;
    
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }, []);

  return (
    <div className="profile_page">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={1} >
      <img src={avatarURL} alt="user photo" className="user_profile_picture"/>
        </Grid>
      </Grid>
      <Grid container spacing={0.5}>
        <Grid item xs={12} sm={12} >
      <h1>{nameUser}</h1>
      </Grid>
      </Grid>
      <Grid container spacing={0.5}>
        <Grid item xs={12} sm={12}> 
     				<h3>{email}</h3>
				</Grid>	
			</Grid>

      <Grid container spacing={0.5}>
        <Grid item xs={12} sm={12} >
      		<h3>{phone}</h3>
			</Grid>
      </Grid>
      <Grid container spacing={0.5}>
        <Grid item xs={12} sm={12}>
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