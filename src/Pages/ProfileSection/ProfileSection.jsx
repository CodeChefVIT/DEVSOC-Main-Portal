import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import Profile from "../Profile/Profile";

function ProfileSection({ data, refresh }) {
  return (
    <div>
      <Switch>
        <Route exact path="/app/profile" component={(props) => <Profile />}></Route>
        <Route exact path="/app/profile/edit" component={(props) => <ProfileEdit />}></Route>
      </Switch>
    </div>
  );
}

export default ProfileSection;
