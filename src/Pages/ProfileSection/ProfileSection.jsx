import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import Profile from "../Profile/Profile";

function ProfileSection({ data, refresh }) {
  return (
    <div className="team-container">
      <Switch>
        <Route exact path="/app/profile" component={(props) => <Profile data={data} />}></Route>
<<<<<<< HEAD
        <Route exact path="/app/profile/edit" component={(props) => <ProfileEdit/>}></Route>
=======
        <Route
          exact
          path="/app/profile/edit"
          component={(props) => <ProfileEdit data={data} />}
        ></Route>
>>>>>>> 63fe3be0a1595ae7d2b9376e49af5935d90619e6
      </Switch>
    </div>
  );
}

export default ProfileSection;
