import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
	TextField,
	Typography,
	Box,
	CardContent,
	Card,
	Container,
	Paper,
	Button,
	FormControl,
} from "@mui/material";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { backendUrl } from "../../constants/backendUrl";
import { SquarePlus, CircleCheck } from "tabler-icons-react";

// TODO: put somewhere else later
const options = [
	{ value: "Computer Science", label: "Computer Science" },
	{ value: "Computer Engineering", label: "Computer Engineering" },
	{ value: "Electrical Engineering", label: "Electrical Engineering" },
	{ value: "Statistics", label: "Statistics" },
	{ value: "Mathematics", label: "Mathematics" },
	{ value: "Data Science", label: "Data Science" },
	{
		value: "Computer Science w/ Business Applications",
		label: "Computer Science w/ Business Applications",
	},
	{ value: "Physics", label: "Physics" },
];

export const JobListing = () => {
	// TODO: figure out how to use this

	const [course, setCourse] = useState("");
	const [position, setPosition] = useState("");
	const [desc, setDesc] = useState("");
	const [pay, setPay] = useState(0);
	const [people, setPeople] = useState(0);
	const [questions, setQuestions] = useState([""]);
	const [majors, setMajors] = useState();
	const [interests, setInterests] = useState();
	const [skills, setSkills] = useState();
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { _id: userId, name } = useContext(UserContext);

	// useEffect(() => {
	// 	console.log(majors);
	// 	console.log(interests);
	// 	console.log(skills);
	// 	// on state change for states in list
	// }, [majors, interests, skills]);

	const handleChange = (e, setState) => {
		setState(e.target.value);
		// console.log(e.target.value);
	};

	const handleSubmit = () => {
		setIsSubmitted(true);
		const job = {
			author: {
				userId: userId,
				name: name,
			},
			title: `${course} ${position}`,
			interests: interests.map((e) => e.value),
			majors: majors.map((e) => e.value),
			description: desc,
			people: people,
			skills: skills.map((e) => e.value),
			pay: pay,
			questions: questions.filter((e) => e !== ""),
		};

		axios
			.post(`${backendUrl}/api/jobs`, job)
			.then((res) => {
				console.log(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	if (isSubmitted) {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					m: 7,
					justifyContent: "center",
				}}
			>
				<Typography variant="h3">Submitted</Typography>
				<Box sx={{ ml: 1}}>
					<CircleCheck size={60} strokeWidth={2} color={"#407abf"} />
				</Box>
			</Box>
		);
	}

	return (
		<>
			<Container component="main" maxWidth="md" sx={{ mb: 4 }}>
				<Paper
					sx={{
						boxShadow: 6,
						my: { xs: 3, md: 6 },
						p: { xs: 2, md: 3 },
					}}
				>
					<Box
						component="form"
						sx={{ display: "flex", flexDirection: "column" }}
					>
						<TextField
							id="outlined-helperText"
							helperText="If applicable"
							sx={{ mb: 2 }}
							label="Course"
							variant="outlined"
							value={course}
							// onChange={() => dispatch({ type: 'set', payload: 1 })}
							onChange={(e) => handleChange(e, setCourse)}
						/>
						<TextField
							sx={{ mb: 2 }}
							label="Position"
							variant="outlined"
							value={position}
							onChange={(e) => handleChange(e, setPosition)}
						/>
						<TextField
							sx={{ mb: 2 }}
							label="Description"
							rows={5}
							multiline
							value={desc}
							onChange={(e) => handleChange(e, setDesc)}
						/>
						<TextField
							sx={{ mb: 2 }}
							label="Hourly Pay"
							type="number"
							variant="outlined"
							onChange={(e) => handleChange(e, setPay)}
						/>
						<TextField
							sx={{ mb: 2 }}
							label="Number of Applicants"
							type="number"
							variant="outlined"
							onChange={(e) => handleChange(e, setPeople)}
						/>

						{/* Make so that you can add any amount of question textfields */}
						<Typography variant="h6" align="left" sx={{ m: 1 }}>
							Optional Questions For Applicant
						</Typography>
						<Box
							sx={{
								display: "flex",
								alignItems: "flex-start",
								flexDirection: "column",
							}}
						>
							{questions.map((question, i) => (
								<TextField
									sx={{ mb: 2 }}
									fullWidth
									rows={5}
									value={questions[i]}
									onChange={(e) => {
										questions[i] = e.target.value;
										setQuestions([...questions]);
										// console.log(questions);
									}}
								/>
							))}
						</Box>
						<Box
							display="flex"
							justifyContent="flex-end"
							alignItems="flex-end"
						>
							<Button
								variant="contained"
								sx={{ ml: 1 }}
								onClick={() => {
									setQuestions([...questions, ""]);
									// console.log(questions);
								}}
							>
								<SquarePlus
									size={30}
									strokeWidth={1}
									color={"white"}
								/>
							</Button>
						</Box>
						<Typography variant="h6" align="left" sx={{ m: 1 }}>
							Majors
						</Typography>
						<CreatableSelect
							closeMenuOnSelect={false}
							isMulti
							options={options}
							onChange={(e) => {
								setMajors(e);
							}}
						/>
						<Typography variant="h6" align="left" sx={{ m: 1 }}>
							Interests
						</Typography>
						<CreatableSelect
							closeMenuOnSelect={false}
							isMulti
							onChange={(e) => {
								setInterests(e);
							}}
						/>
						<Typography variant="h6" align="left" sx={{ m: 1 }}>
							Skills
						</Typography>
						<CreatableSelect
							closeMenuOnSelect={false}
							isMulti
							onChange={(e) => {
								setSkills(e);
							}}
						/>
					</Box>
					<Button
						variant="contained"
						size="large"
						sx={{ mt: 3 }}
						onClick={handleSubmit}
					>
						Create Listing
					</Button>
				</Paper>
			</Container>
		</>
	);
};
