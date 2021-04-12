import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Loading from "../../Components/Loading/Loading";

const JoinInvite = (props) => {
  const history = useHistory();

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const code = query.get("teamCode");
    const email = query.get("email");
    const isRegistered = Boolean(query.get("isRegistered"));

    const obj = { code, email, isRegistered };

    localStorage.setItem("toJoin", JSON.stringify(obj));

    history.replace("/app/team");
    // eslint-disable-next-line
  }, []);
  return <Loading />;
};

export default JoinInvite;
