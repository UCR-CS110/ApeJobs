import {
	Card,
	Typography,
	Chip,
	CardContent,
	Box,
	CardActions,
	Button,
} from "@mui/material";
import { interestsList } from "../../../constants/interests";
import { useNavigate } from "react-router-dom";

export const JobInfo = ({ job }) => {
	const navigate = useNavigate();
	return (
		<Card sx={{ boxShadow: 6 }}>
			<CardContent>
				<Typography
					variant="h5"
					sx={{ textAlign: "left", fontWeight: "bold" }}
				>
					{job.title}
				</Typography>
				<Typography
					variant="h6"
					sx={{ textAlign: "left", marginTop: "1em" }}
				>
					{job.author}
				</Typography>
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
				<Typography
					variant="body2"
					sx={{
						textAlign: "left",
						marginTop: "1em",
						marginBottom: "1em",
					}}
				>
					{job?.description}
				</Typography>
				{job?.skills.map((skill) => (
					<>
						<Typography variant="body2" sx={{ textAlign: "left" }}>
							{skill}
						</Typography>
					</>
				))}
				<Typography
					variant="body2"
					sx={{ textAlign: "left", marginTop: "1em" }}
				>
					{job?.pay}
				</Typography>
			</CardContent>
		</Card>
	);
};
