const mongoose = require("mongoose");
const { Schema } = mongoose;

const applicationSchema = new Schema(
	{
		user: {
			userId: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
			name: String,
		},
		// embedding applicant responses, unless we want to make another model for it
		optionalFields: [{ question: String, answer: String, _id: false }],
		//! Alternative
		// optionalFields: [{ type: Schema.Types.ObjectId, ref: "Message" }],
		job: { type: Schema.Types.ObjectId, ref: "Job" },
		status: String,
		messages: [{ type: Schema.Types.ObjectId, ref: "Message" }]
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
