var express = require("express");
var cors = require("cors");
const dotenv = require('dotenv').config();
const app = express();
const connectDB = require("./config/db");
const userManagement = require("./routes/userManagement.js");
const jobRoutes = require("./routes/jobRoutes.js");
const applicationRoutes = require("./routes/applicationRoutes");
const cookieParser = require('cookie-parser');

connectDB(); 

app.use(
  cors({credentials: true, origin: 'http://localhost:3000'})
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/user-management", userManagement);
app.use("/api/jobs", jobRoutes);
//! TODO: make private or something
app.use("/api/applications", applicationRoutes);

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});


