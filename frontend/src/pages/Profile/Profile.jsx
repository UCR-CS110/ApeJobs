import React from "react";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Paper,
  Grid,
  Chip,
  Button,
  Typography,
} from "@mui/material";
import { interestsList } from "../../constants/interests";
import axios from "axios";
import { backendUrl } from "../../constants/backendUrl";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  maxHeight: "100%",
  overflowY: "auto",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const statusList = {
  pending: "warning",
  denied: "error",
  accepted: "success",
};

const ProfilePicInfo = ({ user }) => {
  const { name, major, gpa, picture, type, department, setUser } = user;
  return (
    <>
      <Item sx={{ boxShadow: 4 }}>
        <Box
          sx={{ flexDirection: "column" }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "1.5em",
            display: "flex",
          }}
        >
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={picture}
            alt="profile-img"
          />
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", marginTop: "1em", color: "primary.main" }}
          >
            {name}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "1em" }}>
            {type === "student"
              ? `Major: ${major}`
              : `Department: ${department}`}
          </Typography>
          {type === "student" && (
            <Typography variant="body1" sx={{ marginTop: "1em" }}>
              GPA: {gpa}
            </Typography>
          )}
          {type === "student" && (
            <Typography variant="body1" sx={{ marginY: "1em" }}>
              Resume PDF:{" "}
              <Button size="small" variant="contained">
                download
              </Button>{" "}
            </Typography>
          )}
          <Button variant="contained" onClick={() => setUser({ _id: null })}>
            Sign Out
          </Button>
        </Box>
      </Item>
    </>
  );
};

const Interests = ({ interests, about }) => {
  return (
    <>
      <Item sx={{ marginY: "1em", padding: "1.5em", boxShadow: 4}}>
        <Box>
          <Typography inline variant="body1" align="left">
            <Box sx={{ fontWeight: "bold" }}>Interests:</Box>
          </Typography>
          <Box mt={2} sx={{ flexGrow: 1 }}>
            <Grid container direction="row">
              {interests.length < 1 ? (
                <Typography variant="body1">No interests found.</Typography>
              ) : (
                interests.map((interest, index) => (
                  <Grid item xs={4}>
                    {" "}
                    <Chip
                      label={interest}
                      key={index}
                      color={interestsList[interest]}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
          <Box mt={4}>
            <Typography inline variant="body1" align="left">
              <Box sx={{ fontWeight: "bold" }}>About:</Box>
            </Typography>
            <Box
              sx={{
                width: 1,
                height: 300,
                align: "left",
                mt: 2,
              }}
            >
              <Typography inline variant="body1" align="left">
                {about.length > 1 ? about : "No about found."}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Item>
    </>
  );
};

const ApplicationCard = ({ job }) => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(`${backendUrl}/api/jobs/?jobId=${job.job}`)
      .then((res) => {
        setTitle(res.data.title);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [job]);
  return (
    <>
      <Box
        className="hover"
        sx={{ flexGrow: 1 }}
        onClick={() => {
          // passing state into the next page
          navigate(`/profile/applications/${job._id}`, { state: job });
        }}
      >
        <Item sx={{ marginTop: "2em" }}>
          <Grid container direction="row">
            <Grid item xs={5}>
              <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
                {title ? title : "No title found."}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: "center" }}>
                {new Date(job.createdAt).toISOString().split("T")[0]}
              </Typography>
            </Grid>
            <Grid sx={{ textAlign: "right" }} item xs={5}>
              <Chip
                label={job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                color={statusList[job.status]}
              />
            </Grid>
          </Grid>
        </Item>
      </Box>
    </>
  );
};

const Applications = ({ jobs }) => {
  return (
    <>
      <Item sx={{ marginX: "1em", boxShadow: 4 }}>
        <Typography inline variant="body1" align="left">
          <Box sx={{ fontWeight: "bold" }}>Applications</Box>
        </Typography>
        <Box mt={2} sx={{ flexGrow: 1 }}>
          <Grid container direction="column">
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <ApplicationCard key={index} job={job} />
              ))
            ) : (
              <p>No applications found.</p>
            )}
          </Grid>
        </Box>
      </Item>
    </>
  );
};

const Listings = ({ jobs }) => {
  return (
    <>
      <Item sx={{ marginX: "1em", padding: "1.5em", boxShadow: 4 }}>
        <Link to="/new-job">
          <Button
            variant="contained"
            sx={{ float: "right", marginRight: "1em" }}
          >
            Create Job
          </Button>
        </Link>
        <Typography inline variant="body1" align="left">
          <Box sx={{ fontWeight: "bold" }}>Job Listings</Box>
        </Typography>
        <Box mt={2} sx={{ flexGrow: 1 }}>
          <Grid container direction="column">
            {jobs.length < 1 ? (
              <p>No jobs found.</p>
            ) : (
              jobs
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((job, index) => <ListingCard key={index} job={job} />)
            )}
          </Grid>
        </Box>
      </Item>
    </>
  );
};

const ListingCard = ({ job }) => {
  return (
    <Link
      to={`/listing/${job._id}`}
      style={{ textDecoration: "none" }}
      state={job}
    >
      <Box className="hover" sx={{ flexGrow: 1 }}>
        <Item sx={{ marginTop: "2em", boxShadow: 1 }}>
          <Grid container direction="row">
            <Grid item xs={5}>
              <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
                {job.title}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: "center" }}>
                {new Date(job.createdAt).toISOString().split("T")[0]}
              </Typography>
            </Grid>
            {job.applications && (
              <Grid sx={{ textAlign: "right" }} item xs={5}>
                <Chip label={job.applications.length} />
              </Grid>
            )}
          </Grid>
        </Item>
      </Box>
    </Link>
  );
};

export const Profile = () => {
  const {
    _id,
    name,
    major,
    gpa,
    picture,
    type,
    department,
    about,
    interests,
    setUser,
  } = React.useContext(UserContext);
  const [jobs, setJobs] = React.useState([]);

  React.useEffect(() => {
    //regex to remove %20 that appears in names with an apostrophe
    if (type !== "student")
      axios
        .get(`${backendUrl}/api/jobs/${_id}`)
        .then((res) => {
          setJobs(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    else if (type === "student")
      axios
        .get(`${backendUrl}/api/applications?userId=${_id}`)
        .then((res) => {
          setJobs(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [name, setJobs, _id, type]);

  return (
    <>
      <Box ml={2} mr={2} sx={{ flexGrow: 1, marginTop: "2em" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12}>
                <ProfilePicInfo
                  user={{
                    name,
                    picture,
                    major,
                    gpa,
                    department,
                    type,
                    setUser,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Interests interests={interests} about={about} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            {type === "student" ? (
              <Applications jobs={jobs} />
            ) : (
              <Listings jobs={jobs} />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
