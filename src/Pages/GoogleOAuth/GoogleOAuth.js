import React, { useEffect } from "react";
import { useHistory } from "react-router";
// import Loading from "../../Components/Loading/Loading";

const GoogleOAuth = (props) => {
  const history = useHistory();

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const token = query.get("token");

    console.log(token);
    if (!token || token === "") {
      history.replace("/");
      return;
    }

    localStorage.setItem("authToken", token);
    history.replace("/app/profile/edit");
    // eslint-disable-next-line
  }, []);
  return <></>;
};

export default GoogleOAuth;
