var express = require("express");
var cors = require("cors");
const path = require("path")
const dotenv = require("dotenv").config();
const app = express();
const connectDB = require("./config/db");
const userManagement = require("./routes/userManagement.js");
const jobRoutes = require("./routes/jobRoutes.js");
const applicationRoutes = require("./routes/applicationRoutes");
const cookieParser = require("cookie-parser");

connectDB();

const PORT = process.env.PORT || 80;

app.use(cors({ credentials: true, origin: `http://localhost:${PORT}` }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user-management", userManagement);
app.use("/api/jobs", jobRoutes);
//! TODO: make private or something
app.use("/api/applications", applicationRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
	});
}

app.listen(PORT, function () {
	console.log(`CORS-enabled web server listening on port ${PORT}`);
});
