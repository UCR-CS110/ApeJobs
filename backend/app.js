var express = require("express");
var cors = require("cors");
const dotenv = require('dotenv').config();
const app = express();
const connectDB = require("./config/db");
const userManagement = require("./routes/userManagement.js");
const jobsRoutes = require("./routes/jobsRoutes.js");

connectDB(); 

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());

app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.use("/api/user-management", userManagement);
app.use("/api/jobs", jobsRoutes);

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});
