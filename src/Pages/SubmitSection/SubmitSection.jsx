import { Route, Switch, useHistory } from "react-router";
import Submission from "../Submission/Submission";
import ProjectSubmission from "../ProjectSubmission/ProjectSubmission";
import IdeaSubmission from "../IdeaSubmission/IdeaSubmission";

function SubmitSection({ data, refresh }) {
  return (
    <div className="team-container sub-container">
      <Switch>
        <Route exact path="/app/submission" component={Submission}></Route>
        <Route
          exact
          path="/app/submission/idea"
          component={(props) => <IdeaSubmission {...props} data={data} refresh={refresh} />}
        ></Route>
        <Route
          exact
          path="/app/submission/project"
          component={(props) => <ProjectSubmission {...props} data={data} refresh={refresh} />}
        ></Route>
      </Switch>
    </div>
  );
}

export default SubmitSection;
