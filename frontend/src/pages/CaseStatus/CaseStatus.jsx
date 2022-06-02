import React from "react";
import {
	Button,
	Box,
	Container,
	Divider,
	FormControl,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Paper,
	TextField,
	Typography,
	Avatar,
	Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { backendUrl } from "../../constants/backendUrl";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { useLocation } from "react-router-dom";
import { JobInfo } from "../../components/Application/JobInfo/JobInfo";
import { StudentCard } from "../../components/StudentCard/StudentCard";
import axios from "axios";

const StyledPaper = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(3),
	color: theme.palette.text.primary,
	paddingRight: theme.spacing(2),
	boxShadow: 6,
}));

const Comment = ({ message, picture }) => {
	return (
		<>
			<Grid my={"1em"} mr={"1em"} item xs={12}>
				<StyledPaper>
					<Grid container wrap="nowrap" spacing={2}>
						<Grid item>
							<Avatar src={picture}></Avatar>
						</Grid>
						<Grid item xs>
							<Typography>{message.message}</Typography>
						</Grid>
					</Grid>
				</StyledPaper>
			</Grid>
		</>
	);
};

const CommentContainer = ({ app, application }) => {
	const [messages, setMessages] = React.useState(application.messages);
	const [userMessage, setUserMessage] = React.useState("");
	const { _id, picture, name } = React.useContext(UserContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		const msg = {
			user: { userId: _id, picture, name },
			message: userMessage,
			application: application._id,
		};
		console.log("going ot send", msg);
		axios
			.post(`${backendUrl}/api/applications/${app._id}/messages`, msg)
			.then((res) => {
				// setError();
				console.log("sent msg", res.data);
				setMessages((prev) => [...prev, res.data]);
			})
			.catch((e) => {
				console.log(e);
				// setError(
				// 	"Unable to complete your request. Please try again later."
				// );
			});

		setUserMessage("");
	};

	React.useEffect(() => {
		axios
			.get(`${backendUrl}/api/applications/${app._id}/messages`)
			.then((res) => {
				console.log("msgs", res.data);
				setMessages(res.data);
				// setError();
				//console.log(res.data);
			})
			.catch((e) => {
				console.log(e);
				// setError(
				// 	"Unable to complete your request. Please try again later."
				// );
			});
	}, [app]);

	return (
		<>
			{application && (
				<Paper elevation={5}>
					<Box sx={{ boxShadow: 4 }} p={3}>
						<Grid container direction="row" alignItems="center">
							<Grid item xs={12}>
								<Typography variant="h4" gutterBottom>
									Comments
								</Typography>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								<Grid container m="1em" alignItems="center">
									<Grid
										sx={{
											height: "30rem",
											overflowY: "scroll",
										}}
										xs={12}
										item
									>
										{messages.map((message, index) => (
											<Comment
												key={index}
												message={message}
												picture={
													message.user &&
													message.user.picture
												}
											/>
										))}
									</Grid>
									<Grid xs={9} mt={"1em"} item>
										<form
											className="user-message"
											onSubmit={handleSubmit}
										>
											<TextField
												label="Type your message..."
												value={userMessage}
												onChange={(event) => {
													setUserMessage(
														event.target.value
													);
												}}
												variant="outlined"
												required
												fullWidth
											/>
										</form>
									</Grid>
									<Grid xs={3} item>
										<Button
											type="submit"
											disabled={!userMessage}
											onClick={handleSubmit}
											variant="contained"
										>
											Send
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			)}
		</>
	);
};

export const Question = ({ question }) => {
	return (
		<>
			<Box my={"1em"}>
				<Typography inline variant="body1" align="left">
					<Box sx={{ fontWeight: "bold" }}>{question.question}</Box>
				</Typography>
				<Typography inline variant="body1" align="left">
					{question.answer}
				</Typography>
			</Box>
		</>
	);
};

export const QuestionsCard = ({ job }) => {
	return (
		<>
			<Paper elevation={5}>
				<Box sx={{ boxShadow: 4 }} p={3}>
					<Typography inline variant="h5" align="left">
						<Box sx={{ fontWeight: "bold" }}>Questions</Box>
					</Typography>
					{job.optionalFields.map((question, index) => (
						<Question question={question} />
					))}
				</Box>
			</Paper>
		</>
	);
};

export const CaseStatus = () => {
	const [application, setApplication] = React.useState();
	const [job, setJob] = React.useState();
	const user = React.useContext(UserContext);

	const location = useLocation();
	React.useEffect(() => {
		//regex to remove %20 that appears in names with an apostrophe
		axios
			.get(`${backendUrl}/api/applications/${location.state._id}`)
			.then((res) => {
				setApplication(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
		axios
			.get(`${backendUrl}/api/jobs/?jobId=${location.state.job}`)
			.then((res) => {
				console.log("job", res.data);
				setJob(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [setApplication, location]);

	// TODO: fix this unless its okay to do
	const handleDecision = (decision) => {
		const appId = location.state._id;
		axios
			.put(`${backendUrl}/api/applications/${appId}`, {
				status: decision,
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<>
			<Grid container>
				<Grid ml={4} mr={"4em"} mt={"1em"} item xs={4}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							{application && user.type === "student"
								? job && <JobInfo job={job} />
								: application && (
										<Card sx={{ boxShadow: 6 }}>
											<Box
												sx={{
													display: "flex",
													flexDirection: "row",
													mt: 3,
													justifyContent: "center",
												}}
											>
												<Button
													sx={{ mx: 2 }}
													variant="contained"
													color="success"
													onClick={() =>
														handleDecision(
															"accepted"
														)
													}
												>
													Accept
												</Button>
												<Button
													sx={{
														mx: 2,
														minWidth: "6rem",
													}}
													variant="contained"
													color="error"
													onClick={() =>
														handleDecision(
															"denied"
														)
													}
												>
													Deny
												</Button>
											</Box>
											<StudentCard
												user={application.user.userId}
											/>
										</Card>
								  )}
							{application && console.log(application)}
						</Grid>
						<Grid item xs={12}>
							{application && <QuestionsCard job={application} />}
						</Grid>
					</Grid>
				</Grid>
				<Grid mt={"1em"} item xs={7}>
					{application && (
						<CommentContainer
							app={location.state}
							application={application}
						/>
					)}
				</Grid>
			</Grid>
		</>
	);
};
