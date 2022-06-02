const asyncHandler = require("express-async-handler");
const Application = require("../models/applicationModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Job = require("../models/jobModel");

const getApplications = asyncHandler(async (req, res) => {
	const jobId = req.query.jobId;
	const userId = req.query.userId;
	let apps;
	if (jobId) {
		apps = await Application.find({ job: jobId });
	} else if (userId) {
		// idk if i should put this here
		// faster way
		apps = (await User.findById(userId).populate("applications"))
			.applications;
		// apps = await Application.find({ "user.userId": userId });
	} else {
		apps = await Application.find();
	}
	res.status(200).json(apps);
});

const getApplicationById = asyncHandler(async (req, res) => {
	const status = req.query.status === "true";
	if (status) {
		await Application.findOne({ _id: req.params.id })
			.lean()
			.then((app) => res.status(200).json({ status: app.status }));
	} else
		await Application.findOne({ _id: req.params.id })
			.lean()
			.populate("user.userId")
			.exec()
			.then((app) => res.status(200).json(app));
});

const getApplicationByJobId = asyncHandler((req, res) => {
	Application.find({ job: req.params.job_id }, (err, apps) => {
		if (err) return res.status(400).send("No apps founds.");
		res.json(apps);
	});
});

// TODO: if an app for exists for the current user, do not let them create one
// JSON structure
// {
// 	user: {
// 		userId: ObjectId
// 		name: String,
// 	},
// 	optionalFields: [{ question: String, answer: String }],
// 	job: ObjectId,
// }
const setApplication = asyncHandler(async (req, res) => {
	const apps = await Application.create(
		{
			user: req.body.user, // user ref
			optionalFields: req.body.optionalFields,
			job: req.body.job, // job ref
			status: req.body.status,
			messages: [],
		},
		(err, app) => {
			if (err || !app || !app.job)
				return res.status(400).send("Could not add app.");
			Job.findOneAndUpdate(
				{ _id: app.job },
				{ $push: { applications: app._id } },
				(err, job) => {
					if (err || !job)
						return res.status(400).send("Could not find job.");
				}
			);
			User.findOneAndUpdate(
				{ _id: req.body.user.userId },
				{ $push: { applications: app._id } },
				(err, usr) => {
					if (err || !usr)
						return res.status(400).send("Could not find user.");
				}
			);
			return res.status(200).json(app);
		}
	);
});

const updateApplication = asyncHandler(async (req, res) => {
	const app = await Application.findByIdAndUpdate(req.params.id, req.body);
	// res.status(200).json({ message: `update app ${req.params.id}` });
	res.status(200).json(app);
});

const deleteApplication = asyncHandler(async (req, res) => {
  await Application.findByIdAndDelete(req.params.id)
	res.status(200).json({ message: `delete app ${req.params.id}` });
});

const getMessages = asyncHandler(async (req, res) => {
	console.log(req.params.id);
	Application.findOne({ _id: req.params.id })
		.populate("messages")
		.exec(function (err, app) {
			res.status(200).json(app.messages);
		});
});

const sendMessage = asyncHandler(async (req, res) => {
	const msg = await Message.create({
		user: req.body.user, // user ref
		message: req.body.message,
		application: req.body.application, // app ref
	});

	await Application.findOneAndUpdate(
		{ _id: req.body.application },
		{ $push: { messages: msg._id } }
	);
	res.status(200).json(msg);
});

module.exports = {
	getApplications,
	getApplicationById,
	getApplicationByJobId,
	setApplication,
	updateApplication,
	deleteApplication,
	getMessages,
	sendMessage,
};
