import axios from "axios";
import React from "react";
import { SearchBar } from "../../components/Home/SearchBar";
import { backendUrl } from "../../constants/backendUrl";

//replace job map with job card component
//remove default jobs when backend is completed
export const Home = () => {
  const [jobs, setJobs] = React.useState([]);
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${backendUrl}/jobs`)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((e) => {
        setJobs([
          {
            author: "Mariam Salloum",
            title: "CS178 Grader",
            interests: ["Web Development"],
          },
          {
            author: "Phillip Brisk",
            title: "CS120B Grader",
            interests: [""],
          },
          {
            author: "Vagelis Hristidis",
            title: "Information Retrieval Researcher",
            interests: [""],
          },
        ]);
      });
  }, []);

  return (
    <div className="homeContainer">
      <h1>Home</h1>
      <SearchBar
        onChange={(e) => {
          if (e.length < 1) return setResults();
          setResults(
            jobs.filter((job) => {
              e = e.toLowerCase();
              console.log(e);
              console.log(job.interests);
              return (
                job.title.toLowerCase().includes(e) ||
                job.interests
                  .map((interest) => interest.toLowerCase())
                  .includes(e) ||
                job.author.toLowerCase().includes(e)
              );
            })
          );
        }}
      />
      {results
        ? results.map((job) => (
            <>
              <p>{job.title}</p>
              <p>{job.author}</p>
              <p>{job.interests}</p>
              <hr width="25%" />
            </>
          ))
        : jobs.map((job) => (
            <>
              <p>{job.title}</p>
              <p>{job.author}</p>
              <p>{job.interests}</p>
              <hr width="25%" />
            </>
          ))}
    </div>
  );
};
