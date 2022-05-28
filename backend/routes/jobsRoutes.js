const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const Job = require("../models/jobModel");

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const jobs = await Job.find();
		res.status(200).json(jobs);
	})
);

// Make sure to update this when adding fields
router.post(
	"/",
	asyncHandler(async (req, res) => {
		const jobs = await Job.create({
			author: { _id: req.body.id, name: req.body.name },
			title: req.body.title,
			interests: req.body.interests,
			majors: req.body.majors,
			people: req.body.people,
			description: req.body.description,
			skills: req.body.skills,
			pay: req.body.pay,
			questions: req.body.questions
		});
		res.status(200).json(jobs);
	})
);

router.put("/:id", (req, res) => {
	res.status(200).json({ message: `update job ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
	res.status(200).json({ message: `delete job ${req.params.id}` });
});

router.get(
	"/:id",
	((req, res) => {
		Job.find({ "author._id": req.params.id }, (err, jobs) => {
			if (err) res.status(400).send("No jobs found for author.");
			return res.json(jobs);
		});
	})
);

module.exports = router;
