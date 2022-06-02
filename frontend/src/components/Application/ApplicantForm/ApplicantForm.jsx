import axios from "axios";
import {
	Card,
	Typography,
	Box,
	Button,
	TextField,
	Grid,
	FormLabel,
	FormGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
	CircleCheck,
	ArrowNarrowRight,
	ArrowNarrowLeft,
} from "tabler-icons-react";
import { UserContext } from "../../../contexts/UserContext/UserContext";
import { backendUrl } from "../../../constants/backendUrl";
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

export const ApplicantForm = ({ job }) => {
	const {
		_id: userId,
		name,
		email,
		major,
		gpa,
		about,
		applications,
		setUser,
	} = useContext(UserContext);
	// const { name, email, major, gpa } = mockContext;
	const { _id: jobId, questions } = job;
	const [fieldInputs, setFieldInputs] = useState([]);
	const [applied, setApplied] = useState(false);
	const [formPage, setFormPage] = useState(0);
	// const [error, setError] = useState();
	// const [loggedIn, setLoggedIn] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const navigate = useNavigate();

	// TODO: fix user login detection when we add tokens

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitted(true);

		let fields = [];
		for (let i = 0; i < questions.length; i++) {
			fields.push({ question: questions[i], answer: fieldInputs[i] });
		}

		const app = {
			user: { userId, name },
			optionalFields: fields,
			job: jobId,
			status: "pending",
			messages: [],
		};

		axios
			.post(`${backendUrl}/api/applications`, app)
			.then((res) => {
				setApplied(true);
				setUser({ applications: [...applications, res.data._id] });
			})
			.catch((e) => {
				console.log(e);
				// setError(
				// 	"Unable to complete your request. Please try again later."
				// );
			});
	};

	const InputCallBack = (inputs) => {
		setFieldInputs(inputs);
	};

	const isLoggedIn =
		userId === null &&
		name === null &&
		email === null &&
		major === null &&
		gpa === null;

	const handleClick = () => {
		navigate("/signin");
	};

	if (isSubmitted) {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					mt: 15,
				}}
			>
				<Typography variant="h3">Submitted</Typography>
				<Box sx={{ ml: 1 }}>
					<CircleCheck size={60} strokeWidth={2} color={"#407abf"} />
				</Box>
			</Box>
		);
	}

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
				{isLoggedIn ? (
					<Box p={11}>
						<Button
							variant="contained"
							size="large"
							onClick={handleClick}
						>
							Login to apply
						</Button>
					</Box>
				) : (
					<div>
						{formPage === 0 ? (
							<Box mt={3} ml={5} pt={1}>
								<Grid container spacing={2} direction="column">
									<Grid align="left" item xs={6}>
										<Typography variant="h6">
											Name: {name}
										</Typography>
									</Grid>
									<Grid align="left" item xs={6}>
										<Typography variant="h6">
											Email: {email}
										</Typography>
									</Grid>
									<Grid align="left" item xs={6}>
										<Typography variant="h6">
											Major: {major}
										</Typography>
									</Grid>
									<Grid align="left" item xs={6}>
										<Typography variant="h6">
											GPA: {gpa}
										</Typography>
									</Grid>
								</Grid>
							</Box>
						) : (
							<>
								<OptionalForm
									questions={questions}
									parentCallback={InputCallBack}
								/>
								<Box
									m={2}
									//margin
									display="flex"
									justifyContent="flex-end"
									alignItems="flex-end"
								>
									{!applied ? (
										<Button
											variant="contained"
											onClick={handleSubmit}
										>
											Apply
										</Button>
									) : (
										<Typography variant="body1">
											You have already applied for this
											role.
										</Typography>
									)}
								</Box>
							</>
						)}
						{questions.length === 0 ? (
							<Box
								m={2}
								//margin
								display="flex"
								justifyContent="flex-end"
								alignItems="flex-end"
							>
								{!applied ? (
									<Button
										variant="contained"
										onClick={handleSubmit}
									>
										Apply
									</Button>
								) : (
									<Typography variant="body1">
										You have already applied for this role.
									</Typography>
								)}
							</Box>
						) : (
							<>
								<Box
									//margin
									display="flex"
									justifyContent="flex-end"
									alignItems="flex-end"
								>
									<Button
										size="small"
										onClick={(e) => {
											if (formPage > 0)
												setFormPage(formPage - 1);
										}}
									>
										<ArrowNarrowLeft
											size={40}
											strokeWidth={2}
											color={"#4067bf"}
										/>
									</Button>
									<Button
										size="small"
										onClick={(e) => {
											if (
												questions.length > 0 &&
												formPage < 1
											)
												setFormPage(formPage + 1);
										}}
									>
										<ArrowNarrowRight
											size={40}
											strokeWidth={2}
											color={"#4067bf"}
										/>
									</Button>
								</Box>
							</>
						)}
					</div>
				)}
			</Card>
		</ThemeProvider>
	);
};

const OptionalForm = ({ questions, parentCallback }) => {
	const [values, setValues] = useState([]);

	return (
		<>
			<Box mt={3} ml={5} pr={5}>
				<Grid container spacing={3} direction="column">
					{questions.map((question, i) => (
						<Grid align="left" item xs={6}>
							<FormGroup>
								<FormLabel sx={{ pb: 2 }}>{question}</FormLabel>
								<TextField
									id="outlined-multiline-static"
									multiline
									key={i}
									value={values[i]}
									rows={2}
									onChange={(e) => {
										values[i] = e.target.value;
										setValues([...values]);
										parentCallback(values);
									}}
								/>
							</FormGroup>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
};
