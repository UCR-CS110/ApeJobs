const asyncHandler = require("express-async-handler");
const Application = require("../models/applicationModel");
const Message = require("../models/messageModel");

const getApplications = asyncHandler(async (req, res) => {
	const jobId = req.query.jobId;
	const apps = jobId ? await Application.find({ job: jobId }).exec() : await Application.find();
	res.status(200).json(apps);
});

const getApplicationById = asyncHandler(async (req, res) => {
	await Application.findOne({ _id: req.params.id })
		.lean()
		.then((app) => {
			res.json(app);
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
	const apps = await Application.create({
		user: req.body.user, // user ref
		optionalFields: req.body.optionalFields,
		job: req.body.job, // job ref
		status: req.body.status,
		messages: [],
	});
	res.status(200).json(apps);
});

const updateApplication = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `update app ${req.params.id}` });
});

const deleteApplication = asyncHandler(async (req, res) => {
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
	setApplication,
	updateApplication,
	deleteApplication,
	getMessages,
	sendMessage,
};
