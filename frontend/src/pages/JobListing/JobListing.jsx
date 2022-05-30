import axios from "axios";
import React from "react";
import { JobCard } from "../../components/Home/JobCard/JobCard";
import {
	TextField,
	Select,
	FormGroup,
	FormHelperText,
	MenuItem,
	Button,
	FormControlLabel,
	FormLabel,
	Chip,
	Grid,
	Typography,
	Checkbox,
	Card,
} from "@mui/material";

// {
// 	author: {
// 		userId: {
// 			type: Schema.Types.ObjectId,
// 			ref: "User",
// 		},
// 		name: String,
// 	},
// 	title: String,
// 	interests: [String],
// 	majors: [String],
// 	skills: [String],
// 	pay: String,
// 	questions: [String],
// 	applications: [{ type: Schema.Types.ObjectId, ref: "Application" }],
// }

export const JobListing = () => {
	return (
		<>
			<Card sx={{ boxShadow: 6 }}>
				<Grid
					container
					spacing={3}
					justifyContent="center"
					alignItems="center"
				>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="firstName"
							name="firstName"
							label="First name"
							fullWidth
							autoComplete="given-name"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="lastName"
							name="lastName"
							label="Last name"
							fullWidth
							autoComplete="family-name"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							id="address1"
							name="address1"
							label="Address line 1"
							fullWidth
							autoComplete="shipping address-line1"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="address2"
							name="address2"
							label="Address line 2"
							fullWidth
							autoComplete="shipping address-line2"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="city"
							name="city"
							label="City"
							fullWidth
							autoComplete="shipping address-level2"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="state"
							name="state"
							label="State/Province/Region"
							fullWidth
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="zip"
							name="zip"
							label="Zip / Postal code"
							fullWidth
							autoComplete="shipping postal-code"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="country"
							name="country"
							label="Country"
							fullWidth
							autoComplete="shipping country"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Checkbox
									color="secondary"
									name="saveAddress"
									value="yes"
								/>
							}
							label="Use this address for payment details"
						/>
					</Grid>
				</Grid>
			</Card>
		</>
	);
};
