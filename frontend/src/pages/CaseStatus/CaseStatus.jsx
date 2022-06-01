import React from "react";
import {
  Button,
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { backendUrl } from "../../constants/backendUrl";

import axios from "axios";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

const Comment = ({ message }) => {
  return (
    <>
      <Grid mt={"1em"} id="chat-window" xs={12} item>
        <StyledPaper>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar>W</Avatar>
            </Grid>
            <Grid item xs>
              <Typography>{message.message}</Typography>
            </Grid>
          </Grid>
        </StyledPaper>
      </Grid>
    </>
  );
};

const CommentContainer = () => {
  const [application, setApplication] = React.useState([]);

  React.useEffect(() => {
    //regex to remove %20 that appears in names with an apostrophe
    axios
    .get(`${backendUrl}/api/applications/62974311990e265e0edd7a31`)
    .then((res) => {
      setApplication(res.data);
    })
      .catch((e) => {
        console.log(e);
      });
    }, [application, setApplication]);
    
    const handleSubmit = () => {
  
      const msg = {
        user: application.user.userId._id,
        message: "dog water",
        application: application._id 
      }

      axios
        .post(`${backendUrl}/api/applications/62974311990e265e0edd7a31/messages`, msg)
        .then((res) => {
          // setError();
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
          // setError(
          // 	"Unable to complete your request. Please try again later."
          // );
        });
  
    }

console.log(application)

  return (
    <>
      <Container>
        <Paper elevation={5}>
          <Box sx={{ boxShadow: 4 }} p={3}>
            <Typography variant="h4" gutterBottom>
              Comments
            </Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center">
              {application.messages?.map((message, index) => (
                <Comment message={message} />
              ))}
              <Grid xs={9} item>
                <FormControl fullWidth>
                  <TextField label="Type your message..." variant="outlined" />
                </FormControl>
              </Grid>
              <Grid xs={3} item>
                <Button onClick={handleSubmit} variant="contained">Send</Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export const CaseStatus = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid mt={1} item xs={9}>
          <CommentContainer />
        </Grid>
      </Grid>
    </>
  );
};
