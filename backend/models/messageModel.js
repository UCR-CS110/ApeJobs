const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
	{
		user: {
			userId: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
			name: String,
			picture: String,
		},
		message: String,
		// a two way ref is fine given we arent going to reassign messages to application
		application: { type: Schema.Types.ObjectId, ref: "Application" }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
