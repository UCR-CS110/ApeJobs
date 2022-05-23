const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		email: String,
		name: String,
		picture: String,
		type: String,
		interests: Array,
		major: String,
		gpa: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
