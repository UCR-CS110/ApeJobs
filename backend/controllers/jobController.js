const asyncHandler = require("express-async-handler");
const Job = require("../models/jobModel");
const Application = require("../models/applicationModel");

const getJobs = asyncHandler(async (req, res) => {
	if (req.query.jobId) {
		Job.findById(req.query.jobId, (err, jobs) => {
			if (err) res.status(400).send("No jobs found for id.");
			res.status(200).json(jobs);
		});
	} else {
		const jobs = await Job.find();
		res.status(200).json(jobs);
	}
});

const getJob = asyncHandler(async (req, res) => {
	// find all documents with the given author's user id
	Job.find({ "author.userId": req.params.id }, (err, jobs) => {
		if (err) res.status(400).send("No jobs found for author.");
		res.status(200).json(jobs);
	});
});

const setJob = asyncHandler(async (req, res) => {
	const jobs = await Job.create({
		author: req.body.author,
		title: req.body.title,
		interests: req.body.interests,
		majors: req.body.majors,
		description: req.body.description,
		people: req.body.people,
		skills: req.body.skills,
		pay: req.body.pay,
		questions: req.body.questions,
		applications: [],
	});
	res.status(200).json(jobs);
});

const updateJob = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `update job ${req.params.id}` });
});

const deleteJob = asyncHandler(async (req, res) => {
	Job.deleteOne({ _id: req.params.id }).then((err, result) => {
		if (err) return res.status(401).send("Error removing.");
		Application.updateMany({ job: req.params.id }, {status: "denied"}, (err, result) => {
			if (err) return res.status(401).send("Error removing.");
		})
		return res.status(200).send("Deleted.");
	});
});



module.exports = { getJobs, getJob, setJob, updateJob, deleteJob };
