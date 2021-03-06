const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/authToken");
const { profToken } = require("../middleware/profToken");
const { studentToken } = require("../middleware/studentToken");
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

router
  .route("/")
  .get(authToken, getApplications)
  .post([authToken, studentToken], setApplication);

router.route("/job/:job_id").get(authToken, getApplicationByJobId);

router
  .route("/:id")
  .get(authToken, getApplicationById)
  .put([authToken, profToken], updateApplication)
  .delete([authToken, studentToken], deleteApplication);

// TODO: may be a better way to route this but idk how
router
  .route("/:id/messages")
  .get(authToken, getMessages)
  .post(authToken, sendMessage);

module.exports = router;
