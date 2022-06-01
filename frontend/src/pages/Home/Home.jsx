import axios from "axios";
import React from "react";
import { JobCard } from "../../components/Home/JobCard/JobCard";
import { SearchBar } from "../../components/Home/SearchBar/SearchBar";
import { backendUrl } from "../../constants/backendUrl";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { Box } from "@mui/material";

//replace job map with job card component
//remove default jobs when backend is completed
export const Home = () => {
  const { _id } = React.useContext(UserContext);
  const [jobs, setJobs] = React.useState([]);
  const [results, setResults] = React.useState();

  React.useEffect(() => {
    axios
      .get(`${backendUrl}/api/jobs`)
      .then((res) => {
        if (_id) {
          setJobs(res.data.filter((job) => !job.applications.includes(_id)));
        } else {
          setJobs(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [_id, setJobs]);

  return (
    <div className="homeContainer">
      <h1>Home</h1>
      <SearchBar
        onChange={(e) => {
          if (e.length < 1) return setResults();
          setResults(
            jobs.filter((job) => {
              e = e.toLowerCase();
              return (
                job.title.toLowerCase().includes(e) ||
                job.interests
                  .map((interest) => interest.toLowerCase())
                  .includes(e) ||
                job.author.toLowerCase().includes(e) ||
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
    </div>
  );
};
