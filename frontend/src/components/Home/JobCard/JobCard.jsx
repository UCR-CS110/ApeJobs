import { Card, Typography, Chip } from "@mui/material";
import { interestsList } from "../../../constants/interests";
import { Users } from "tabler-icons-react";
import "./JobCard.css";
import { useNavigate } from "react-router-dom";

// TODO: account for undefined cases?
export const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="hover"
      sx={{ margin: "auto", marginTop: "2em", width: "60%", padding: "1%" }}
      onClick={() => {
        // passing state into the next page
        navigate(`/listing/${job._id}/apply`, {state: job});
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "left", fontWeight: "bold" }}>
        {job.title}
      </Typography>
      <Typography variant="h6" sx={{ textAlign: "left", marginTop: "1em", color: "primary.main" }}>
        {job.author.name ? job.author.name : job.author}
      </Typography>
      <div className="interestHolder">
        {job.interests.length > 0 &&
          job.interests.map((interest, index) => (
            <Chip
              key={index}
              label={interest}
              color={interestsList[interest]}
            />
          ))}
      </div>
      {job?.majors.map((major) => (
        <>
          <Typography
            variant="body1"
            sx={{ textAlign: "right", fontWeight: "bold" }}
          >
            {major}
          </Typography>
        </>
      ))}
      <Typography variant="body2" sx={{ textAlign: "left", marginTop: "1em" }}>
        {job?.description}
      </Typography>
      <div className="iconRight">
        <Users width="30" height="30" />
        <Typography variant="h5">{job.people}</Typography>
      </div>
    </Card>
  );
};
