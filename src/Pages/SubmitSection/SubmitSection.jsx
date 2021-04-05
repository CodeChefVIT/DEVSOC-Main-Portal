
import { Route, Switch, useHistory } from "react-router";
import Submission from "../Submission/Submission";
import ProjectSubmission from "../ProjectSubmission/ProjectSubmission";

function SubmitSection() {
  return (
    <div className="team-container">
      <Switch>
      <Route exact path="/app/profile" component={Submission}></Route>
        <Route exact path="/app/submission/project" component= {ProjectSubmission}></Route>
      </Switch>
    </div>
  );
}

export default SubmitSection;
