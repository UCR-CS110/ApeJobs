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
		questions: [String],
		pay: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
