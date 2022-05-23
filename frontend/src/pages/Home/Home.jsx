import axios from "axios";
import React from "react";
import { JobCard } from "../../components/Home/JobCard/JobCard";
import { SearchBar } from "../../components/Home/SearchBar/SearchBar";
import { NavBar } from "../../components/NavBar/NavBar";
import { backendUrl } from "../../constants/backendUrl";

//replace job map with job card component
//remove default jobs when backend is completed
export const Home = () => {
  const [jobs, setJobs] = React.useState([]);
  const [results, setResults] = React.useState();

  React.useEffect(() => {
    axios
      .get(`${backendUrl}/api/jobs`)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((e) => {
        console.log(e); 
      });
  }, []);

  return (
    <div className="homeContainer">
		  <NavBar/>
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
      {results
        ? results.map((job) => <JobCard job={job} />)
        : jobs.map((job) => <JobCard job={job} />)}
    </div>
  );
};
