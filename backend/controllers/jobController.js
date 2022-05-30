const asyncHandler = require("express-async-handler");
const Job = require("../models/jobModel");

const getJobs = asyncHandler(async (req, res) => {
	const jobs = await Job.find();
	res.status(200).json(jobs);
});

const getJob = 	asyncHandler(async (req, res) => {
	Job.find({ "author.user_id": req.params.id }, (err, jobs) => {
		if (err) res.status(400).send("No jobs found for author.");
		return res.json(jobs);
	});
});

const setJob = asyncHandler(async (req, res) => {
	const jobs = await Job.create({
		author: req.body.author,
		title: req.body.title,
		interests: req.body.interests,
		majors: req.body.majors,
		people: req.body.people,
		description: req.body.description,
		skills: req.body.skills,
		pay: req.body.pay,
		questions: req.body.questions,
	});
	res.status(200).json(jobs);
});

const updateJob = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `update job ${req.params.id}` });
});

const deleteJob = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `delete job ${req.params.id}` });
});

module.exports = { getJobs, getJob, setJob, updateJob, deleteJob };
