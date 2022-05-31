import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { JobInfo } from "../../components/Application/JobInfo/JobInfo";
import axios from "axios";
import { backendUrl } from "../../constants/backendUrl";
import { Item, statusList } from "../Profile/Profile";

const AppCard = ({ app }) => {
  return (
    <Link to={`/app/${app._id}`} style={{ textDecoration: "none" }} state={app}>
      <Box className="hover" sx={{ flexGrow: 1 }}>
        <Item sx={{ marginTop: "2em" }}>
          <Grid container direction="row">
            <Grid item xs={5}>
              <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
                {app.user && app.user.name}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: "center" }}>
                {new Date(app.createdAt).toISOString().split('T')[0]}
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{textAlign: "right"}}>
              <Chip label={app.status} color={statusList[app.status]} />
            </Grid>
          </Grid>
        </Item>
      </Box>
    </Link>
  );
};

export const JobListing = () => {
  const location = useLocation();
  const [apps, setApps] = useState([]);
  const job = location.state;
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/applications/job/${job._id}`)
      .then((res) => {
        setApps(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setApps, job]);

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{ marginTop: "1rem" }}
    >
      <Grid item xs={5} sx={{ mx: 5 }}>
        <Item sx={{ marginX: "1em", padding: "1em" }}>
          <Typography inline variant="body1" align="left">
            <Box sx={{ fontWeight: "bold" }}>Applications</Box>
          </Typography>
          <Box mt={2} sx={{ flexGrow: 1 }}>
            <Grid container direction="column">
              {apps.map((app, index) => (
                <AppCard key={index} app={app} />
              ))}
            </Grid>
          </Box>
        </Item>
      </Grid>
      <Grid item xs={5} sx={{ mx: 5 }}>
        {job && <JobInfo job={job} />}
        <Box
          sx={{
            display: "flex",
            gap: "0.5rem",
            marginTop: "1em",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="contained">Edit</Button>
          <Button variant="contained">Delete</Button>
        </Box>
      </Grid>
    </Grid>
  );
};
