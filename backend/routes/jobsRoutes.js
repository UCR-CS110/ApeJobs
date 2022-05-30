const express = require("express");
const router = express.Router();

const {
	getJobs,
	setJob,
	updateJob,
	deleteJob,
} = require("../controllers/jobController");

router.route("/").get(getJobs).post(setJob);
router.route("/id").get(updateJob).post(deleteJob);

module.exports = router;
