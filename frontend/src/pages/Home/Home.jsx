import axios from "axios";
import React from "react";
import { JobCard } from "../../components/Home/JobCard/JobCard";
import { SearchBar } from "../../components/Home/SearchBar/SearchBar";
import { backendUrl } from "../../constants/backendUrl";

//replace job map with job card component
//remove default jobs when backend is completed
export const Home = () => {
  const [jobs, setJobs] = React.useState([]);
  const [results, setResults] = React.useState();

  React.useEffect(() => {
    axios
      .get(`${backendUrl}/jobs`)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((e) => {
        setJobs([
          {
            id: 1,
            author: "Mariam Salloum",
            title: "CS178 Grader",
            interests: ["Web Development", "Embedded Systems", "Big Data"],
            majors: ["Computer Science"],
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            people: 1,
          },
          {
            id: 2,
            author: "Phillip Brisk",
            title: "CS120B Grader",
            interests: [],
            majors: ["Computer Science", "Electrical Engineering"],
            description: "",
            people: 2,
          },
          {
            id: 3,
            author: "Vagelis Hristidis",
            title: "Information Retrieval Researcher",
            interests: ["Machine Learning"],
            majors: ["Computer Science"],
            people: 3,
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
