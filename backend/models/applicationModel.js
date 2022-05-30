const mongoose = require("mongoose");
const { Schema } = mongoose;

const applicationSchema = new Schema(
	{
		author: { type: Schema.Types.ObjectId, ref: 'Person'},
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

module.exports = mongoose.model("User", userSchema);