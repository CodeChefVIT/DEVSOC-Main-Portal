import { Route, Switch, useHistory } from "react-router";
import Submission from "../Submission/Submission";
// import ProjectSubmission from "../ProjectSubmission/ProjectSubmission";
// import IdeaSubmission from "../IdeaSubmission/IdeaSubmission";

function SubmitSection() {
  return (
    <div className="team-container sub-container">
      <Switch>
        <Route exact path="/app/submission" component={Submission}></Route>
        {/* <Route exact path="/app/submission/idea" component={IdeaSubmission}></Route>
        <Route exact path="/app/submission/project" component={ProjectSubmission}></Route> */}
      </Switch>
    </div>
  );
}

export default SubmitSection;
