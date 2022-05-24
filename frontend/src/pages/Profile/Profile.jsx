import React from "react";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { styled } from '@mui/material/styles';
import {Avatar, Box, Paper, Grid, Chip ,Button, Typography} from '@mui/material'
import { interestsList } from "../../constants/interests";


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



const ProfilePicInfo = () => {
  const { name, major, gpa} = React.useContext(UserContext);

  return(
    <>
    <Item>
      <Box  sx={{ flexDirection: 'column' }} style={{ justifyContent: "center", alignItems: "center", display: "flex" }} >
        <Avatar sx={{ width: 100, height: 100 }} src="" alt="profile-img"/>
        <p>{name}</p>
        <p>Major: {major}</p>
        <p>GPA: {gpa}</p>
        <p>Resume PDF: <Button size="small" variant="contained">download</Button> </p>
      </Box>
    </Item>
    </>
  );
};

const Interests = () => {
  const { interests } = React.useContext(UserContext);
  return (
    <>
      <Item sx={{marginY:"1em" }}>
        <Box>
          <Typography inline variant="body1" align="left">
            <Box  sx={{ fontWeight: 'bold' }}>Interests:</Box>
          </Typography>
          <Box mt={2} sx={{flexGrow: 1 }}>
            <Grid container direction="row">
              {interests.map((interest, index) => <Grid item xs={4}> <Chip label={interest} key={index} color={interestsList[interest]}/></Grid>)}
            </Grid>
          </Box>
          <Box mt={4}>
            <Typography inline variant="body1" align="left">
              <Box  sx={{ fontWeight: 'bold' }}>About:</Box>
            </Typography>
              <Box
              sx={{
                width: 1,
                height: 300,
                align: "left",
                mt: 2
              }}
              >
             <Typography inline variant="body1" align="left">...info about tmp</Typography>
           </Box>
          </Box>
        </Box>
      </Item>
    </>
  );
};

const ApplicationCard = ({job}) => {
  return(
    <>
      <Box sx={{flexGrow: 1 }}>
       <Item sx={{marginTop: "2em"}} >
        <Grid container direction="row">
            <Grid item xs={5}>
              <Typography sx={{textAlign: "left",fontWeight: "bold"}}>
                {job.title}
              </Typography>
              </Grid>
              <Grid item xs={2}>
              <Typography sx={{textAlign: "center",fontWeight: "bold"}}>
                {job.date}
              </Typography>
              </Grid>
              <Grid sx={{textAlign: "right"}} item xs={5}>
                  <Chip label={job.status} color={statusList[job.status]}/>
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
      <Item sx={{marginX:"1em"}}>
        <Typography inline variant="body1" align="left">
            <Box  sx={{ fontWeight: 'bold' }}>Applications</Box>
          </Typography>
          <Box mt={2} sx={{flexGrow: 1 }}>
            <Grid container direction="column">
              {jobsApplied.map((job, index) =>
                <ApplicationCard key={index} job={job}/>  
              )}
            </Grid>
          </Box>
      </Item>
    </>
  );
};





export const Profile = () => {
  const { name, setUser } = React.useContext(UserContext);
  return (
    <>
      <h1>Profile</h1>
      <Button variant="contained" onClick={() => setUser({})}>Sign Out</Button>
      <Box ml={2} mr={2} sx={{flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <ProfilePicInfo />
            </Grid>
            <Grid item xs={12}>
             <Interests/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Applications/>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};


