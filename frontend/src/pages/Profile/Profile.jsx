import React from "react";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { styled } from '@mui/material/styles';
import { Avatar, Box, Paper, Grid, Chip, Button, Typography } from '@mui/material'
import { interestsList } from "../../constants/interests";
import axios from "axios";
import { backendUrl } from "../../constants/backendUrl";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const statusList = {
  "Pending": "warning",
  "Denied": "error",
  "Accepted": "success",
}

const jobsApplied = [
  {
    title: "CS178 Grader",
    date: "05/19/2022",
    status: "Pending"
  },
  {
    title: "Researcher",
    date: "05/19/2022",
    status: "Accepted"
  },
  {
    title: "CS120B Grader",
    date: "05/19/2022",
    status: "Denied"
  }
];



const ProfilePicInfo = ({ user }) => {
  const { name, major, gpa, picture, type, department, setUser } = user;
  return (
    <>
      <Item>
        <Box sx={{ flexDirection: 'column' }} style={{ justifyContent: "center", alignItems: "center", padding: "1.5em", display: "flex" }} >
          <Avatar sx={{ width: 100, height: 100 }} src={picture} alt="profile-img" />
          <p>{name}</p>
          <p>{type === "student" ? `Major: ${major}` : `Department: ${department}`}</p>
          {type === "student" && <p>GPA: {gpa}</p>}
          {type === "student" && <p>Resume PDF: <Button size="small" variant="contained">download</Button> </p>}
          <Button variant="contained" onClick={() => setUser({})}>Sign Out</Button>
        </Box>
      </Item>
    </>
  );
};

const Interests = ({ interests, about }) => {
  return (
    <>
      <Item sx={{ marginY: "1em", padding: "1.5em" }}>
        <Box>
          <Typography inline variant="body1" align="left">
            <Box sx={{ fontWeight: 'bold' }}>Interests:</Box>
          </Typography>
          <Box mt={2} sx={{ flexGrow: 1 }}>
            <Grid container direction="row">
              {interests.length < 1 ? <p>No interests found.</p> : interests.map((interest, index) => <Grid item xs={4}> <Chip label={interest} key={index} color={interestsList[interest]} /></Grid>)}
            </Grid>
          </Box>
          <Box mt={4}>
            <Typography inline variant="body1" align="left">
              <Box sx={{ fontWeight: 'bold' }}>About:</Box>
            </Typography>
            <Box
              sx={{
                width: 1,
                height: 300,
                align: "left",
                mt: 2
              }}
            >
              <Typography inline variant="body1" align="left">{about.length > 1 ? about : "No about found."}</Typography>
            </Box>
          </Box>
        </Box>
      </Item>
    </>
  );
};

const ApplicationCard = ({ job }) => {
  return (
    <>
      <Box className="hover" sx={{ flexGrow: 1 }}>
        <Item sx={{ marginTop: "2em" }} >
          <Grid container direction="row">
            <Grid item xs={5}>
              <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
                {job.title}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                {job.date}
              </Typography>
            </Grid>
            <Grid sx={{ textAlign: "right" }} item xs={5}>
              <Chip label={job.status} color={statusList[job.status]} />
            </Grid>
          </Grid>
        </Item>
      </Box>
    </>
  );
};

const Applications = () => {
  return (
    <>
      <Item sx={{ marginX: "1em", overflowY: "scroll" }}>
        <Typography inline variant="body1" align="left">
          <Box sx={{ fontWeight: 'bold' }}>Applications</Box>
        </Typography>
        <Box mt={2} sx={{ flexGrow: 1 }}>
          <Grid container direction="column">
            {jobsApplied.map((job, index) =>
              <ApplicationCard key={index} job={job} />
            )}
          </Grid>
        </Box>
      </Item>
    </>
  );
};

const Listings = ({ type, jobs }) => {
  return (
    <>
      <Item sx={{ marginX: "1em", padding: "1.5em", overflowY: "scroll" }}>
        <Link to="/new-job"><Button variant="contained" sx={{ float: "right", marginRight: "1em" }}>Create Job</Button></Link>
        <Typography inline variant="body1" align="left">
          <Box sx={{ fontWeight: 'bold' }}>Job Listings</Box>
        </Typography>
        <Box mt={2} sx={{ flexGrow: 1 }}>
          <Grid container direction="column">
            {jobs.length < 1 ? <p>No jobs found.</p> : jobs.sort((a, b) => b.createdAt- a.createdAt).map((job, index) =>
              <ListingCard key={index} job={job} />
            )}
          </Grid>
        </Box>
      </Item>
    </>
  );
};

const ListingCard = ({ job }) => {
  return (
    <Link style={{ textDecoration: "none" }} to={`/job/${job._id}`}>
      <Box className="hover" sx={{ flexGrow: 1 }}>
        <Item sx={{ marginTop: "2em" }} >
          <Grid container direction="row">
            <Grid item xs={5}>
              <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
                {job.title}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                {job.date}
              </Typography>
            </Grid>
            {job.applications && <Grid sx={{ textAlign: "right" }} item xs={5}>
              <Chip label={job.applications.length} />
            </Grid>}
          </Grid>
        </Item>
      </Box>
    </Link>
  );
};


export const Profile = () => {
  const { _id, name, major, gpa, picture, type, department, about, interests, setUser } = React.useContext(UserContext);
  const [jobs, setJobs] = React.useState([]);

  React.useEffect(() => {
    //regex to remove %20 that appears in names with an apostrophe
    if (type !== "student") axios.get(`${backendUrl}/api/jobs/${_id}`).then((res) => {
      setJobs(res.data);
    }).catch((e) => {
      console.log(e);
    });
  }, [name, setJobs]);

  return (
    <>
      <Box ml={2} mr={2} sx={{ flexGrow: 1, marginTop: "2em" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12}>
                <ProfilePicInfo user={{ name, picture, major, gpa, department, type, setUser }} />
              </Grid>
              <Grid item xs={12}>
                <Interests interests={interests} about={about} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            {type === "student" ? <Applications /> : <Listings jobs={jobs} />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};


