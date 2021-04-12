import { Route, Switch } from "react-router";
import ProjectSubmission from "../ProjectSubmission/ProjectSubmission";
import IdeaSubmission from "../IdeaSubmission/IdeaSubmission";

function SubmitSection({ data, refresh }) {
  return (
    <div className="team-container sub-container">
      <Switch>
        <Route
          exact
          path="/app/submission"
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
