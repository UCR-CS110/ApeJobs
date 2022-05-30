const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema(
	{
		author: { user_id: mongoose.Types.ObjectId, name: String },
		title: String,
		interests: [String],
		majors: [String],
		description: String,
		people: Number,
		skills: [String],
		pay: String,
		questions: [String],
		applications: [{ type: Schema.Types.ObjectId, ref: "Application" }]
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
