import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Landing from "./Pages/Landing/Landing";
// import LandingPage from "./Pages/LandingPage/LandingPage";
import GoogleOAuth from "./Pages/GoogleOAuth/GoogleOAuth";
import AppMain from "./Pages/App/AppMain";
import JoinInvite from "./Pages/JoinInvite/JoinInvite";
import AllTeams from "./Pages/AllTeams/AllTeams";
import TeamDetails from "./Pages/TeamDetails/TeamDetails";
import Error404 from "./Pages/Error404/Error404";
// import DiscordLink from "./Components/DiscordLink/DiscordLink";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  palette: {
    type: "dark",
    primary: {
      main: "#2CC8EB",
      color: "#efefef",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* <DiscordLink /> */}
        <Switch>
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/auth" component={GoogleOAuth}></Route>
          <Route path="/app" component={AppMain}></Route>
          <Route exact path="/jointeam" component={JoinInvite}></Route>
          <Route exact path="/allTeams" component={AllTeams}></Route>
          <Route exact path="/team/:id" component={TeamDetails}></Route>
          <Route path="*" component={Error404}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
