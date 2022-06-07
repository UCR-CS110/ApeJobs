const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/authToken");
const { profToken } = require("../middleware/profToken");
const {
	getJobs,
	getJob,
	setJob,
	updateJob,
	deleteJob,
} = require("../controllers/jobController");

// add logic in a function in controllers, export and call in routes

router.route("/").get(getJobs).post([authToken, profToken], setJob);
router.route("/:id").get(getJob).put([authToken, profToken], updateJob).delete([authToken, profToken], deleteJob);

module.exports = router;
