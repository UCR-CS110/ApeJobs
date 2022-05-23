const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema(
	{
		author: String,
		title: String,
		interests: Array,
		majors: Array,
		description: String,
		people: Number,
		skills: Array, 
		pay: String,
		questions: Array,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
