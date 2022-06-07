import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { JobInfo } from "../../components/Application/JobInfo/JobInfo";
import axios from "axios";
import { backendUrl } from "../../constants/backendUrl";
import { Item, statusList } from "../Profile/Profile";

const AppCard = ({ app }) => {
  return (
    <Link to={`/profile/applications/${app._id}`} style={{ textDecoration: "none" }} state={app}>
      <Box className="hover" sx={{ boxShadow: 6 }}>
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
            <Grid item xs={5} sx={{ textAlign: "right" }}>
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
  const [error, setError] = useState();
  const navigate = useNavigate({ replace: true });
  const job = location.state;

  const handleDelete = () => {
    setError();
    axios.delete(`${backendUrl}/api/jobs/${job._id}`).then((res) => {
      setError("Deleted. Redirecting...");
    }).catch((e) => {
      setError("Could not complete your request. Try again later.");
      console.log(e);
    })
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/applications/job/${job._id}`)
      .then((res) => {
        setApps(res.data);
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
      <Grid item xs={5}>
        <Item sx={{ marginX: "1em", padding: "1em", boxShadow: 6 }}>
          <Typography inline variant="body1" align="left">
            <Box sx={{ fontWeight: "bold" }}>Applications</Box>
          </Typography>
          <Box mt={2} sx={{ flexGrow: 1 }}>
            <Grid container direction="column">
              {apps.length > 0 ? apps.map((app, index) => (
                <AppCard key={index} app={app} />
              )) : <p>No applications currently found.</p>}
            </Grid>
          </Box>
        </Item>
      </Grid>
      <Grid item xs={6} sx={{ mx: 2 }}>
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
          <Button variant="contained" onClick={handleDelete}>Delete</Button>
        </Box>
      </Grid>
      {error && <p>{error}</p>}
    </Grid>
  );
};
