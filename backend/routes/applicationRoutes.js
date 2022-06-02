const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/authToken");

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
  .post(authToken, setApplication);
  
router.route("/job/:job_id").get(authToken, getApplicationByJobId);

router
  .route("/:id")
  .get(authToken, getApplicationById)
  .put(authToken, updateApplication)
  .delete(authToken, deleteApplication);

// TODO: may be a better way to route this but idk how
router
  .route("/:id/messages")
  .get(authToken, getMessages)
  .post(authToken, sendMessage);

module.exports = router;
