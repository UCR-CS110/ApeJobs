import { Card, Typography, Box, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	typography: {
		h3: {
			fontFamily: "Inter",
			fontSize: 20,
			fontWeight: "bold",
		},
		h6: {
			fontFamily: "Inter",
			fontSize: 15,
			fontWeight: "bold",
		},
	},
});

export const StudentCard = ({ user }) => {
	return (
		<ThemeProvider theme={theme}>
			<Box m={3} ml={5} pt={1}>
				<Grid container spacing={2} direction="column">
					<Grid align="left" item xs={6}>
						<Typography variant="h6">Name</Typography>
						<Typography variant="h6">{user.name}</Typography>
					</Grid>
					<Grid align="left" item xs={6}>
						<Typography variant="h6">Email</Typography>
						<Typography variant="h6">{user.email}</Typography>
					</Grid>
					<Grid align="left" item xs={6}>
						<Typography variant="h6">Major</Typography>
						<Typography variant="h6">{user.major}</Typography>
					</Grid>
					<Grid align="left" item xs={6}>
						<Typography variant="h6">GPA</Typography>
						<Typography variant="h6">{user.gpa}</Typography>
					</Grid>
					<Grid align="left" item xs={6}>
						<Typography variant="body1">
							About: {user.about}
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</ThemeProvider>
	);
};
