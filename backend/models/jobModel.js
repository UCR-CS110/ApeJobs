const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema(
	{
		author: String,
		title: String,
		interests: [String],
		majors: [String],
		description: String,
		people: Number,
		skills: [String], 
		pay: String,
		questions: [String],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
