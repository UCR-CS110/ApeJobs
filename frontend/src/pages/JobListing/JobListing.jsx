import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { useReducer, useState } from "react";
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
import { majors } from "../../constants/majors";
import { SquarePlus } from "tabler-icons-react";

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

const reducer = (state, action) => {
	switch (action.type) {
		case "set":
			return { count: state.count + action.payload };
		default:
			throw new Error();
	}
};

export const JobListing = () => {
	// TODO: figure out how to use this
	// const [state, dispatch] = useReducer(reducer, initialState);

	const [course, setCourse] = useState("");
	const [position, setPosition] = useState("");
	const [desc, setDesc] = useState("");
	const [pay, setPay] = useState(null);
	const [questions, setQuestions] = useState([]);
	const [majors, setMajors] = useState([]);
	const [interests, setInterests] = useState([]);
	const [skills, setSkills] = useState([]);

	const handleChange = (e, setState) => {
		setState(e.target.value);
		console.log(e.target.value);
	};

	const onSubmit = () => {};
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
							value={pay}
							onChange={(e) => handleChange(e, setPay)}
						/>

						{/* Make so that you can add any amount of question textfields */}
						<Typography variant="h6" align="left" sx={{ m: 1 }}>
							Optional Questions For Applicant
						</Typography>
						<Box
							display="flex"
							justifyContent="flex-end"
							alignItems="flex-end"
						>
							<TextField
								fullWidth
								rows={5}
								value={questions}
								onChange={(e) => handleChange(e, setQuestions)}
							/>
							<Button variant="contained" sx={{ ml: 1 }}>
								<SquarePlus
									size={45}
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
							// value={majors}
							// onChange={(e) => setMajors([...majors, e])}
						/>
						<Typography variant="h6" align="left" sx={{ m: 1 }}>
							Interests
						</Typography>
						<CreatableSelect
							closeMenuOnSelect={false}
							isMulti
							value={interests}
							onChange={(e) => console.log(e.target)}
						/>
						<Typography variant="h6" align="left" sx={{ m: 1 }}>
							Skills
						</Typography>
						<CreatableSelect
							closeMenuOnSelect={false}
							isMulti
							value={skills}
							onChange={(e) => console.log(e)}
						/>
					</Box>
					<Button
						variant="contained"
						size="large"
						sx={{ mt: 3 }}
						onSubmit={onSubmit}
					>
						Create Listing
					</Button>
				</Paper>
			</Container>
		</>
	);
};
