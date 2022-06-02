import axios from "axios";
import React from "react";
import { JobCard } from "../../components/Home/JobCard/JobCard";
import { SearchBar } from "../../components/Home/SearchBar/SearchBar";
import { backendUrl } from "../../constants/backendUrl";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { Box } from "@mui/material";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

export const Home = () => {
  const { _id, applications, setUser } = React.useContext(UserContext);
  const [jobs, setJobs] = React.useState([]);
  const [results, setResults] = React.useState();

  React.useEffect(() => {
    axios
      .get(`${backendUrl}/api/jobs`)
      .then((res) => {
        if (_id) {
          setJobs(
            res.data.filter(
              (job) =>
                !applications.some((app) => job.applications.includes(app))
            )
          );
        } else {
          setJobs(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [_id, applications, setJobs]);

  React.useEffect(() => {
    if (!_id && Cookies.get("token"))
      axios
        .get(`${backendUrl}/api/user-management/user`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((e) => {
          console.log(e);
          Cookies.remove("token");
          console.log("sent  with error");
        });
  }, [_id, setUser]);

  return (
    <Box sx={{marginTop: "3em"}}>
      <SearchBar
        onChange={(e) => {
          if (e.length < 1) return setResults();
          setResults(
            jobs.filter((job) => {
              e = e.toLowerCase();
              const name = job.author.name
                ? job.author.name.toLowerCase()
                : job.author.toLowerCase();
              return (
                job.title.toLowerCase().includes(e) ||
                job.interests
                  .map((interest) => interest.toLowerCase())
                  .includes(e) ||
                name.includes(e) ||
                job.description.toLowerCase().includes(e)
              );
            })
          );
        }}
      />
      <Box sx={{ paddingY: "2em" }}>
        {results
          ? results.map((job) => <JobCard job={job} />)
          : jobs.map((job) => <JobCard job={job} />)}
      </Box>
    </Box>
  );
};
