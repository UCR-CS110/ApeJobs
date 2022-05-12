var express = require("express");
var cors = require("cors");
var app = express();
const userManagement = require("./routes/user-management.js");

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

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});
