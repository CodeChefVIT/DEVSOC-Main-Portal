import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import Submission from "../Submission/Submission";
import ProjectSubmission from "../ProjectSubmission/ProjectSubmission";

function SubmitSection({ data, refresh }) {
  return (
    <div className="team-container">
      <Switch>
        <Route exact path="/app/submit-idea" component={Submission}></Route>
        <Route exact path="/app/submit-project" component={ProjectSubmission}></Route>
      </Switch>
    </div>
  );
}

export default SubmitSection;
