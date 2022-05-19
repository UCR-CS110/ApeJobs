import {
	Card,
	Typography,
	Chip,
	CardContent,
	Box,
	CardActions,
	Button,
	TextField,
	Grid,
	FormControl,
	FormLabel,
	FormGroup,
	TextareaAutosize,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ArrowNarrowRight, ArrowNarrowLeft } from "tabler-icons-react";
import { UserContext } from "../../../contexts/UserContext/UserContext";
import "./ApplicantForm.css";

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

const mockContext = {
	id: 1,
	email: "tng69@ucr.edu",
	name: "Tyson Ngo",
	picture: null,
	setUser: () => null,
	type: "student",
	interests: [],
	major: "Computer Science",
	gpa: "4.0",
};

const mockOptionalFields = {
	questions: [
		"How much experience do you have?",
		"Where are the UCR donkeys?",
		"Do you love Elena?",
		"If you have taken CS111, was it easy?",
	],
};

export const ApplicantForm = () => {
	// const { name, email, major, gpa } = useContext(UserContext);
	const { name, email, major, gpa } = mockContext;
	const [questions, setQuestions] = useState(mockOptionalFields.questions);
	const [formPage, setFormPage] = useState(0);
	const navigate = useNavigate();
	return (
		<ThemeProvider theme={theme}>
			<Card sx={{ boxShadow: 6 }}>
				<Box pt={3} display="flex" justifyContent="center">
					<Typography
						variant="h3"
						sx={{ borderBottom: 2, paddingBottom: 3, width: "90%" }}
					>
						Apply w/ ApeJobs Info
					</Typography>
				</Box>
				{formPage === 0 && (
					<Box mt={3} ml={5} pt={1}>
						<Grid container spacing={2} direction="column">
							<Grid align="left" item xs={6}>
								<Typography variant="h6">{name}</Typography>
							</Grid>
							<Grid align="left" item xs={6}>
								<Typography variant="h6">{email}</Typography>
							</Grid>
							<Grid align="left" item xs={6}>
								<Typography variant="h6">{major}</Typography>
							</Grid>
							<Grid align="left" item xs={6}>
								<Typography variant="h6">{gpa}</Typography>
							</Grid>
						</Grid>
					</Box>
				)}
				{formPage === 1 && (
					<>
						<OptionalForm questions={questions} />
						<Box
							m={2}
							//margin
							display="flex"
							justifyContent="flex-end"
							alignItems="flex-end"
						>
							<Button variant="contained">Apply</Button>
						</Box>
					</>
				)}
				<Box
					//margin
					display="flex"
					justifyContent="flex-end"
					alignItems="flex-end"
				>
					<Button size="small"
						onClick={(e) => {
							if (formPage > 0) setFormPage(formPage - 1);
						}}
					>
						<ArrowNarrowLeft
							size={40}
							strokeWidth={2}
							color={"#4067bf"}
						/>
					</Button>
					<Button size="small"
						onClick={(e) => {
							if (formPage < 1) setFormPage(formPage + 1);
						}}
					>
						<ArrowNarrowRight
							size={40}
							strokeWidth={2}
							color={"#4067bf"}
						/>
					</Button>
				</Box>
			</Card>
		</ThemeProvider>
	);
};

const OptionalForm = ({ questions }) => {
	return (
		<>
			<Box mt={3} ml={5} pr={5}>
				<Grid container spacing={3} direction="column">
					{questions.map((q) => (
						<Grid align="left" item xs={6}>
							<FormGroup>
								<FormLabel sx={{ pb: 2 }}>{q}</FormLabel>
								<TextField
									id="outlined-multiline-static"
									multiline
									rows={2}
								/>
							</FormGroup>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
};
