import axios from "axios";
import React from "react";
import { JobInfo } from "../../components/Application/JobInfo/JobInfo";
import { NavBar } from "../../components/NavBar/NavBar";
import { backendUrl } from "../../constants/backendUrl";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { Grid , Paper , Box} from "@mui/material";
import { styled } from '@mui/material/styles';

const mock = {
	id: 1,
	author: "Mariam Salloum",
	title: "CS178 Grader",
	interests: ["Web Development", "Embedded Systems", "Big Data"],
	majors: ["Computer Science"],
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	people: 1,
};

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "blue",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

//replace job map with job card component
//remove default jobs when backend is completed
export const Application = () => {
	const { name } = React.useContext(UserContext);
	const [jobs, setJobs] = React.useState([]);

	React.useEffect(() => {
		axios
			.get(`${backendUrl}/jobs`)
			.then((res) => {
				setJobs(res.data);
			})
			.catch((e) => {
				// incase no result
				setJobs([mock]);
			});
	}, []);
	return (
		<>
			<NavBar />
			<Grid container spacing={4}>
				<Grid item xs={5}>
					<Item>xs=8</Item>
				</Grid>
				<Grid item xs={7}>
					<Item>xs=4</Item>
				</Grid>
			</Grid>
			<JobInfo />
		</>
	);
};
