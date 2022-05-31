const express = require("express");
const router = express.Router();

const {
	getApplications,
	getApplicationById,
	getApplicationByJobId,
	setApplication,
	updateApplication,
	deleteApplication,
	getMessages,
	sendMessage,
} = require("../controllers/applicationController");

// add logic in a function in controllers, export and call in routes

router.route("/").get(getApplications).post(setApplication);
router.route("/job/:job_id").get(getApplicationByJobId);
router
	.route("/:id")
	.get(getApplicationById)
	.put(updateApplication)
	.delete(deleteApplication);

// TODO: may be a better way to route this but idk how
router.route("/:id/messages").get(getMessages).post(sendMessage);

module.exports = router;
