const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema(
	{
		author: {
			userId: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
			name: String,
		},
		title: String,
		interests: [String],
		majors: [String],
		description: String,
		people: Number,
		skills: [String],
		pay: String,
		questions: [String],
		// hold references to all the applications for this job listing
		applications: [{ type: Schema.Types.ObjectId, ref: "Application" }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
