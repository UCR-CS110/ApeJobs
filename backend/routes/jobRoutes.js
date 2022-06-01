const express = require("express");
const router = express.Router();

const {
	getJobs,
	getJob,
	setJob,
	updateJob,
	deleteJob,
	getJobById,
} = require("../controllers/jobController");

// add logic in a function in controllers, export and call in routes

router.route("/").get(getJobs).post(setJob);
router.route("/:id").get(getJob).put(updateJob).delete(deleteJob);
router.route("/job/:id").get(getJobById);

module.exports = router;
