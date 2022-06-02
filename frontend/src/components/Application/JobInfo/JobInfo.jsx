import { Card, Typography, CardContent, Box } from "@mui/material";
import { Users } from "tabler-icons-react";

export const JobInfo = ({ job }) => {
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
					sx={{
						textAlign: "left",
						marginTop: "1em",
						color: "primary.main",
					}}
				>
					{job.author.name ? job.author.name : job.author}
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
				<Typography
					variant="body2"
					sx={{
						textAlign: "left",
						marginTop: "1em",
						marginBottom: "1em",
            fontWeight: "bold",
					}}
				>
					Skills:
				</Typography>
				{job?.skills?.length < 1 ? (
					<p> no skills </p>
				) : (
					job?.skills?.map((skill) => (
						<>
							<Typography
								variant="body2"
								sx={{ textAlign: "left" }}
							>
								{skill}
							</Typography>
						</>
					))
				)}

				<Typography
					variant="body2"
					sx={{ textAlign: "left", marginTop: "1em" }}
				>
					${job?.pay} an hour
				</Typography>
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						gap: "1.5em",
						marginTop: "1em",
					}}
				>
					<Users width="25" height="25" />
					<Typography variant="body1">{job?.people}</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};
