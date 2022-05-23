const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const Job = require("../models/jobModel");

const mock = [
	{
		id: 1,
		author: "Mariam Salloum",
		title: "CS178 Grader",
		interests: ["Web Development", "Embedded Systems", "Big Data"],
		majors: ["Computer Science"],
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		people: 1,
	},
	{
		id: 2,
		author: "Phillip Brisk",
		title: "CS120B Grader",
		interests: [],
		majors: ["Computer Science", "Electrical Engineering"],
		description: "",
		people: 2,
	},
	{
		id: 3,
		author: "Vagelis Hristidis",
		title: "Information Retrieval Researcher",
		interests: ["Machine Learning"],
		majors: ["Computer Science"],
		people: 3,
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
];

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
			author: req.body.author,
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

module.exports = router;
