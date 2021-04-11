import { Container, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import TeamCard from "../../Components/TeamCard/TeamCard";
import "./AllTeams.css";

const AllTeams = () => {
  const [loading, setLoading] = useState(true);
  const [allTeams, setAllTeams] = useState([]);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const getTeams = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/team/all`;

    try {
      await axios.get(url).then((res) => {
        setAllTeams(res.data.teams);
        setTeams(res.data.teams);
      });
    } catch (err) {
      console.log(err);
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    const toSearch = search.toLowerCase();
    const filtered = allTeams.filter((item) => {
      return item.name.toLowerCase().includes(toSearch);
    });

    setTeams(filtered);
  }, [search]);

  useEffect(() => {
    getTeams();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="all-teams-page">
      <div style={{ padding: "0 3%", marginBottom: "40px" }}>
        <h1 className="devsoc21">
          <Link to="/app/dashboard" style={{ textDecoration: "none", width: "fit-content" }}>
            DEVSOC'21
          </Link>
        </h1>
        <h1 className="page-title">All Teams</h1>
      </div>
      <Container className="all-teams-div">
        <div className="search-container">
          <TextField
            className="search-box"
            // placeholder="Search by name/members..."
            variant="outlined"
            label="Search teams"
            // InputLabelProps={{ shrink: true }}
            InputProps={{ endAdornment: <Search /> }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="all-teams-list">
          {teams.length > 0 ? (
            teams.map((team) => <TeamCard team={team} />)
          ) : (
            <h1 style={{ textAlign: "center" }}>No teams available :(</h1>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AllTeams;
