import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Landing from "./Pages/Landing/Landing";
import Form from "./Pages/Form/Form";
// import LandingPage from "./Pages/LandingPage/LandingPage";
// import GoogleOAuth from "./Pages/GoogleOAuth/GoogleOAuth";
// import AppMain from "./Pages/App/AppMain";
// import DiscordLink from "./Components/DiscordLink/DiscordLink";

const theme = createMuiTheme({
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
          <Route exact path="/form" component={Form}></Route>
          {/* <Route exact path="/auth" component={GoogleOAuth}></Route>
          <Route path="/app" component={AppMain}></Route> */}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
