import React from "react";
import { JobInfo } from "../../components/Application/JobInfo/JobInfo";
import { NavBar } from "../../components/NavBar/NavBar";
import { ApplicantForm } from "../../components/Application/ApplicantForm/ApplicantForm";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";

//replace job map with job card component
//remove default jobs when backend is completed
export const Application = () => {
	const location = useLocation();
	console.log(location.state);

	return (
		<>
			<NavBar />
			<Grid
				container
				spacing={2}
				justifyContent="center"
				sx={{ marginTop: "1rem" }}
			>
				<Grid item xs={5} sx={{ mx: 5 }}>
					<ApplicantForm job={location.state}/>
				</Grid>
				<Grid item xs={5} sx={{ mx: 5 }}>
					{location.state && <JobInfo job={location.state} />}
				</Grid>
			</Grid>
		</>
	);
};
